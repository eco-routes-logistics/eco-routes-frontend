import axios from 'axios';
import { env } from '@/config/env';

/**
 * Axios instance with interceptors for authentication and error handling
 */
export const api = axios.create({
  baseURL: env.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const path = window.location.pathname;
    const token = path.startsWith('/client')
      ? localStorage.getItem('client_token')
      : path.startsWith('/rider')
      ? localStorage.getItem('rider_token')
      : localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access denied');
    }
    
    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);
