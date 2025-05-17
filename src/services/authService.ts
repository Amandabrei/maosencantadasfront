import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // ✅ Certifique-se que está SEM /api ou barra extra
});

const login = async (login: string, password: string): Promise<boolean> => {
  try {
    const response = await API.post('/auth/login', {
      login,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.error('Erro no login:', error);
    return false;
  }
};

export default {
  login,
};
