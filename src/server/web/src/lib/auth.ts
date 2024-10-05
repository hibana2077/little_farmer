// lib/auth.ts
import { store } from '../redux/store';
import { post } from './api';

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

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await post('/auth/login', credentials);
    const { user, token, refreshToken } = response.data;
    localStorage.setItem('refreshToken', refreshToken);
    store.dispatch({ type: 'auth/login', payload: { user, token } });
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await post('/auth/logout');
    localStorage.removeItem('refreshToken');
    store.dispatch({ type: 'auth/logout' });
  } catch (error) {
    console.error('Logout failed:', error);
    // Even if the server-side logout fails, we still want to clear the local state
    store.dispatch({ type: 'auth/logout' });
  }
};

export const getCurrentUser = (): User | null => {
  const state = store.getState();
  return state.auth.user;
};

export const isAuthenticated = (): boolean => {
  const state = store.getState();
  return state.auth.isAuthenticated;
};

export const hasRole = (role: string): boolean => {
  const user = getCurrentUser();
  return user ? user.role === role : false;
};