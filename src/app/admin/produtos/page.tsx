'use client';

import { useEffect, useState } from "react";
import api from "../../../services/api";
import FormProduto from "./form";
import Link from "next/link"; 

interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  tamanho?: string;
  imagemUrl?: string;
  preco?: string;
  categoria_id?: string;
  artista_id?: string;
  
}

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<Produto | null>(null);

  const fetchProdutos = () => {
    api
      .get("/v1/produtos")
      .then((res) => setProdutos(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await api.delete(`/v1/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">
        Lista de Produtos
      </h2>

      <div className="mb-4 text-right">
        <Link href="/admin/produtos/cadastrar" passHref>
          <button className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
            Cadastrar Novo Produto
          </button>
        </Link>
      </div>

      {editando && (
        <div className="mb-6">
          <FormArtista
            produto={editando}
            onSave={() => {
              setEditando(null);
              fetchProdutos();
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
              <th className="py-2 px-4 text-left">Descrição</th>
              <th className="py-2 px-4 text-left">Tamanho</th>
              <th className="py-2 px-4 text-left">Preço</th>
              <th className="py-2 px-4 text-left">Categoria</th>
              <th className="py-2 px-4 text-left">Artista</th>
              <th className="py-2 px-4 text-left">Imagem</th>
              <th className="py-2 px-4 text-left">Editar / Excluir</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4">{produto.nome}</td>
                <td className="py-2 px-4">{produto.descricao}</td>
                <td className="py-2 px-4">{produto.tamanho}</td>
                <td className="py-2 px-4">{produto.preco}</td>
                <td className="py-2 px-4">{produto.categoriaId}</td>
                <td className="py-2 px-4">{produto.artistaId}</td>
                
               
                <td className="py-2 px-4">
                  <img
                    src={produto.imagemUrl ? `http://localhost:8080/api/files/${produto.imagemUrl.split('/').pop()}` : '/imagem-nao-encontrada.png'}
                    alt={`Foto de ${produto.nome}`}
                    className="h-12 w-12 object-cover rounded-full"
                  />
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md"
                  >
                    <Link href={`/admin/produtos/editar/${produto.id}`} passHref>
                      Editar
                    </Link>
                  </button>

                  <button
                    onClick={() => handleDelete(produto.id)}
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
