from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime
from bson import ObjectId
from typing import Optional
import bcrypt
from main import mongo_client
router = APIRouter()

# Pydantic models
class UserCreate(BaseModel):
    username: str
    password: str
    email: str
    role: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    role: str
    createdAt: datetime
    updatedAt: datetime

# MongoDB helper functions
def get_user_collection():
    return mongo_client.get_database("your_database_name").users

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "role": user["role"],
        "createdAt": user["createdAt"],
        "updatedAt": user["updatedAt"]
    }

# Endpoints
@router.post("/users", response_model=UserResponse)
async def create_user(user: UserCreate):
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
async def get_user(id: str):
    user_collection = get_user_collection()
    user = user_collection.find_one({"_id": ObjectId(id)})
    if user:
        return user_helper(user)
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{id}", response_model=UserResponse)
async def update_user(id: str, user_update: UserUpdate):
    user_collection = get_user_collection()
    
    # Check if user exists
    existing_user = user_collection.find_one({"_id": ObjectId(id)})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Prepare update data
    update_data = {k: v for k, v in user_update.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    
    # Update user
    user_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})
    
    updated_user = user_collection.find_one({"_id": ObjectId(id)})
    return user_helper(updated_user)

@router.delete("/users/{id}", response_model=dict)
async def delete_user(id: str):
    user_collection = get_user_collection()
    delete_result = user_collection.delete_one({"_id": ObjectId(id)})
    
    if delete_result.deleted_count == 1:
        return {"message": "User successfully deleted"}
    raise HTTPException(status_code=404, detail="User not found")