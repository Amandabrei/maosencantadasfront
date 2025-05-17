'use client';

import React, { useState } from 'react';
import axios from 'axios';


type UserRole = 'admin' | 'user';

interface RegisterFormData {
    login: string;
    password: string;
    userRole: string;
}

export default function RegisterPage() {
    const [form, setForm] = useState<RegisterFormData>({
        login: '',
        password: '',
        userRole: 'user',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await axios.post('http://localhost:8080/api/auth/register', form); 
        setSubmitted(true);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar. Verifique os dados ou o servidor.');
    }
};


    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
            <h2>Cadastro</h2>
            {submitted ? (
                <div>
                    <p>Cadastro realizado com sucesso!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    
                    <label>
                        Email:
                        <input
                            type="email"
                            name="login"
                            value={form.login}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', marginBottom: 12 }}
                        />
                    </label>
                    <label>
                        Senha:
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', marginBottom: 12 }}
                        />
                    </label>
                    <label>
                        Tipo de usuário:
                        <select
                            name="userRole"
                            value={form.userRole}
                            onChange={handleChange}
                            style={{ width: '100%', marginBottom: 16 }}
                        >
                            <option value="user">Cliente</option>
                            <option value="admin">Artista</option>
                        </select>
                    </label>
                    <button type="submit" style={{ width: '100%', padding: 8 }}>
                        Cadastrar
                    </button>
                </form>
            )}
            <div style={{ marginTop: 16 }}>
                <a href="/login">Já tem uma conta? Faça login</a>
            </div>
        </div>
    );
}
