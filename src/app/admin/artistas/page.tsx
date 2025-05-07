'use client';

import { useEffect, useState } from "react";
import api from "../../../services/api";
import FormArtista from "./form";
import Link from "next/link"; 

interface Artista {
  id: number;
  nome: string;
  email: string;
  cpf?: string;
  endereco?: string;
  telefone?: string;
  whatsapp?: string;
  insta?: string;
  face?: string;
  foto?: string;
}

export default function ListaArtistas() {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [editando, setEditando] = useState<Artista | null>(null);

  const fetchArtistas = () => {
    api
      .get("/v1/artistas")
      .then((res) => setArtistas(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchArtistas();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este artista?")) return;
    try {
      await api.delete(`/v1/artistas/${id}`);
      fetchArtistas();
    } catch (error) {
      console.error("Erro ao excluir artista:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">
        Lista de Artistas
      </h2>

      <div className="mb-4 text-right">
        <Link href="/admin/artistas/cadastrar" passHref>
          <button className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
            Cadastrar Novo Artista
          </button>
        </Link>
      </div>

      {editando && (
        <div className="mb-6">
          <FormArtista
            artista={editando}
            onSave={() => {
              setEditando(null);
              fetchArtistas();
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
              <th className="py-2 px-4 text-left">Instagram</th>
              <th className="py-2 px-4 text-left">Facebook</th>
              <th className="py-2 px-4 text-left">Foto</th>
              <th className="py-2 px-4 text-left">Editar / Excluir</th>
            </tr>
          </thead>
          <tbody>
            {artistas.map((artista) => (
              <tr key={artista.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4">{artista.nome}</td>
                <td className="py-2 px-4">{artista.cpf}</td>
                <td className="py-2 px-4">{artista.email}</td>
                <td className="py-2 px-4">{artista.endereco}</td>
                <td className="py-2 px-4">{artista.telefone}</td>
                <td className="py-2 px-4">{artista.whatsapp}</td>
                <td className="py-2 px-4">
                  <a
                    href={artista.insta}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </td>
                <td className="py-2 px-4">
                  <a
                    href={artista.face}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </td>
                <td className="py-2 px-4">
                  <img
                    src={artista.foto ? `http://localhost:8080/api/files/${artista.foto.split('/').pop()}` : '/imagem-nao-encontrada.png'}
                    alt={`Foto de ${artista.nome}`}
                    className="h-12 w-12 object-cover rounded-full"
                  />
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md"
                  >
                    <Link href={`/admin/artistas/editar/${artista.id}`} passHref>
                      Editar
                    </Link>
                  </button>

                  <button
                    onClick={() => handleDelete(artista.id)}
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
