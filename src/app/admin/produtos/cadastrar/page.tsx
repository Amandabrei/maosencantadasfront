'use client';

import { useState, useEffect } from "react";
import api from "../../../../services/api";

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

interface FormProdutoProps {
  produto?: Produto;
  onSave: () => void;
  onCancel?: () => void;
}

export default function FormProduto({ produto, onSave, onCancel }: FormProdutoProps) {
  const [form, setForm] = useState<Produto>({
    nome: "",
    descricao: "",
    tamanho: "",
    imagemurl: "",
    preco: "",
    categoria_id: "",
    artista_id: "",
  });

  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const uploadImagem = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    
      try {
        const response = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        const filename = response.data.filename;
        return filename ? filename : null;
      } catch (error) {
        console.error("Erro no upload da imagem:", error);
        return null;
      }
    };

  useEffect(() => {
    if (produto) {
      setForm(produto);
    }
  }, [produto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let produtoData = { ...form };

      
      if (fotoFile) {
        const uploadedUrl = await uploadImagem(fotoFile);
        if (uploadedUrl) {
          produtoData.foto = uploadedUrl;
        }
      }

      if (produtoData.id) {
        const response = await api.put(`/v1/produtos/${produtoData.id}`, produtoData);
        console.log("Produto atualizado com sucesso:", response.data);
      } else {
        const response = await api.post("/v1/produtos", produtoData);
        console.log("Produto cadastrado com sucesso:", response.data);
      }

      onSave();
      setForm({
        nome: "",
        descricao: "",
        tamanho: "",
        imagemurl: "",
        preco: "",
        categoria_id: "",
        artista_id: "",
      });
      setFotoFile(null);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-800">
        {form.id ? "Editar Produto" : "Cadastrar Produto"}
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
        <input
          type="descricao"
          name="descricao"
          placeholder="Descricao"
          value={form.descricao}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="tamanho"
          name="tamanho"
          placeholder="Tamanho"
          value={form.tamanho}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        
        <input
          type="telefone"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="categoria"
          name="categoria"
          placeholder="Categoria"
          value={form.categoria_id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="artista"
          name="artista"
          placeholder="Artista"
          value={form.artista_id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="file"
          name="foto"
          onChange={handleFileChange}
          accept="image/*"
          className="border p-2 rounded col-span-2"
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
