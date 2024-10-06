from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from datetime import datetime
from bson import ObjectId
from typing import Optional
import bcrypt
from jose import JWTError, jwt
from auth import SECRET_KEY, ALGORITHM, get_current_user, User as AuthUser

# Standard Library
import os
import time

# Database
import redis
import pymongo

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

## MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
print(MONGO_URI)
mongo_client = pymongo.MongoClient("mongodb://mongo:27017/")

# Pydantic models
class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr
    role: str = "student"

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    role: str
    createdAt: datetime
    updatedAt: datetime

class SystemBinding(BaseModel):
    systemId: str

# MongoDB helper functions
def get_user_collection():
    return mongo_client.get_database("hydroponic_edu").users

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "role": user["role"],
        "createdAt": user["createdAt"],
        "updatedAt": user["updatedAt"]
    }

# Custom dependencies
async def get_current_admin_user(current_user: AuthUser = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin users can perform this action"
        )
    return current_user

# Endpoints

@router.post("/users/bind-system", response_model=dict)
async def bind_user_to_system(
    binding: SystemBinding,
    current_user: AuthUser = Depends(get_current_user)
):
    user_systems_collection = mongo_client.get_database("hydroponic_edu").user_systems
    hydroponic_systems_collection = mongo_client.get_database("hydroponic_edu").hydroponic_systems

    # Check if the system exists
    system = hydroponic_systems_collection.find_one({"_id": ObjectId(binding.systemId)})
    if not system:
        raise HTTPException(status_code=404, detail="Hydroponic system not found")

    # Check if the user is already bound to this system
    existing_binding = user_systems_collection.find_one({
        "userId": ObjectId(current_user.id),
        "systemId": ObjectId(binding.systemId)
    })
    if existing_binding:
        raise HTTPException(status_code=400, detail="User is already bound to this system")

    # Create new binding
    new_binding = {
        "userId": ObjectId(current_user.id),
        "systemId": ObjectId(binding.systemId),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    result = user_systems_collection.insert_one(new_binding)

    if result.inserted_id:
        return {"message": "User successfully bound to the hydroponic system"}
    else:
        raise HTTPException(status_code=500, detail="Failed to bind user to the system")

@router.post("/users", response_model=UserResponse)
async def create_user(user: UserCreate, current_admin: AuthUser = Depends(get_current_admin_user)):
    user_collection = get_user_collection()
    
    # Check if username or email already exists
    if user_collection.find_one({"$or": [{"username": user.username}, {"email": user.email}]}):
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    # Hash the password
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    
    new_user = {
        "username": user.username,
        "password": hashed_password,
        "email": user.email,
        "role": user.role,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    result = user_collection.insert_one(new_user)
    created_user = user_collection.find_one({"_id": result.inserted_id})
    return user_helper(created_user)

@router.get("/users/{id}", response_model=UserResponse)
async def get_user(id: str, current_user: AuthUser = Depends(get_current_user)):
    user_collection = get_user_collection()
    user = user_collection.find_one({"_id": ObjectId(id)})
    if user:
        # Only allow users to view their own profile or admins to view any profile
        if str(user["_id"]) == current_user.id or current_user.role == "admin":
            return user_helper(user)
        raise HTTPException(status_code=403, detail="Not authorized to view this user")
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{id}", response_model=UserResponse)
async def update_user(id: str, user_update: UserUpdate, current_user: AuthUser = Depends(get_current_user)):
    user_collection = get_user_collection()
    
    # Check if user exists
    existing_user = user_collection.find_one({"_id": ObjectId(id)})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Only allow users to update their own profile or admins to update any profile
    if str(existing_user["_id"]) != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to update this user")
    
    # Prepare update data
    update_data = {k: v for k, v in user_update.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    
    # Update user
    user_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})
    
    updated_user = user_collection.find_one({"_id": ObjectId(id)})
    return user_helper(updated_user)

@router.delete("/users/{id}", response_model=dict)
async def delete_user(id: str, current_admin: AuthUser = Depends(get_current_admin_user)):
    user_collection = get_user_collection()
    delete_result = user_collection.delete_one({"_id": ObjectId(id)})
    
    if delete_result.deleted_count == 1:
        return {"message": "User successfully deleted"}
    raise HTTPException(status_code=404, detail="User not found")

# New endpoint to get current user's profile
@router.get("/users/me", response_model=UserResponse)
async def get_current_user_profile(current_user: AuthUser = Depends(get_current_user)):
    user_collection = get_user_collection()
    user = user_collection.find_one({"_id": ObjectId(current_user.id)})
    if user:
        return user_helper(user)
    raise HTTPException(status_code=404, detail="User not found")