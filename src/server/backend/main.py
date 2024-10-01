from langchain_community.vectorstores.faiss import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import OllamaEmbeddings
from contextlib import asynccontextmanager
from langchain.text_splitter import RecursiveCharacterTextSplitter
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import os
import time
import uvicorn
import requests
from fastapi.middleware.cors import CORSMiddleware

ollama_server = os.getenv("OLLAMA_SERVER", "http://localhost:11434")
HOST = os.getenv("API_HOST", "127.0.0.1")
embeddings = OllamaEmbeddings(base_url=ollama_server)

app = FastAPI()

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
    _ = requests.post(f"{ollama_server}/api/pull", json={"name": "llama3.2"})
    _ = requests.post(f"{ollama_server}/api/pull", json={"name": "nomic-embed-text"})

@app.get("/")
def read_root():
    """
    A function that handles the root endpoint.

    Returns:
        dict: A dictionary with the message "Hello: World".
    """
    return {"Hello": "World"}

@app

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=8081) # In docker need to change to 0.0.0.0