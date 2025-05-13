'use client';

import Head from 'next/head';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../app/globals.css';

const PoliticaPrivacidadePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Política Privacidade - Mãos Encantadas</title>
        <meta name="description" content="Política Privacidade do site Mãos Encantadas." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Política Privacidade - Mãos Encantadas</h1>

          <p className="mb-6">
            A Maos Encantadas, plataforma de produtos criativos, coleta e utiliza dados pessoais de seus usuários 
            (compradores, vendedores e visitantes) para oferecer uma experiência personalizada e segura. Ao utilizar a plataforma, 
            o usuário concorda com esta Política de Privacidade. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>1. Dados Coletados: </strong><br /> 

                Durante o cadastro, a Maos Encantadas solicita dados como nome, CPF, e-mail, endereço, telefone, entre outros. <br />

                A plataforma também coleta dados automaticamente sobre o uso, como localização, dispositivos acessados e interações realizadas. <br />

                Informações de pagamento e transações também são coletadas para processar compras e vendas. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>2. Finalidade: </strong><br />
                O uso dos dados visa facilitar transações, garantir segurança, prevenir fraudes e melhorar a experiência do usuário.<br />  

                A plataforma pode usar cookies e tecnologias semelhantes para personalizar o conteúdo e os anúncios.   <br /> <br />         
            </p>
          <p className="mb-6">
            <strong>3. Compartilhamento de Dados:</strong><br />
                A Maos Encantadas pode compartilhar dados com empresas do seu grupo e parceiros para prestar serviços, processar 
                pagamentos e melhorar a plataforma.<br />

                Dados também podem ser compartilhados com autoridades legais, quando necessário. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>4. Proteção de Dados:</strong><br />
               A plataforma adota medidas de segurança, como criptografia e acessos controlados, para proteger os dados dos usuários. 
               No entanto, não há garantia absoluta contra vazamentos. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>5. Cookies: </strong><br />
                A Maos Encantadas utiliza cookies para melhorar a navegação e personalizar a experiência do usuário. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>6. Transferência Internacional de Dados: </strong><br />
                Dados pessoais podem ser armazenados em servidores fora do Brasil, com as devidas proteções legais.<br />

                Ao utilizar a plataforma, o usuário concorda com o tratamento de seus dados conforme descrito nesta política.<br />
          </p>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PoliticaPrivacidadePage;
