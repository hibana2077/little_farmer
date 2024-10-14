import requests
import time
import json
import os

# Constants

API_URL = os.getenv("API_URL", "http://localhost:8000")
DEVICE_ID = os.getenv("DEVICE_ID", "rpi5")

# Register device

def register_device():
    url = f"{API_URL}/device/register"
    payload = {
        "deviceId": DEVICE_ID
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    print(response.text)