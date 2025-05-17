import { api } from './api';

export const authenticate = async (login: string, password: string): Promise<string | null> => {
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
