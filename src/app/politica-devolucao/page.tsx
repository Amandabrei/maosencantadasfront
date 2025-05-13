'use client';

import Head from 'next/head';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../app/globals.css';

const PoliticaDevolucaorPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Política de Devolução e Reembolso - Mãos Encantadas</title>
        <meta name="description" content="Politica de devolucao e reembolso do site Mãos Encantadas." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Política de Devolução e Reembolso - Mãos Encantadas</h1>

          <p className="mb-6">
            A Mãos Encantadas preza pela satisfação e confiança dos nossos clientes. Por isso, desenvolvemos esta política com base 
            nas diretrizes do Código de Defesa do Consumidor, visando transparência, respeito e compromisso com você. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>1. Aplicação desta Política </strong><br /> 
                1.1. A Mãos Encantadas é uma vitrine de produtos artesanais, e cada item é produzido por artistas parceiros independentes, 
                responsáveis pela criação, envio e atendimento de seus próprios produtos. <br />

                1.2. Cada artista pode ter sua própria política de troca e devolução. Essas informações estarão disponíveis na página do artista 
                ou produto. Caso o artista não tenha uma política específica, valerá esta política geral da Mãos Encantadas. <br />

                1.3. Em caso de qualquer problema com o pedido, o comprador deve primeiro entrar em contato com o artista responsável. <br />

                1.4. Caso não haja retorno ou resolução em até 48 horas, nossa equipe poderá intervir e aplicar esta política conforme necessário. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>2. Condições Gerais </strong><br />
                2.1. Para que trocas, devoluções ou reembolsos sejam aceitos, é necessário que: <br />

                2.2. O pedido tenha sido realizado por meio do site da Mãos Encantadas. <br />

                2.3. A tentativa de solução tenha ocorrido primeiramente com o artista. <br />

                2.4. O produto não tenha sido retirado ou entregue pessoalmente. <br />

                2.5. O item esteja sem sinais de uso, modificação ou dano. <br />

                2.6. Os prazos estabelecidos nesta política tenham sido respeitados.   <br /> <br />         
            </p>
          <p className="mb-6">
            <strong>3. Produtos que não se enquadram para devolução </strong><br />
                3.1. Alguns produtos estão excluídos desta política de devolução, exceto em caso de defeito ou não recebimento: <br />

                3.2. Produtos personalizados sob encomenda.<br />

                3.3. Itens de uso pessoal e íntimo (como roupas íntimas ou produtos de higiene). <br />

                3.4. Alimentos artesanais. <br />

                3.5. Plantas e flores naturais. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>4. Defeitos e Vícios </strong><br />
               Consideramos vício ou defeito qualquer problema de qualidade que torne o produto impróprio para o uso ou diferente do que foi anunciado. <br />
               Nestes casos, o comprador poderá solicitar a devolução ou reembolso. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>5. Trocas, Devoluções e Reembolso </strong><br />
                5.1. A troca de produtos deve ser negociada diretamente com o artista. Basta entrar em contato com ele pela área de mensagens do pedido. <br />

                5.2. Caso não haja solução, o cliente pode solicitar a mediação da Mãos Encantadas através do nosso atendimento. <br />

                5.3. O reembolso será possível nos seguintes casos: <br />

                    5.3.1. Produto não recebido no prazo;<br />

                    5.3.2. Arrependimento da compra dentro do prazo legal; <br />

                    5.3.3. Produto com defeito ou incompleto. <br />

                5.4. Para reembolso, o produto deve ser devolvido ao endereço do artista, conforme informado no pedido. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>6. Prazos para Solicitação </strong><br />
                6.1. Não recebimento do pedido: até 90 dias corridos após a confirmação de pagamento. <br />

                6.2. Arrependimento da compra: até 7 dias corridos após o recebimento. <br />

                6.3. Defeito em produtos não duráveis (ex: sabonetes, perfumes): até 30 dias após o recebimento. <br />

                6.4. Defeito em produtos duráveis (ex: móveis, tapetes): até 90 dias após o recebimento. <br />
          </p>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PoliticaDevolucaorPage;
