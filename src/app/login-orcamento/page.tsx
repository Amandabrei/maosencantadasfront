'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../services/api';
import '../globals.css';
import Header from '@components/components/Header';
import Navbar from '@components/components/Navbar';
import Footer from '@components/components/Footer';
import { endpointServerChangedSubscribe } from 'next/dist/build/swc/generated-native';

export default function SolicitarOrcamento() {
  const router = useRouter();

  const [cliente, setCliente] = useState({
    nome: '',
    endereco: '',
    email: '',
    telefone: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Cadastra o cliente
      const clienteResponse = await api.post('/api/v1/clientes', cliente);
      const clienteId = clienteResponse.data.id;

      // 2. Cria o orçamento
      await api.post('/api/v1/orcamentos', {
        clienteId,
        descricao: 'Orçamento solicitado via site',
      });

      setMensagem('Orçamento solicitado com sucesso!');
    } catch (error) {
      console.error('Erro ao solicitar orçamento:', error);
      setMensagem('Erro ao solicitar orçamento. Tente novamente.');
    }
  };

  return (
    <div>
      <Header />
      <Navbar />

      <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Solicitar Orçamento</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={cliente.nome}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={cliente.endereco}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={cliente.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={cliente.telefone}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="button"
          >
            Enviar
          </button>
        </form>

        {mensagem && (
          <p className="mt-4 text-center font-semibold text-green-600">{mensagem}</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
