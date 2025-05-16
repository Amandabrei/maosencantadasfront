'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../../services/api";
import FormArtista from "../../form";

interface Artista {
  id: number;
  nome: string;
  email: string;
  cpf?: string;
  endereco?: string;
  telefone?: string;
  whatsapp?: string;
  insta?: string;
  face?: string;
  foto?: string;
  categoriaId?: string | number;
}

export default function EditarArtista() {
  const [artista, setArtista] = useState<Artista | null>(null);
  const router = useRouter();
  const params = useParams();
  const artistaId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const fetchArtista = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(`/v1/artistas/${artistaId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setArtista({
          ...response.data,
          id: Number(artistaId), 
        });
      } catch (error) {
        console.error("Erro ao buscar artista:", error);
      }
    };

    if (artistaId) {
      fetchArtista();
    }
  }, [artistaId]);

  const handleSuccess = () => {
    alert("Artista atualizado com sucesso!");
    router.push("/admin/artistas");
  };

  const handleCancel = () => {
    router.push("/admin/artistas");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Artista</h1>
      {artista ? (
        <FormArtista
          artista={artista}
          onSave={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <p>Carregando artista...</p>
      )}
    </div>
  );
}
