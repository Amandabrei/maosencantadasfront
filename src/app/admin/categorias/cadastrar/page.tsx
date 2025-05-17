'use client';

import { useState, useEffect } from "react";
import { api } from "../../../../services/api";

interface Categoria {
  id?: number;
  nome: string;
}

interface FormCategoriaProps {
  categoria?: Categoria;
  onSave: () => void;
  onCancel?: () => void;
}

export default function FormCategoria({ categoria, onSave, onCancel }: FormCategoriaProps) {
  const [form, setForm] = useState<Categoria>({
    nome: "",
  });

  useEffect(() => {
    if (categoria) {
      setForm(categoria);
    }
  }, [categoria]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const categoriaData = { ...form };

      if (categoriaData.id) {
        const response = await api.put(`/v1/categorias/${categoriaData.id}`, categoriaData);
        console.log("Categoria atualizada com sucesso:", response.data);
      } else {
        const response = await api.post("/v1/categorias", categoriaData);
        console.log("Categoria cadastrada com sucesso:", response.data);
      }

      onSave();
      setForm({ nome: "" });
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-800">
        {form.id ? "Editar Categoria" : "Cadastrar Categoria"}
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
