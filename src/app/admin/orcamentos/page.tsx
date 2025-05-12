"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../types/AuthContext";
import api from "../../../services/api";

interface OrcamentoForm {
  id?: number;
  status: string;
  dataOrcamento: string;
  imagemUrl: string;
  clienteId: string;
  produtoId: string;
}

export default function FormOrcamento({
  orcamentoEditando,
  onSubmitSuccess,
  onCancelEdit,
}: {
  orcamentoEditando: OrcamentoForm | null;
  onSubmitSuccess: () => void;
  onCancelEdit?: () => void;
}) {
  const { role } = useAuth();
  const [form, setForm] = useState<OrcamentoForm>({
    status: "",
    dataOrcamento: "",
    imagemUrl: "",
    clienteId: "",
    produtoId: "",
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (orcamentoEditando) {
      setForm(orcamentoEditando);
    }
  }, [orcamentoEditando]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (form.id) {
        await api.put(`/v1/orcamentos/${form.id}`, form);
        setMensagem("Orçamento respondido com sucesso.");
      } else {
        await api.post("/v1/orcamentos", form);
        setMensagem("Orçamento criado com sucesso.");
      }
      onSubmitSuccess();
    } catch (error: any) {
      setMensagem(`Erro: ${error.response?.data?.message || error.message}`);
    }
  };

  if (role !== "ADMIN") return <p>Acesso restrito.</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-8"
    >
      <h3 className="text-xl font-bold mb-6 text-center text-indigo-800">
        Responder Orçamento
      </h3>

      {Object.keys(form).map((key) => (
        key !== "id" && (
          <div key={key} className="mb-4">
            <label className="block mb-1 capitalize text-sm font-semibold text-gray-700">
              {key}
            </label>
            <input
              name={key}
              value={form[key as keyof OrcamentoForm]}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        )
      ))}

      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="button"
        >
          Salvar Resposta
        </button>

        {onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="button bg-gray-400 hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>

      {mensagem && <p className="mt-4 text-sm text-green-700">{mensagem}</p>}
    </form>
  );
}
