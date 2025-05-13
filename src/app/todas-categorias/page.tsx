'use client'

import { useEffect, useState } from 'react'
import ProdutoCard from '../../components/ProdutoCard'
import { api } from '../../services/api' 
import Navbar from '../../components/Navbar' 
import Footer from '../../components/Footer' 
import Header from '../../components/Header'
import '../globals.css';

interface Produto {
  id: number
  nome: string
  descricao: string
  imagemUrl: string
  preco?: number
  artista: {
    id: number
    nome: string
    email: string
    whatsapp: string
  }
}

interface Categoria {
  id: number
  nome: string
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // Carregar categorias
  useEffect(() => {
    api.get('/v1/categorias')
      .then(response => {
        setCategorias(response.data || [])
      })
      .catch(error => {
        console.error('Erro ao carregar categorias:', error)
      })
  }, [])

  // Carregar produtos (todos ou por categoria)
  useEffect(() => {
    const endpoint = categoriaSelecionada
      ? `/v1/produtos/categoria/${categoriaSelecionada}`
      : '/v1/produtos'

    setLoading(true)
    api.get(endpoint)
      .then(response => {
        setProdutos(response.data || [])
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [categoriaSelecionada])

  return (
    <div>
      <Header />
      <Navbar />

      <div className="p-6">
        {/* Filtro por categoria */}
        <div className="mb-6">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por categoria:
          </label>
          <select
            id="categoria"
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
            value={categoriaSelecionada ?? ''}
            onChange={(e) => {
              const value = e.target.value
              setCategoriaSelecionada(value ? Number(value) : null)
            }}
          >
            <option value="">Todas as categorias</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Cabeçalho e botão de limpar filtro */}
        {!loading && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {categoriaSelecionada
                ? `Produtos da categoria: ${categorias.find(c => c.id === categoriaSelecionada)?.nome}`
                : 'Todos os produtos'}
            </h2>
            {categoriaSelecionada && (
              <button
                className="text-sm text-pink-600 hover:underline"
                onClick={() => setCategoriaSelecionada(null)}
              >
                Limpar filtro
              </button>
            )}
          </div>
        )}

        {/* Lista de produtos */}
        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtos.map(produto => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>

      <Footer artistaId={0} />
    </div>
  )
}
