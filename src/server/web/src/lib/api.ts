// lib/api.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';

// Use an environment variable for the API base URL
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:8081';
const API_BASE_URL = 'http://backend:8081';

// Create a function to get the API base URL
const getApiBaseUrl = () => {
  // Use a different base URL for server-side requests if needed
  return typeof window === 'undefined'
    ? process.env.SERVER_API_BASE_URL || API_BASE_URL
    : API_BASE_URL;
};

// Create a function to get the authorization header
const getAuthHeader = (serverToken?: string) => {
  if (typeof window === 'undefined') {
    // Server-side: use the provided token
    return serverToken ? { Authorization: `Bearer ${serverToken}` } : {};
  } else {
    // Client-side: get the token from localStorage
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

// Create the API instance
const createApiInstance = (serverToken?: string): AxiosInstance => {
  const api = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(serverToken),
    },
  });

  // Add response interceptor for handling refresh token (client-side only)
  if (typeof window !== 'undefined') {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await api.post('/auth/refresh-token', { refreshToken });
            const { token } = response.data;
            localStorage.setItem('token', token);
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          } catch (refreshError) {
            // Handle logout or redirect to login page
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            // You might want to redirect to the login page here
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  return api;
};

// Create and export the API methods
export const createApiMethods = (serverToken?: string) => {
  const api = createApiInstance(serverToken);

  return {
    get: (url: string, params = {}, config: AxiosRequestConfig = {}) =>
      api.get(url, { ...config, params }),
    post: (url: string, data = {}, config: AxiosRequestConfig = {}) =>
      api.post(url, data, config),
    put: (url: string, data = {}, config: AxiosRequestConfig = {}) =>
      api.put(url, data, config),
    del: (url: string, config: AxiosRequestConfig = {}) =>
      api.delete(url, config),
  };
};

// Helper function for SSR
export const getServerSideApi = (context: GetServerSidePropsContext) => {
  const serverToken = context.req.cookies['token']; // Assuming you store the token in a cookie
  return createApiMethods(serverToken);
};

// Export a default instance for client-side use
export default createApiMethods();