import streamlit as st
import pandas as pd
import requests
import os

API_HOST = os.getenv("API_URL", "http://localhost:8000")

st.title("HydroEdu Admin Panel")

# Setting up session
if "login" not in st.session_state:
    st.session_state.login = False
if "JWT" not in st.session_state:
    st.session_state.JWT = None
if "username" not in st.session_state:
    st.session_state.username = None

# Pages
def manage_users():
    st.write("Manage users")

def manage_facilities():
    st.write("Manage facilities")

# Login
if not st.session_state.login:
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    if st.button("Login"):
        response = requests.post(API_HOST+"/auth/login", json={"username": username, "password": password})
        if response.status_code == 200:
            st.session_state.login = True
            st.session_state.JWT = response.json()["access_token"]
            st.session_state.username = username
            st.success("Logged in successfully")
            st.rerun()
        else:
            st.error("Invalid credentials")
else:
    st.write("Welcome to the admin panel")
    pages = st.navigation([st.Page("Manage Users", manage_users), st.Page("Manage Facilities", manage_facilities)])
    pages.run()