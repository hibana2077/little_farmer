// lib/auth.ts
import { createApiMethods } from './api';
import { GetServerSidePropsContext } from 'next';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

let authState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Initialize auth state on the client side
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  if (token && userString) {
    const user = JSON.parse(userString);
    authState = { user, token, isAuthenticated: true };
  }
}

export const login = async (credentials: LoginCredentials) => {
  const api = createApiMethods();
  try {
    const response = await api.post('/auth/login', credentials);
    const { user, token, refreshToken } = response.data;
    authState = { user, token, isAuthenticated: true };
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = async () => {
  const api = createApiMethods();
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    authState = { user: null, token: null, isAuthenticated: false };
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }
};

export const getCurrentUser = (): User | null => {
  return authState.user;
};

export const isAuthenticated = (): boolean => {
  return authState.isAuthenticated;
};

export const hasRole = (role: string): boolean => {
  return authState.user ? authState.user.role === role : false;
};

// Helper function for server-side authentication
export const getServerSideAuth = (context: GetServerSidePropsContext): AuthState => {
  const token = context.req.cookies['token'];
  const userString = context.req.cookies['user'];
  if (token && userString) {
    const user = JSON.parse(userString);
    return { user, token, isAuthenticated: true };
  }
  return { user: null, token: null, isAuthenticated: false };
};

// Update auth state (useful for refreshing token or updating user info)
export const updateAuthState = (newState: Partial<AuthState>) => {
  authState = { ...authState, ...newState };
  if (typeof window !== 'undefined') {
    if (newState.token) localStorage.setItem('token', newState.token);
    if (newState.user) localStorage.setItem('user', JSON.stringify(newState.user));
  }
};