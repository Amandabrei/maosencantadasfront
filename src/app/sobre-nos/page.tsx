'use client';

import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../app/globals.css';

const SobreNosPage: React.FC = () => {
  const imagemUrl = 'http://localhost:8080/api/files/sobre-nos.jpg';

  return (
    <>
      <Head>
        <title>Sobre o site - Mãos Encantadas</title>
        <meta name="description" content="Conheça mais sobre o site Mãos Encantadas." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Sobre nós</h1>

            <div className="flex justify-center mb-8">
                <img
                    src={imagemUrl}
                    alt="Sobre o site Mãos Encantadas"
                    className="w-full max-w-2xl rounded shadow-md"
                />
            </div>

          <p className="mb-6">
            Se foi feito com cuidado e criatividade, você encontra aqui na Mãos Encantadas!          
          </p>
          <p className="mb-6">
            Conectamos pessoas que buscam presentes únicos e cheios de significado com Artistas 
            talentosos de todo o Brasil. Aqui, cada peça é feita à mão, com carinho e dedicação  
            transformando memórias em arte e apoiando o trabalho de quem vive da própria criação.  
          </p>        
          <p className="mb-6">
            Nosso site permite uma experiência de compra mais próxima e humanizada. Através do nosso
            sistema de mensagens, você pode conversar diretamente com o artista, tirar dúvidas, 
            solicitar personalizações e acompanhar o andamento do seu pedido.
          </p>
          <p className="mb-6">
            Envie ideias, fotos de referência, você pode pedir peças personalizadas com nomes, data, fotos, criando 
            lembranças exclusivas para celebrar momentos especiais.
            Aprove para ver como sua encomenda está ficando antes de ser finalizada. Tudo isso de forma prática, organizada e segura, 
            com o histórico completo da conversa e do pedido sempre acessível.
           </p>
           <p className="mb-6">
            Navegue em nosso site e descubra nossos artistas e produtos encantadores. Seja muito bem-vindo à comunidade Mãos Encantadas!
           </p>
           
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SobreNosPage;
