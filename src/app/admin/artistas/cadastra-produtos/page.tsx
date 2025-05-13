'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CadastrarProduto() {
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    tamanho: '',
    imagemUrl: '',
    preco: '',
    categoriaId: '',
    artistaId: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // Buscar categorias e artistas ao carregar a página
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    const fetchArtistas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/artistas');
        setArtistas(response.data);
      } catch (error) {
        console.error('Erro ao buscar artistas:', error);
      }
    };

    fetchCategorias();
    fetchArtistas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/v1/produtos', produto); 
      setMensagem('Produto cadastrado com sucesso!');
      setProduto({
        nome: '',
        descricao: '',
        tamanho: '',
        imagemUrl: '',
        preco: '',
        categoriaId: '',
        artistaId: '',
      });
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao cadastrar o produto. Tente novamente.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Produto</h2>
      {mensagem && <div className="mb-4 text-red-500">{mensagem}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label htmlFor="nome" className="block text-lg">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="descricao" className="block text-lg">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Tamanho */}
        <div>
          <label htmlFor="tamanho" className="block text-lg">Tamanho</label>
          <input
            type="text"
            id="tamanho"
            name="tamanho"
            value={produto.tamanho}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Preço */}
        <div>
          <label htmlFor="preco" className="block text-lg">Preço</label>
          <input
            type="text"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Categoria */}
        <div>
          <label htmlFor="categoriaId" className="block text-lg">Categoria</label>
          <select
            id="categoriaId"
            name="categoriaId"
            value={produto.categoriaId}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria: any) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Artista */}
        <div>
          <label htmlFor="artistaId" className="block text-lg">Artista</label>
          <select
            id="artistaId"
            name="artistaId"
            value={produto.artistaId}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          >
            <option value="">Selecione um artista</option>
            {artistas.map((artista: any) => (
              <option key={artista.id} value={artista.id}>
                {artista.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Imagem */}
        <div>
          <label htmlFor="imagemUrl" className="block text-lg">Imagem</label>
          <input
            type="text"
            id="imagemUrl"
            name="imagemUrl"
            value={produto.imagemUrl}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Botão */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}
