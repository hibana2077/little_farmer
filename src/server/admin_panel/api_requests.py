import requests
import os

HOST = os.getenv("API_URL", "http://localhost:8000")

def api_get_all_users():
    response = requests.get(f"{HOST}/users", json={"password": os.getenv("ADMIN_PASSWORD")})
    # list of users
    return response.json()

def api_create_user(username, password, email, role):
    response = requests.post(f"{HOST}/users", json={"username": username, "password": password, "email": email, "role": role})
    return response.json()

def api_get_all_systems():
    response = requests.get(f"{HOST}/farms", json={"password": os.getenv("ADMIN_PASSWORD")})
    # list of systems
    return response.json()

def api_create_system(name, description):
    response = requests.post(f"{HOST}/farms", json={"name": name, "description": description})
    return response.json()