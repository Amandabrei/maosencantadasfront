'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../services/api';
import Footer from '@components/components/Footer';
import Header from '@components/components/Header';
import Navbar from '@components/components/Navbar'; 

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  tamanho: string;
  preco: number;
  imagemUrl: string;
}

export default function ProdutosPorArtista() {
  const params = useParams();
  const router = useRouter(); 
  const id = params?.id;
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/produtos/artista/${id}`)
        .then(res => setProdutos(res.data))
        .catch(err => console.error('Erro ao buscar produtos:', err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSolicitarOrcamento = () => {
    router.push('/login-orcamento'); 
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="produtos-container">
      <Header />
      <Navbar /> 

      <h1 className="text-2xl font-bold my-4 text-center">Produtos do Artista: {id}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {produtos.map(produto => (
          <div key={produto.id} className="produto-card p-4 rounded-lg shadow-lg bg-white">
            <img
              src={produto.imagemUrl}
              alt={produto.nome}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-2">{produto.nome}</h2>
            <p className="text-gray-600 mt-1">{produto.descricao}</p>
            <p className="mt-2">Tamanho: {produto.tamanho}</p>
            <p className="mt-2 font-semibold">Preço: R${produto.preco.toFixed(2)}</p>
            
            <button
              onClick={handleSolicitarOrcamento}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
            >
              Solicitar Orçamento
            </button>
          </div>
        ))}
      </div>

      <Footer artistaId={Number(id)} />
    </div>
  );
}
