'use client';

import { useEffect, useState } from 'react';
import { api } from '../../../../services/api'; 

export default function CadastrarProduto() {
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    tamanho: '',
    preco: '',
    categoriaId: '',
    artistaId: '',
    imagemUrl: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [mensagem, setMensagem] = useState('');

  
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [catRes, artRes] = await Promise.all([
          api.get('/v1/categorias'),
          api.get('/v1/artistas'),
        ]);
        setCategorias(catRes.data);
        setArtistas(artRes.data);
      } catch (err) {
        console.error('Erro ao buscar categorias ou artistas:', err);
      }
    };

    fetchDados();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagemFile(e.target.files[0]);
    }
  };

  const uploadImagem = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data.url || null;
    } catch (err) {
      console.error('Erro ao fazer upload da imagem:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');

    try {
      let imagemUrl = produto.imagemUrl;

      if (imagemFile) {
        const uploadedUrl = await uploadImagem(imagemFile);
        if (uploadedUrl) imagemUrl = uploadedUrl;
      }

      const novoProduto = {
        ...produto,
        preco: parseFloat(produto.preco),
        imagemUrl,
      };

      await api.post('/v1/produtos', novoProduto);
      setMensagem('Produto cadastrado com sucesso!');
      setProduto({
        nome: '',
        descricao: '',
        tamanho: '',
        preco: '',
        categoriaId: '',
        artistaId: '',
        imagemUrl: '',
      });
      setImagemFile(null);
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      setMensagem('Erro ao cadastrar o produto. Verifique os dados.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Produto</h2>
      {mensagem && <p className="mb-4 text-red-500">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nome" placeholder="Nome" value={produto.nome} onChange={handleChange} required className="border p-2 w-full rounded" />

        <input type="text" name="descricao" placeholder="Descrição" value={produto.descricao} onChange={handleChange} required className="border p-2 w-full rounded" />

        <input type="text" name="tamanho" placeholder="Tamanho" value={produto.tamanho} onChange={handleChange} required className="border p-2 w-full rounded" />

        <input type="number" name="preco" placeholder="Preço" value={produto.preco} onChange={handleChange} required className="border p-2 w-full rounded" />

        <select name="categoriaId" value={produto.categoriaId} onChange={handleChange} required className="border p-2 w-full rounded">
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat: any) => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>

        <select name="artistaId" value={produto.artistaId} onChange={handleChange} required className="border p-2 w-full rounded">
          <option value="">Selecione um artista</option>
          {artistas.map((art: any) => (
            <option key={art.id} value={art.id}>{art.nome}</option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 w-full rounded" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}
