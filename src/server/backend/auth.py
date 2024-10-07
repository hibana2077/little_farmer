from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import os
from bson import ObjectId

# Standard Library
import os

# Database
import redis
import pymongo

# Database initialization

## Redis
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = os.getenv("REDIS_PORT", "6379")
print(REDIS_HOST, REDIS_PORT)
redis_client_token = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

## MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
print(MONGO_URI)
mongo_client = pymongo.MongoClient(MONGO_URI)

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

router = APIRouter()

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class User(BaseModel):
    username: str
    email: str | None = None
    role: str

class UserInDB(User):
    password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(username: str):
    user_dict = mongo_client.hydroponic_edu.users.find_one({"username": username})
    if user_dict:
        return UserInDB(**user_dict)

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=100)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

@router.post("/auth/login")
async def login_for_access_token(form_data: dict):
    username = form_data["username"]
    password = form_data["password"]
    user = authenticate_user(username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(data={"sub": user.username})
    
    # Store refresh token in Redis
    redis_client_token.setex(f"refresh_token:{user.username}", 
                       timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS), 
                       refresh_token)
    
    return {"user": username, "access_token": access_token, "refresh_token": refresh_token}

@router.post("/auth/logout")
async def logout(data: dict):
    username = data["username"]
    # Delete refresh token from Redis
    redis_client_token.delete(f"refresh_token:{username}")
    return {"message": "Successfully logged out"}

@router.post("/auth/refresh-token")
async def refresh_token(data: dict):
    refresh_token = data["refresh_token"]
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=400, detail="Invalid refresh token")
        
        # Check if refresh token exists in Redis
        stored_token = redis_client_token.get(f"refresh_token:{username}")
        if not stored_token or stored_token.decode() != refresh_token:
            raise HTTPException(status_code=400, detail="Invalid or expired refresh token")
        
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": username}, expires_delta=access_token_expires
        )
        new_refresh_token = create_refresh_token(data={"sub": username})
        
        # Update refresh token in Redis
        redis_client_token.setex(f"refresh_token:{username}", 
                           timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS), 
                           new_refresh_token)
        
        return {"access_token": access_token, "refresh_token": new_refresh_token, "token_type": "bearer"}
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid refresh token")