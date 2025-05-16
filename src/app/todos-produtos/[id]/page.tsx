'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../../../services/api'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Header from '@components/components/Header'
import '../../globals.css'

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

export default function ProdutoDetalhes({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [produto, setProduto] = useState<Produto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token') // Recupera o token do localStorage

    if (!token) {
      console.error('Token não encontrado')
      setLoading(false)
      return
    }

    api.get(`/v1/produtos/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
      },
    })
      .then((response) => {
        setProduto(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erro ao carregar o produto:', error)
        setLoading(false)
      })
  }, [params.id])

  const handlePedirOrcamento = () => {
    router.push(`/login-orcamento?produtoId=${produto?.id}`)
  }

  if (loading) return <p>Carregando produto...</p>
  if (!produto) return <p>Produto não encontrado!</p>

  const imagemUrlCompleta = produto.imagemUrl
    ? `http://localhost:8080/api/files/${produto.imagemUrl.split('/').pop()}`
    : '/imagem-nao-encontrada.png'

  return (
    <div>
      <Header />
      <Navbar />g

      <div className="flex flex-col md:flex-row p-6">
        <div className="md:w-1/2">
          <img
            src={imagemUrlCompleta}
            alt={produto.nome}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
        <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold">{produto.nome}</h2>
          <p className="text-sm text-gray-600 mt-4">{produto.descricao}</p>
          <p className="text-lg font-semibold mt-4">Preço: R$ {produto.preco?.toFixed(2)}</p>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handlePedirOrcamento}
          >
            Pedir Orçamento
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
