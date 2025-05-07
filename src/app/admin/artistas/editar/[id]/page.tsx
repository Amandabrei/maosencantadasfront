"use client";

import { useState } from "react";
import api from "../../../../../services/api";

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

interface Props {
  artistaEditando: Artista;
  onSubmitSuccess: () => void;
  onCancelEdit: () => void;
}

export default function FormArtista({
  artistaEditando,
  onSubmitSuccess,
  onCancelEdit,
}: Props) {
  const [formData, setFormData] = useState(artistaEditando);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/artistas/${formData.id}`, formData);
      onSubmitSuccess();
    } catch (error) {
      console.error("Erro ao atualizar artista:", error);
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
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded"
        required
      />
      <input
        name="cpf"
        value={formData.cpf || ""}
        onChange={handleChange}
        placeholder="CPF"
        className="border p-2 rounded"
      />
      <input
        name="endereco"
        value={formData.endereco || ""}
        onChange={handleChange}
        placeholder="Endereço"
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
        name="whatsapp"
        value={formData.whatsapp || ""}
        onChange={handleChange}
        placeholder="WhatsApp"
        className="border p-2 rounded"
      />
      <input
        name="insta"
        value={formData.insta || ""}
        onChange={handleChange}
        placeholder="Instagram"
        className="border p-2 rounded"
      />
      <input
        name="face"
        value={formData.face || ""}
        onChange={handleChange}
        placeholder="Facebook"
        className="border p-2 rounded"
      />
      <input
        name="foto"
        value={formData.foto || ""}
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
