'use client';

import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../app/globals.css';

const QueroVenderPage: React.FC = () => {
  const imagemUrl = 'http://localhost:8080/api/files/quero-vender.jpg';

  return (
    <>
      <Head>
        <title>Como Vender - Mãos Encantadas</title>
        <meta name="description" content="Aprenda como vender produtos no site Mãos Encantadas." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Quero Vender</h1>

            <div className="flex justify-center mb-8">
                <img
                    src={imagemUrl}
                    alt="Como vender produtos artesanais"
                    className="w-full max-w-2xl rounded shadow-md"
                />
            </div>

          <p className="mb-6">
            Deseja vender seus produtos no nosso site? É simples e gratuito!          </p>
          <p className="mb-6">
            O primeiro passo é fazer seu cadastro — totalmente grátis. Depois, você já pode começar a divulgar suas peças artesanais por aqui.           </p>
           <p className="mb-6">
            Capriche na foto do seu produto e escreva uma descrição detalhada e atrativa. Assim que um cliente se interessar, ele poderá solicitar um orçamento diretamente com você.
            Após a confirmação do pagamento com o valor que você definiu, embale a peça com cuidado e envie para o endereço combinado. Lembre-se de incluir o valor do frete no preço final do produto.
          </p>
          <p className="mb-6">
           Em seguida, gere a etiqueta de envio e leve o pacote até a agência dos Correios mais próxima. Não se esqueça de enviar o código de rastreio ao cliente, para que ele possa acompanhar a entrega com tranquilidade.
           </p>
           <p className="mb-6">É fácil e rápido, clique e faça seu{' '}
            <Link href="/cadastro-artista" className="text-blue-600 underline hover:text-blue-800">
              cadastro
            </Link>.
          </p>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default QueroVenderPage;
