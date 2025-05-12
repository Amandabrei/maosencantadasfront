"use client";

import { useState } from "react";
import api from "../../../../../services/api";

interface Orcamento {
  id: number;
  status: string;
  dataOrcamento: string;
  imagemUrl: string;
  clienteId: string;
  produtoId: string;
}

interface Props {
  orcamentoEditando: Orcamento;
  onSubmitSuccess: () => void;
  onCancelEdit: () => void;
}

export default function FormOrcamento({
  orcamentoEditando,
  onSubmitSuccess,
  onCancelEdit,
}: Props) {
  const [formData, setFormData] = useState(orcamentoEditando);
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/v1/orcamentos/${formData.id}`, formData);
      setMensagem("Orçamento atualizado com sucesso.");
      onSubmitSuccess();
    } catch (error) {
      console.error("Erro ao atualizar orçamento:", error);
      setMensagem("Erro ao atualizar orçamento.");
    }
  };

  const handleDelete = async () => {
    const confirmar = confirm("Deseja realmente excluir este orçamento?");
    if (!confirmar) return;

    try {
      await api.delete(`/v1/orcamentos/${formData.id}`);
      setMensagem("Orçamento excluído com sucesso.");
      onSubmitSuccess();
    } catch (error) {
      console.error("Erro ao excluir orçamento:", error);
      setMensagem("Erro ao excluir orçamento.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        name="status"
        value={formData.status}
        onChange={handleChange}
        placeholder="Status"
        className="border p-2 rounded"
        required
      />
      <input
        name="dataOrcamento"
        value={formData.dataOrcamento}
        onChange={handleChange}
        placeholder="Data do Orçamento (YYYY-MM-DDTHH:MM:SS)"
        className="border p-2 rounded"
        required
      />
      <input
        name="imagemUrl"
        value={formData.imagemUrl}
        onChange={handleChange}
        placeholder="URL da Imagem"
        className="border p-2 rounded"
      />
      <input
        name="clienteId"
        value={formData.clienteId}
        onChange={handleChange}
        placeholder="ID do Cliente"
        className="border p-2 rounded"
        required
      />
      <input
        name="produtoId"
        value={formData.produtoId}
        onChange={handleChange}
        placeholder="ID do Produto"
        className="border p-2 rounded"
        required
      />

      <div className="flex gap-2 col-span-full mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Atualizar
        </button>
        <button
          type="button"
          onClick={onCancelEdit}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-auto"
        >
          Excluir
        </button>
      </div>

      {mensagem && (
        <p className="col-span-full text-sm mt-2 text-center text-green-700">
          {mensagem}
        </p>
      )}
    </form>
  );
}
