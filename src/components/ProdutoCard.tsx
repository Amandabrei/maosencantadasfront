'use client';

import { useRouter } from 'next/navigation';

export default function ProdutoCard({ produto }: { produto: any }) {
  const router = useRouter();

  const handleSolicitarOrcamento = () => {
    router.push(`/login-orcamento?produtoId=${produto.id}`);
  };

  const imagemUrlCompleta = produto.imagemUrl
    ? `http://localhost:8080/api/files/${produto.imagemUrl.split('/').pop()}`
    : '/imagem-nao-encontrada.png';

  return (
    <div className="produto-card flex flex-col justify-between p-4 rounded-lg shadow-md bg-white h-[420px]">
      <div>
        <img 
          src={imagemUrlCompleta}
          alt={produto.nome}
          className="w-full h-48 object-cover rounded-xl"
        />
        <h2 className="text-lg font-bold mt-2">{produto.nome}</h2>
        <p className="text-sm text-gray-600 mt-1 h-[60px] overflow-hidden">
          {produto.descricao}
        </p>
      </div>

      <button className="button mt-4">Solicitar Orçamento</button>
    </div>
  );
}
