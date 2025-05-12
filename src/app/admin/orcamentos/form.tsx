"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";
import FormOrcamento from "./form";

interface Orcamento {
  id: number;
  status: string;
  dataOrcamento: string;
  imagemUrl: string;
  clienteId: string;
  produtoId: string;
}

export default function ListaOrcamentos() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [editando, setEditando] = useState<Orcamento | null>(null);

  const fetchOrcamentos = () => {
    api
      .get("/v1/orcamentos")
      .then((res) => setOrcamentos(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">
        Lista de Orçamentos
      </h2>

      {editando && (
        <div className="mb-6">
          <FormOrcamento
            orcamentoEditando={editando}
            onSubmitSuccess={() => {
              setEditando(null);
              fetchOrcamentos();
            }}
            onCancelEdit={() => setEditando(null)}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-indigo-100 text-indigo-900">
              <th className="py-2 px-4 text-left">Data</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Cliente</th>
              <th className="py-2 px-4 text-left">Produto</th>
              <th className="py-2 px-4 text-left">Imagem do Produto</th>
              <th className="py-2 px-4 text-left">Responder</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos.map((orcamento) => (
              <tr key={orcamento.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4">{orcamento.dataOrcamento}</td>
                <td className="py-2 px-4">{orcamento.status}</td>
                <td className="py-2 px-4">{orcamento.clienteId}</td>
                <td className="py-2 px-4">{orcamento.produtoId}</td>
                <td className="py-2 px-4">
                  <img
                    src={orcamento.imagemUrl ? `http://localhost:8080/api/files/${orcamento.imagemUrl.split('/').pop()}` : '/imagem-nao-encontrada.png'}
                    alt={`Foto de ${orcamento.produtoId}`}
                    className="h-12 w-12 object-cover rounded-full"
                  />
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => setEditando(orcamento)}
                    className="text-blue-600 hover:underline"
                  >
                    Responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
