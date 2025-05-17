'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate, getToken } from '../../services/authService';


export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // OK
  const token = await authenticate(login, password); 
  if (token) {
    router.push('/admin/artistas');
  } else {
    alert('Login ou senha inválidos');
  }
};


  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
