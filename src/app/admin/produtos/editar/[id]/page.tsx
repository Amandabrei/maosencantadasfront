"use client";

import { useState } from "react";
import { api } from "../../../../../services/api";

interface Produto {
    id: number;
    nome: string;
    descricao?: string;
    tamanho?: string;
    imagemUrl?: string;
    preco?: string;
    categoriaId?: string;
    artistaId?: string;
}

interface Props {
  produtoEditando: Artista;
  onSubmitSuccess: () => void;
  onCancelEdit: () => void;
}

export default function FormProduto({
  produtoEditando,
  onSubmitSuccess,
  onCancelEdit,
}: Props) {
  const [formData, setFormData] = useState(produtoEditando);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/v1/produtos/${formData.id}`, formData);
      onSubmitSuccess();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        placeholder="Nome"
        className="border p-2 rounded"
        required
      />
      <input
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        placeholder="Descrição"
        className="border p-2 rounded"
        required
      />
      <input
        name="tamanho"
        value={formData.tamanho || ""}
        onChange={handleChange}
        placeholder="Tamanho"
        className="border p-2 rounded"
      />
      <input
        name="preco"
        value={formData.preco || ""}
        onChange={handleChange}
        placeholder="Preço"
        className="border p-2 rounded"
      />
      <input
        name="telefone"
        value={formData.telefone || ""}
        onChange={handleChange}
        placeholder="Telefone"
        className="border p-2 rounded"
      />
      <input
        name="categoria"
        value={formData.categoriaId || ""}
        onChange={handleChange}
        placeholder="WhatsApp"
        className="border p-2 rounded"
      />
      <input
        name="artista"
        value={formData.artistaId || ""}
        onChange={handleChange}
        placeholder="Artista"
        className="border p-2 rounded"
      />
      
      <input
        name="foto"
        value={formData.imagemUrl || ""}
        onChange={handleChange}
        placeholder="URL da Foto"
        className="border p-2 rounded"
      />

      <div className="flex gap-2 col-span-full mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Atualizar
        </button>
        <button
          type="button"
          onClick={onCancelEdit}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
