import streamlit as st
import pandas as pd
import requests
import os
from api_requests import *

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

    users = api_get_all_users()
    users_df = pd.DataFrame(users)
    st.dataframe(users_df)

def create_users():
    st.write("Create users")

    with st.form("create_user_form"):
        username = st.text_input("Username")
        password = st.text_input("Password", type="password")
        email = st.text_input("Email")
        role = st.selectbox("Role", ["student", "teacher", "admin"])

        if st.form_submit_button("Create User"):
            response = api_create_user(username, password, email, role)
            if response.get("error"):
                st.error(response["error"])
            else:
                st.success("User created successfully")
            st.rerun()

def manage_facilities():
    st.write("Manage facilities")

    facilities = api_get_all_systems()
    facilities_df = pd.DataFrame(facilities)
    st.dataframe(facilities_df)

def create_facilities():
    st.write("Create facilities")

    with st.form("create_facility_form"):
        name = st.text_input("Name")
        description = st.text_area("Description")

        if st.form_submit_button("Create Facility"):
            response = api_create_system(name, description)
            if response.get("error"):
                st.error(response["error"])
            else:
                st.success(f"Facility {name} created successfully with ID {response['objectId']}")
            st.rerun()

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
    pages = st.navigation(
        {
            "Manage Users": [
                st.Page("Manage Users", manage_users),
                st.Page("Create Users", create_users),
            ],
            "Manage Facilities": [
                st.Page("Manage Facilities", manage_facilities),
                st.Page("Create Facilities", create_facilities),
            ]
        }
    )
    pages.run()