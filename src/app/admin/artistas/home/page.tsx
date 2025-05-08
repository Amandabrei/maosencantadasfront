'use client';

import Link from 'next/link';

import CadastrarProduto from '../cadastra-produtos'; 

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-xl font-bold">Minha Plataforma</h1>
      </header>

      <div className="flex flex-1">
        {/* Menu à esquerda */}
        <nav className="bg-gray-200 w-64 p-4">
          <ul>
            <li>
              <Link href="/artistas/editar/1">Alterar meus dados</Link>
            </li>
            <li>
              <Link href="/artistas/cadastrar-produtos">Cadastrar produtos</Link>
            </li>
            <li>
              <Link href="/artistas/orcamento">Meus orçamentos</Link>
            </li>
          </ul>
        </nav>

        {/* Conteúdo à direita */}
        <div className="flex-1 p-6">
         
          <CadastrarProduto />
        </div>
      </div>
    </div>
  );
}
