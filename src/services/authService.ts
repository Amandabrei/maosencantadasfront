<<<<<<< HEAD
import { api } from './api';

export const authenticate = async (login: string, password: string): Promise<string | null> => {
=======
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // backend base
});

const login = async (login: string, password: string): Promise<boolean> => {
>>>>>>> 0b7419179f06be060f97cf1580a2a8130f5bdb44
  try {
    const response = await api.post('/auth/login', { login, password });
    const { token } = response.data;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('token', token);
    }
    return token;
  } catch (error) {
    console.error('Erro no login:', error);
    return null;
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('token');
  }
  return null;
};
