'use client'

import { useEffect, useState } from 'react'
import ProdutoCard from '../../components/ProdutoCard'
import { api } from '../../services/api'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Header from '@components/components/Header'
import '../globals.css'

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

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/v1/produtos')
      .then(response => {
        setProdutos(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <Header />
      <Navbar />

      <div className="p-6">
        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
            {produtos.map(produto => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
