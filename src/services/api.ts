import axios from 'axios';
import authService from './authService';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Interceptor que injeta o token no header Authorization
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
