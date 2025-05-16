'use client';

import { useState, useEffect } from "react";
import api from "../../../../services/api";

interface Categoria {
  id: number;
  nome: string;
}

interface Artista {
  id?: number;
  nome: string;
  email: string;
  cpf?: string;
  endereco?: string;
  telefone?: string;
  whatsapp?: string;
  insta?: string;
  face?: string;
  foto?: string;
  categoriaId?: string;
}

interface FormArtistaProps {
  artista?: Artista;
  onSave: () => void;
  onCancel?: () => void;
}

export default function FormArtista({ artista, onSave, onCancel }: FormArtistaProps) {
  const [form, setForm] = useState<Artista>({
    nome: "",
    email: "",
    cpf: "",
    endereco: "",
    telefone: "",
    whatsapp: "",
    insta: "",
    face: "",
    foto: "",
    categoriaId: "",
  });

  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

 
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/v1/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

 
  useEffect(() => {
    if (artista) {
      setForm(artista);
    }
  }, [artista]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
    }
  };

  const uploadImagem = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.url || null;
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let artistaData = { ...form };

      if (fotoFile) {
        const uploadedUrl = await uploadImagem(fotoFile);
        if (uploadedUrl) {
          artistaData.foto = uploadedUrl;
        }
      }

      if (artistaData.id) {
        await api.put(`/v1/artistas/${artistaData.id}`, artistaData);
      } else {
        await api.post("/v1/artistas", artistaData);
      }

      onSave?.();
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
        categoriaId: "",
      });
      setFotoFile(null);
    } catch (error) {
      console.error("Erro ao salvar artista:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-800">
        {form.id ? "Editar Artista" : "Cadastrar Artista"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="cpf" placeholder="Cpf" value={form.cpf} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="endereco" placeholder="Endereco" value={form.endereco} onChange={handleChange} required className="border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="whatsapp" placeholder="Whatsapp" value={form.whatsapp} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="insta" placeholder="Instagram" value={form.insta} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="face" placeholder="Facebook" value={form.face} onChange={handleChange} required className="border p-2 rounded" />

        {/* Select de categoria */}
        <select
          name="categoriaId"
          value={form.categoriaId}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>

        {/* Upload de imagem */}
        <input type="file" name="foto" onChange={handleFileChange} accept="image/*" className="border p-2 rounded col-span-2" />
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
            Cancelar
          </button>
        )}
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          {form.id ? "Atualizar" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}
