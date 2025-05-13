'use client';

import Link from 'next/link';

export default function ArtistaCard({ artista }: { artista: any }) {
  
  const imagemUrlCompleta = artista.foto
    ? `http://localhost:8080/api/files/${artista.foto.split('/').pop()}` 
    : '/imagem-nao-encontrada.png'; 

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <img 
        src={imagemUrlCompleta} 
        alt={artista.nome} 
        className="w-full h-48 object-cover rounded-xl" 
      />
      <h2 className="text-lg font-bold mt-2">{artista.nome}</h2>
      <Link href={`http://localhost:8080//api/v1/produtos?artista_id=${artista.id}`}>
        <button className="button mt-4">Ver Produtos</button>
      </Link>
    </div>
  );
}
