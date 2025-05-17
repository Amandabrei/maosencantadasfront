'use client';

import { useState, useEffect } from "react";
import { api } from "../../../../services/api";

interface Cliente {
  id?: number;
  nome: string;
  endereco?: string;
  email?: string;
  telefone?: string;
}

interface FormClienteProps {
  cliente?: Cliente;
  onSave: () => void;
  onCancel?: () => void;
}

export default function FormCliente({ cliente, onSave, onCancel }: FormClienteProps) {
  const [form, setForm] = useState<Cliente>({
    nome: "",
    email: "",
    endereco: "",
    telefone: "",
  });

  useEffect(() => {
    if (cliente) {
      setForm(cliente);
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (form.id) {
        const response = await api.put(`/v1/clientes/${form.id}`, form);
        console.log("Cliente atualizado com sucesso:", response.data);
      } else {
        const response = await api.post("/v1/clientes", form);
        console.log("Cliente cadastrado com sucesso:", response.data);
      }

      if (onSave) onSave();

      
      setForm({
        nome: "",
        endereco: "",
        email: "",
        telefone: "",
      });
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-800">
        {form.id ? "Editar Cliente" : "Cadastrar Cliente"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {form.id ? "Atualizar" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}
