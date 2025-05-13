'use client';

import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../app/globals.css';

const QueroComprarPage: React.FC = () => {
  const imagemUrl = 'http://localhost:8080/api/files/quero-comprar.jpg';

  return (
    <>
      <Head>
        <title>Como Comprar - Mãos Encantadas</title>
        <meta name="description" content="Aprenda como comprar produtos no site Mãos Encantadas." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Quero Comprar</h1>

            <div className="flex justify-center mb-8">
                <img
                    src={imagemUrl}
                    alt="Como comprar produtos artesanais"
                    className="w-full max-w-2xl rounded shadow-md"
                />
            </div>

          <p className="mb-6">
            Se foi feito com cuidado e criatividade, você encontra aqui na Mãos Encantadas.
          </p>
          <p className="mb-6">
            Esta página foi criada especialmente para você que deseja adquirir produtos artesanais únicos, feitos com carinho e dedicação.
          </p>
          <p className="mb-6">
           Navegue pelas categorias disponíveis e descubra produtos encantadores, peças únicas. 
           </p>
           <p className="mb-6">
           Quando encontrar algo que gostar, solicite um orçamento diretamente ao artista. Assim que receber a resposta com o valor, 
           é só confirmar o pagamento e aguardar o envio da sua encomenda com todo o cuidado.
          </p>
          <p className="mb-6">
            Se você deseja expor seus próprios produtos, visite a página{' '}
            <Link href="/quero-vender" className="text-blue-600 underline hover:text-blue-800">
              Quero Vender
            </Link>.
          </p>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default QueroComprarPage;
