'use client';

import { useEffect, useState } from "react";
import api from "../../../services/api";
import Link from "next/link";


interface Categoria {
  id: number;
  nome: string;
}

export default function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editando, setEditando] = useState<Categoria | null>(null);

  const fetchCategorias = () => {
    api
      .get("/v1/categorias")
      .then((res) => setCategorias(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      await api.delete(`/v1/categorias/${id}`);
      fetchCategorias();
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">
        Lista de Categorias
      </h2>

      <div className="mb-4 text-right">
        <Link href="/admin/categorias/cadastrar">
          <button className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
            Cadastrar Nova Categoria
          </button>
        </Link>
      </div>

      {editando && (
        <div className="mb-6">
          <FormCategoria
            categoria={editando}
            onSave={() => {
              setEditando(null);
              fetchCategorias();
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
              <th className="py-2 px-4 text-left">Editar / Excluir</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4">{categoria.nome}</td>
                <td className="py-2 px-4 flex gap-2">
                  <Link href={`/admin/categorias/editar/${categoria.id}`}>
                    <button className="text-blue-600 hover:underline">
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(categoria.id)}
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
