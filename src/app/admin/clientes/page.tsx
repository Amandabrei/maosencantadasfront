'use client';

import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import FormCliente from "./form";
import Link from "next/link";

interface Cliente {
  id: number;
  nome: string;
  email: string;
  cpf?: string;
  endereco?: string;
  telefone?: string;
  whatsapp?: string;
}

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editando, setEditando] = useState<Cliente | null>(null);

  const fetchClientes = () => {
    api
      .get("/v1/clientes")
      .then((res) => setClientes(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
    try {
      await api.delete(`/v1/clientes/${id}`);
      fetchClientes();
    } catch (error) {
      console.error("Erro ao excluir clientes:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">
        Lista de Clientes
      </h2>

      <div className="mb-4 text-right">
        <Link href="/admin/clientes/cadastrar" passHref>
          <button className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
            Cadastrar Novo Cliente
          </button>
        </Link>
      </div>

      {editando && (
        <div className="mb-6">
          <FormCliente
            cliente={editando}
            onSave={() => {
              setEditando(null);
              fetchClientes();
            }}
            onCancel={() => setEditando(null)}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-indigo-100 text-indigo-900">
              <th className="py-2 px-4 text-left">Nome</th>
              <th className="py-2 px-4 text-left">CPF</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Endereço</th>
              <th className="py-2 px-4 text-left">Telefone</th>
              <th className="py-2 px-4 text-left">WhatsApp</th>
              <th className="py-2 px-4 text-left">Editar / Excluir</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4">{cliente.nome}</td>
                <td className="py-2 px-4">{cliente.cpf}</td>
                <td className="py-2 px-4">{cliente.email}</td>
                <td className="py-2 px-4">{cliente.endereco}</td>
                <td className="py-2 px-4">{cliente.telefone}</td>
                <td className="py-2 px-4">{cliente.whatsapp}</td>
                <td className="py-2 px-4 space-x-2">
                  <Link href={`/admin/clientes/editar/${cliente.id}`} passHref>
                    <button className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md">
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
