// lib/api.ts
import axios from 'axios';
import { store } from '../redux/store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.hydroponic-edu.com/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await api.post('/auth/refresh-token', { refreshToken });
      const { token } = response.data;
      store.dispatch({ type: 'auth/setToken', payload: token });
      originalRequest.headers['Authorization'] = `Bearer ${token}`;
      return api(originalRequest);
    } catch (refreshError) {
      store.dispatch({ type: 'auth/logout' });
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

export const get = (url: string, params = {}) => api.get(url, { params });
export const post = (url: string, data = {}) => api.post(url, data);
export const put = (url: string, data = {}) => api.put(url, data);
export const del = (url: string) => api.delete(url);

export default api;