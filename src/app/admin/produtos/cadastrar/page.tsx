'use client';

import { useState, useEffect } from "react";
import api from "../../../../services/api";

interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  tamanho?: string;
  imagemUrl?: string;
  preco?: string;
  categoriaId?: string;
  artistaId?: string;
}

interface Categoria {
  id: number;
  nome: string;
}

interface Artista {
  id: number;
  nome: string;
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
    imagemUrl: "",
    preco: "",
    categoriaId: "",
    artistaId: "",
  });

  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [artistas, setArtistas] = useState<Artista[]>([]);

  // Carregar categorias e artistas
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/v1/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    const fetchArtistas = async () => {
      try {
        const response = await api.get("/v1/artistas");
        setArtistas(response.data);
      } catch (error) {
        console.error("Erro ao buscar artistas:", error);
      }
    };

    fetchCategorias();
    fetchArtistas();
  }, []);

  // Preencher form ao editar
  useEffect(() => {
    if (produto) {
      setForm(produto);
    }
  }, [produto]);

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
      let produtoData = { ...form };

      if (fotoFile) {
        const uploadedUrl = await uploadImagem(fotoFile);
        if (uploadedUrl) {
          produtoData.imagemUrl = uploadedUrl;
        }
      }

      if (produtoData.id) {
        await api.put(`/v1/produtos/${produtoData.id}`, produtoData);
        console.log("Produto atualizado com sucesso!");
      } else {
        await api.post("/v1/produtos", produtoData);
        console.log("Produto cadastrado com sucesso!");
      }

      onSave();

      setForm({
        nome: "",
        descricao: "",
        tamanho: "",
        imagemUrl: "",
        preco: "",
        categoriaId: "",
        artistaId: "",
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
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="tamanho"
          placeholder="Tamanho"
          value={form.tamanho}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="preco"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        {/* Select Categoria */}
        <select
          name="categoriaId"
          value={form.categoriaId}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Selecione uma Categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>

        {/* Select Artista */}
        <select
          name="artistaId"
          value={form.artistaId}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Selecione um Artista</option>
          {artistas.map((art) => (
            <option key={art.id} value={art.id}>{art.nome}</option>
          ))}
        </select>

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
