"use client";

import { useEffect, useState } from "react";
import { api } from "../../../../../services/api";

interface Categoria {
  id: number;
  nome: string;
}

interface Props {
  categoriaEditando: Categoria;
  onSubmitSuccess: () => void;
  onCancelEdit: () => void;
}

export default function FormCategoria({
  categoriaEditando,
  onSubmitSuccess,
  onCancelEdit,
}: Props) {
  const [formData, setFormData] = useState<Categoria>(categoriaEditando || { id: 0, nome: '' });


  useEffect(() => {
    if (categoriaEditando) {
      setFormData(categoriaEditando);
    }
  }, [categoriaEditando]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/v1/categorias/${formData.id}`, formData);
      onSubmitSuccess();
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
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
