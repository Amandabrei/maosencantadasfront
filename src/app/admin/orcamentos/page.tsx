'use client'

import { useEffect, useState } from 'react'
import { api } from '../../../services/api'

interface Orcamento {
  id: number
  numero: string
  dataOrcamento: string
  status: 'PENDENTE' | 'APROVADO' | 'REPROVADO'
  imagemUrl: string
}

interface Cliente {
  id: number
  nome: string
}

export default function ListaOrcamentos() {
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])

  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId')

    if (!clienteId) {
      console.error('Cliente não autenticado')
      return
    }

    api.get(`/v1/clientes/${clienteId}`)
      .then(res => setCliente(res.data))
      .catch(err => console.error('Erro ao buscar cliente:', err))

    api.get(`/v1/orcamentos/cliente/${clienteId}`)
      .then(res => setOrcamentos(res.data))
      .catch(err => console.error('Erro ao buscar orçamentos:', err))
  }, [])

  const aprovarOrcamento = async (id: number) => {
    try {
      await api.put(`/v1/orcamentos/${id}/aprovar`)
      setOrcamentos(prev =>
        prev.map(o => (o.id === id ? { ...o, status: 'APROVADO' } : o))
      )
    } catch (err) {
      console.error('Erro ao aprovar orçamento:', err)
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Orçamentos de: {cliente?.nome}</h2>

      <div className="grid grid-cols-1 gap-4 mt-6">
        {orcamentos.map(orcamento => (
          <div key={orcamento.id} className="border p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div className="font-bold">Orçamento #{orcamento.id}</div>
              <div className="text-sm text-gray-600">
                {orcamento.dataOrcamento.split('T')[0]}
              </div>
              <div className={`font-semibold ${orcamento.status === 'PENDENTE' ? 'text-yellow-500' : 'text-green-600'}`}>
                {orcamento.status}
              </div>
            </div>
            <img
              src={`http://localhost:8080/api/files/${orcamento.imagemUrl}`}
              alt="Imagem do produto"
              className="mt-4 w-full h-48 object-cover rounded-md"
            />
            {orcamento.status === 'PENDENTE' && (
              <button
                onClick={() => aprovarOrcamento(orcamento.id)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              >
                Aprovar Orçamento
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
