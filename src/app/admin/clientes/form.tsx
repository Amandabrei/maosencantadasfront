'use client';

import { useState, useEffect } from "react";
import { useAuth } from "../../types/AuthContext";
import { api } from "../../../services/api";

interface ClienteForm {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  endereco: string;
  telefone: string;
  whatsapp: string;
}

export default function FormCliente({
  clienteEditando,
  onSubmitSuccess,
  onCancelEdit
}: {
  clienteEditando: ClienteForm | null;
  onSubmitSuccess: () => void;
  onCancelEdit?: () => void;
}) {
  const { role } = useAuth();
  const [form, setForm] = useState<ClienteForm>({
    nome: "",
    email: "",
    cpf: "",
    endereco: "",
    telefone: "",
    whatsapp: "",
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (clienteEditando) {
      setForm(clienteEditando);
    }
  }, [clienteEditando]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.email || !form.cpf) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      if (form.id) {
        await api.put(`/v1/clientes/${form.id}`, form);
        setMensagem("Cliente atualizado com sucesso.");
      } else {
        await api.post("/v1/clientes", form);
        setMensagem("Cliente cadastrado com sucesso.");
      }

      setForm({
        nome: "",
        email: "",
        cpf: "",
        endereco: "",
        telefone: "",
        whatsapp: "",
      });

      onSubmitSuccess();
    } catch (error: any) {
      setMensagem(`Erro: ${error.response?.data?.message || error.message}`);
    }
  };

  // Verificação de role para limitar o acesso
  if (role !== "ADMIN") return <p>Acesso restrito.</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-8"
    >
      <h3 className="text-xl font-bold mb-6 text-center text-indigo-800">
        {form.id ? "Editar Cliente" : "Cadastrar Novo Cliente"}
      </h3>

      {/* Campos do formulário */}
      <div className="mb-4">
        <label className="block mb-1 capitalize text-sm font-semibold text-gray-700">
          Nome
        </label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 capitalize text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 capitalize text-sm font-semibold text-gray-700">
          CPF
        </label>
        <input
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 capitalize text-sm font-semibold text-gray-700">
          Endereço
        </label>
        <input
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 capitalize text-sm font-semibold text-gray-700">
          Telefone
        </label>
        <input
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 capitalize text-sm font-semibold text-gray-700">
          WhatsApp
        </label>
        <input
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-md"
        >
          {form.id ? "Atualizar" : "Cadastrar"}
        </button>

        {form.id && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Mensagem */}
      {mensagem && <p className="mt-4 text-sm text-green-700">{mensagem}</p>}
    </form>
  );
}
