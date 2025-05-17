'use client';

import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ArtistaCard from '../../components/ArtistaCard'; 
import '../globals.css';

interface Artista {
  id: number;
  nome: string;
  foto: string;
  categoriaId: number;  
}

interface Categoria {
  id: number;
  nome: string;
}

export default function Home() {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  
  useEffect(() => {
    api.get('/v1/artistas').then(res => setArtistas(res.data));
  }, []);

  
  useEffect(() => {
    api.get('/v1/categorias').then(res => setCategorias(res.data));
  }, []);

  
  const getCategoriaNome = (categoriaId: number) => {
    const categoria = categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nome : 'Categoria não encontrada';
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {artistas.map(artista => (
          <ArtistaCard 
            key={artista.id} 
            artista={artista} 
            categoria={getCategoriaNome(artista.categoriaId)} 
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
