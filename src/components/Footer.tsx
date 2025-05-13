'use client';

import { useEffect, useState } from 'react';
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { api } from '../services/api';

interface Artista {
  id: number;
  nome: string;
  insta: string;
  whatsapp: string;
  face: string;
}

interface FooterProps {
  artistaId?: number;
}

export default function Footer({ artistaId = 0 }: FooterProps) {
  const [artista, setArtista] = useState<Artista | null>(null);

  useEffect(() => {
    if (artistaId === 0) {
      setArtista(null);
      return;
    }

    api.get(`/artistas/${artistaId}`)
      .then((res) => setArtista(res.data))
      .catch((err) => {
        console.error('Erro ao buscar artista:', err);
        setArtista(null);
      });
  }, [artistaId]);

  return (
    <footer className="bg-pink-100 text-center text-gray-700 py-6 mt-10 shadow-inner fixed bottom-0 left-0 w-full">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-sm font-medium">
          maosencantadas © 2025 – Todos os direitos reservados
        </p>

        <div className="flex space-x-10 text-xs text-gray-600">
          <a href="/termo-uso" className="mx-10 hover:underline hover:text-pink-600">Termos de Uso</a>
          <a href="/politica-privacidade" className="mx-10 hover:underline hover:text-pink-600">Política de Privacidade</a>
          <a href="/politica-devolucao" className="mx-10 hover:underline hover:text-pink-600">Política de Devolução e Reembolso</a>
        </div>

        {artista && (
          <div className="flex space-x-8 text-xl text-pink-600">
            {artista.insta && (
              <a href={artista.insta} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-red-800 transition" />
              </a>
            )}
            {artista.whatsapp && (
              <a href={`https://wa.me/${artista.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="hover:text-green-600 transition" />
              </a>
            )}
            {artista.face && (
              <a href={artista.face} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="hover:text-blue-700 transition" />
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
