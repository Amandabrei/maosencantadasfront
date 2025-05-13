import axios from 'axios';

export const apiPublic = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export default apiPublic;