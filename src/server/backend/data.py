from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt

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

router = APIRouter()

@router.post("/data/update")
async def update_data(data: dict):
    systemId = data.get("systemId")
    DEVICE_ID = data.get("DEVICE_ID")
    temperature = data.get("temperature")
    humidity = data.get("humidity")
    ph = data.get("ph")
    ec = data.get("ec")
    lightIntensity = data.get("lightIntensity")
    waterLevel = data.get("waterLevel")
    flowRate = data.get("flowRate")
    pressure = data.get("pressure")
    dissolvedOxygen = data.get("dissolvedOxygen")
    lastUpdated = datetime.now()
    
    # check if systemId exists
    db = mongo_client.hydroponic_edu
    collection = db.sensor_data
    if collection.find_one({"systemId": systemId}):
        collection.update_one(
            {"systemId": systemId},
            {
                "$push": {
                    "readings": {
                        "temperature": temperature,
                        "humidity": humidity,
                        "ph": ph,
                        "ec": ec,
                        "lightIntensity": lightIntensity,
                        "waterLevel": waterLevel,
                        "flowRate": flowRate,
                        "pressure": pressure,
                        "dissolvedOxygen": dissolvedOxygen,
                        "lastUpdated": lastUpdated
                    }
                }
            }
        )
    else:
        collection.insert_one({
            "systemId": systemId,
            "readings": [{
                "temperature": temperature,
                "humidity": humidity,
                "ph": ph,
                "ec": ec,
                "lightIntensity": lightIntensity,
                "waterLevel": waterLevel,
                "flowRate": flowRate,
                "pressure": pressure,
                "dissolvedOxygen": dissolvedOxygen,
                "lastUpdated": lastUpdated
            }]
        })

    print("Sensor data Received from DEVICE_ID:", DEVICE_ID, "System ID:", systemId)
    return {"status": "success"}