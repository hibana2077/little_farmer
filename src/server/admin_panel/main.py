import streamlit as st
import pandas as pd
import requests

st.title("HydroEdu Admin Panel")

# Setting up session
if "login" not in st.session_state:
    st.session_state.login = False

# Login
if not st.session_state.login:
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    if st.button("Login"):
        response = requests.post("http://localhost:8000/login", json={"username": username, "password": password})
        if response.status_code == 200:
            st.session_state.login = True
            st.success("Logged in successfully")
            st.rerun()
        else:
            st.error("Invalid credentials")
else:
    st.write("Welcome to the admin panel")