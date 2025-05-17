import axios from 'axios';
import { getToken } from './authService';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    const isPublicEndpoint = config.url?.includes("/v1/artistas") || config.url?.includes("/v1/categorias") || config.url?.includes("/v1/produtos");

    if (token && config.headers && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
