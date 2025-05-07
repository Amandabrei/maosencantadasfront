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
  imagemUrl: string;
}

export default function Home() {
  const [artistas, setArtistas] = useState<Artista[]>([]);

  useEffect(() => {
    api.get('/v1/artistas').then(res => setArtistas(res.data));
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {artistas.map(artista => (
          <ArtistaCard key={artista.id} artista={artista} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
