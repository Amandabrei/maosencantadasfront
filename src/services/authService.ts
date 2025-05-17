// src/services/authService.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // backend base
});

// Login e armazenamento do token na sessionStorage
const login = async (login: string, password: string): Promise<boolean> => {
  try {
    const response = await API.post('/auth/login', {
      login,
      password,
    });

    const { token } = response.data;

    
    sessionStorage.setItem('token', token);

    return true;
  } catch (error) {
    console.error('Erro no login:', error);
    return false;
  }
};


const getToken = (): string | null => {
  return sessionStorage.getItem('token');
};

export default {
  login,
  getToken,
};
