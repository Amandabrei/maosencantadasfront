'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [conteudoSelecionado, setConteudoSelecionado] = useState<'editar' | 'orcamentos' | 'produtos' | null>(null);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-green-200 p-4 text-white flex items-center justify-center gap-4">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        <h1 className="text-xl font-bold text-pink-800">Área de Artistas</h1>
      </header>

      <div className="flex flex-1">
        {/* Menu à esquerda */}
        <nav className="bg-gray-200 w-64 p-4">
          <ul className="space-y-2">
            <li><button onClick={() => setConteudoSelecionado('editar')}>Alterar meus dados</button></li>
            <li><button onClick={() => setConteudoSelecionado('orcamentos')}>Meus orçamentos</button></li>
            <li><button onClick={() => setConteudoSelecionado('produtos')}>Meus produtos</button></li>
          </ul>
        </nav>

        {/* Conteúdo à direita */}
        <div className="flex-1 p-6 bg-white shadow-inner rounded-md">
          {conteudoSelecionado === 'editar' && <FormularioDadosArtista />}
          {conteudoSelecionado === 'orcamentos' && <Orcamentos />}
          {conteudoSelecionado === 'produtos' && <ProdutosList />}
          {!conteudoSelecionado && <p>Selecione uma opção no menu ao lado.</p>}
        </div>
      </div>
    </div>
  );
}
