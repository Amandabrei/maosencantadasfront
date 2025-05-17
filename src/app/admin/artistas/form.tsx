"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../types/AuthContext";

import { api } from "../../../services/api";

interface ArtistaForm {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  endereco: string;
  telefone: string;
  whatsapp: string;
  insta: string;
  face: string;
  foto: string;
}

interface FormArtistaProps {
  artistaEditando: ArtistaForm | null;
  onSubmitSuccess: () => void;
  onCancelEdit?: () => void;
}

export default function FormArtista({
  artistaEditando,
  onSubmitSuccess,
  onCancelEdit
}: FormArtistaProps) {
  const { role } = useAuth();
  const [form, setForm] = useState<ArtistaForm>({
    nome: "",
    email: "",
    cpf: "",
    endereco: "",
    telefone: "",
    whatsapp: "",
    insta: "",
    face: "",
    foto: "",
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (artistaEditando) {
      setForm(artistaEditando);
    }
  }, [artistaEditando]);

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
        await api.put(`/v1/artistas/${form.id}`, form);
        setMensagem("Artista atualizado com sucesso.");
      } else {
        await api.post("/v1/artistas", form);
        setMensagem("Artista cadastrado com sucesso.");
      }

      setForm({
        nome: "",
        email: "",
        cpf: "",
        endereco: "",
        telefone: "",
        whatsapp: "",
        insta: "",
        face: "",
        foto: "",
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
        {form.id ? "Editar Artista" : "Cadastrar Novo Artista"}
      </h3>

      {Object.keys(form).map((key) => (
        <div key={key} className="mb-4">
          <label className="block mb-1 capitalize text-sm font-semibold text-gray-700">
            {key}
          </label>
          <input
            name={key}
            value={form[key as keyof ArtistaForm]}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button type="submit" className="button">
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
