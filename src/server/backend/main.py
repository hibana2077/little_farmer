# Langchain
# from langchain_community.vectorstores.faiss import FAISS
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_community.embeddings import OllamaEmbeddings
# from langchain.text_splitter import RecursiveCharacterTextSplitter

# Standard Library
import os
import time

# FastAPI
import uvicorn
import requests
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Database
import redis
import pymongo

# Ollama
# ollama_server = os.getenv("OLLAMA_SERVER", "http://localhost:11434")
HOST = os.getenv("API_HOST", "127.0.0.1")
# embeddings = OllamaEmbeddings(base_url=ollama_server)

# Database initialization

## Redis
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = os.getenv("REDIS_PORT", "6379")
redis_client_token = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

## MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
mongo_client = pymongo.MongoClient("mongodb://mongo:27017/")

# FassAPI
app = FastAPI()

## Route mounting
from auth import router as auth_router
from user_management import router as user_management_router

app.include_router(auth_router)
app.include_router(user_management_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    # pull model from ollama
    # _ = requests.post(f"{ollama_server}/api/pull", json={"name": "llama3.2"})
    # _ = requests.post(f"{ollama_server}/api/pull", json={"name": "nomic-embed-text"})
    pass

@app.get("/")
def read_root():
    """
    A function that handles the root endpoint.

    Returns:
        dict: A dictionary with the message "Hello: World".
    """
    return {"Hello": "World"}

if __name__ == "__main__":
    print("Starting FastAPI server...")
    print(f"API_HOST = {HOST}")
    uvicorn.run(app, host="0.0.0.0", port=8081) # In docker need to change to 0.0.0.0