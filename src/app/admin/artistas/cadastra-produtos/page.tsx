'use client';

import { useState } from 'react';
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
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/v1/produtos', produto); // ou sua URL real
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

        <div>
          <label htmlFor="categoriaId" className="block text-lg">Categoria</label>
          <input
            type="text"
            id="categoriaId"
            name="categoriaId"
            value={produto.categoriaId}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="artistaId" className="block text-lg">Artista</label>
          <input
            type="text"
            id="artistaId"
            name="artistaId"
            value={produto.artistaId}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

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

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}
