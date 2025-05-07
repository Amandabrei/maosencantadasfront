"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../types/AuthContext";
import api from "../../../services/api";

interface CategoriaForm {
  id?: number;
  nome: string;
  
}

export default function FormCategoria({
  categoriaEditando,
  onSubmitSuccess,
  onCancelEdit
}: {
  categoriaEditando: CategoriaForm | null;
  onSubmitSuccess: () => void;
  onCancelEdit?: () => void;
}) {
  const { role } = useAuth();
  const [form, setForm] = useState<CategoriaForm>({
    nome: "",
    
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (categoriaEditando) {
      setForm(categoriaEditando);
    }
  }, [categoriaEditando]);

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
        await api.put(`/v1/categorias/${form.id}`, form);
        setMensagem("Categoria atualizada com sucesso.");
      } else {
        await api.post("/v1/categorias", form);
        setMensagem("Categoria cadastrada com sucesso.");
      }

      setForm({
        nome: "",
        
      });

      onSubmitSuccess();
    } catch (error: any) {
      setMensagem(`Erro: ${error.response?.data?.message || error.message}`);
    }
  };

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
      {form.id ? "Editar Categoria" : "Cadastrar Novo Categoria"}
    </h3>
  
    {Object.keys(form).map((key) => (
      <div key={key} className="mb-4">
        <label className="block mb-1 capitalize text-sm font-semibold text-gray-700">
          {key}
        </label>
        <input
          name={key}
          value={form[key as keyof CategoriaForm]}
          onChange={handleChange}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
    ))}
  
    <div className="flex justify-between mt-6">
      <button
        type="submit"
        className="button"
      >
        {form.id ? "Atualizar" : "Cadastrar"}
      </button>
  
      {form.id && onCancelEdit && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="button bg-red-400 hover:bg-red-500"
        >
          Cancelar
        </button>
      )}
    </div>
  
    {mensagem && <p className="mt-4 text-sm text-green-700">{mensagem}</p>}
  </form>
  
  );
}
