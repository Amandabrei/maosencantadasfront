'use client';

import Head from 'next/head';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../app/globals.css';

const TermoUsoPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Termo de Uso - Mãos Encantadas</title>
        <meta name="description" content="Termo de Uso do site Mãos Encantadas." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Termo de Uso - Mãos Encantadas</h1>

          <p className="mb-6">
            <strong>1. Capacidade</strong><br /> 
                Os serviços da plataforma só podem ser contratados por pessoas legalmente capazes, de acordo com o Código Civil. 
                Menores de 18 anos são incapazes para contratar. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>2. Cadastro </strong><br />
                O cadastro exige que o usuário forneça informações corretas e atualizadas. A omissão ou erro pode resultar em sanções.<br /> 

                A plataforma pode solicitar documentos para verificar o cadastro e a operação. Caso o usuário não apresente, o cadastro pode ser indeferido.<br /> 

                O cadastro é pessoal e intransferível, com senha de segurança mantida em confidencialidade.   <br /> <br />         
            </p>
          <p className="mb-6">
            <strong>3. Objeto</strong><br />
                "Maos Encantadas" conecta Artistas de produtos artesanais e personalizados com compradores. <br />
                
                A plataforma facilita a negociação, mas não é responsável pela produção, qualidade ou envio dos produtos ou recebimento dos mesmos.<br />

                Os produtos anunciados devem ser artesanais ou personalizados. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>4. Ferramentas para Artistas</strong><br />
               O Artista pode cadastrar até 5.000 produtos e personalizar sua loja com banners e links exclusivos.<br />

               A plataforma oferece facilidade para gerenciar pedidos e comunicação com clientes. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>5. Processamento de Pagamentos </strong><br />
                Em nosso site, não realizamos pagamentos diretamente. Todos os pagamentos devem ser feitos diretamente com o Artista, assim como as devoluções, 
                de acordo com a política estabelecida por cada um. <br /> <br />
          </p>
          <p className="mb-6">
            <strong>6. Comunicação Entre Usuários</strong><br />
                Negociação Exclusiva na Plataforma: Qualquer pedido realizado através do nosso site deve ser negociado e concluído direto com o Artista. 
                É permitido que o vendedor direcione o comprador para realizar negociações ou concluir compras fora do site.<br />

                A comunicação entre o Vendedor e o Comprador pode ser feita pelo chat da plataforma. Ou pelo whatsapp de ambos.<br />

                Respeito e Conduta: Toda comunicação deve ser respeitosa e não discriminatória. O site não tolera comunicação hostil, vulgar ou discriminatória. 
                Mensagens de ódio ou violência serão advertidas ou removidas. <br />

                Todos os dados devem ser tratados com respeito à privacidade de cada usuário.<br /><br />
          </p>
          <p className="mb-6">
            <strong>7. Regras da Plataforma</strong><br />
                Responsabilidade do Usuário: O usuário é responsável por todas as atividades realizadas com seu nome e deve garantir a segurança de suas credenciais.<br />

                Direitos Autorais: Os Artistas devem garantir que o conteúdo que publicam seja de sua autoria ou que possuam os direitos necessários sobre as imagens e textos.<br />

                Responsabilidade pela Transação: O Maos Encantadas não se responsabiliza por falhas nas transações realizadas entre Artistas e compradores, sendo estas de responsabilidade 
                exclusiva das partes envolvidas.<br />

                Proibição de Fraude e Irregularidades: O site reserva-se o direito de remover usuários que desrespeitem as regras ou sejam suspeitos de fraude.<br />
                
                O Maos Encantadas se compromete a oferecer uma plataforma segura para que compradores e vendedores realizem suas transações de maneira eficaz, respeitando as normas de comunicação e conduta.<br /><br />
          </p>
          <p className="mb-6">
            <strong>8. Obrigações do artista</strong><br />
                Cadastro e Anúncios: Incluir dados reais e atualizados, garantir qualidade e segurança dos produtos, e fazer anúncios precisos com informações claras sobre preços e descrições.<br />

                Entrega: Cumprir com os prazos de entrega e qualidade prometida.<br />

                Comunicação: Manter comunicação clara com os compradores e atualizações sobre o processo de venda.<br />

                Política de Frete e Pagamento: Informar corretamente sobre o peso e medidas dos produtos e utilizar os meios de pagamento e frete.<br />

                Licenciamento: Obter licenças necessárias para a venda de seus produtos.<br />

                Proibição de Produtos: Não vender produtos ilegais, regulamentados, perigosos, armas, medicamentos, tabaco, produtos eróticos, entre outros, como mencionado nas proibições detalhadas.<br /><br />
          </p>
          <p className="mb-6">
            <strong>9. Proibições para o Artista</strong><br />
                Desvio de Plataforma: Direcionar vendas fora da plataforma ou usar propagandas enganosas.<br />

                Venda Repetida: Não é permitido anunciar o mesmo produto em lojas diferentes ou mais de uma vez na mesma loja.<br />

                Violação de Direitos: Não usar marcas registradas ou produtos com conotação ofensiva.<br /><br />
          </p>
          <p className="mb-6">
            <strong>10. Obrigações do cliente</strong><br />
                Colaboração: Fornecer as informações necessárias para a conclusão da compra e manter comunicação com o Artista.<br />

                Entendimento das Políticas do Vendedor: Antes de comprar, verificar a política de troca, devolução e reembolso do Artista.<br /><br />
          </p>
          <p className="mb-6">
            <strong>11. Proibiçóes do cliente</strong><br />
                Comportamento: Não difamar ou agredir outros usuários e não enviar dados pessoais antes de concluir a compra.<br />

                Desrespeito à Legislação: Cumprir com as leis vigentes.<br />

                Essas são as principais obrigações e restrições para ambos os lados, com o intuito de manter a boa convivência e o bom funcionamento da plataforma.<br /><br />
          </p>
          <p className="mb-6">
            <strong>12. Encerramento, Suspensão e Cancelamento de Conta </strong><br />
                A conta de um usuário (Artista ou comprador) pode ser advertida, suspensa, bloqueada ou excluída pelo Maos Encantadas a qualquer momento, especialmente nos seguintes casos:<br />

                Violação das regras dos Termos de Uso ou outras políticas do site;<br />

                Não cumprimento de deveres como usuário;<br />

                Atos fraudulentos ou má-fé;<br />

                Informações falsas ou identidade não verificável;<br />

                Prejuízo ou risco de dano ao site ou a terceiros;<br />

                Solicitação do próprio usuário.<br /><br />
          </p>
          <p className="mb-6">
            <strong>13. Se a conta for suspensa ou bloqueada</strong><br />

                Os anúncios ativos serão automaticamente cancelados;<br />

                Poderá ser exibida uma mensagem pública informando que o usuário não faz mais parte da comunidade;<br />

                Para cancelar voluntariamente a conta, o Artista deve entrar em contato com a central de atendimento. <br />

                O cancelamento só será feito após a regularização de pendências como entregas, reembolsos ou faturas.<br /><br />
          </p>
          <p className="mb-6">
            <strong>14. Proibiçóes do cliente</strong><br />
                Comportamento: Não difamar ou agredir outros usuários e não enviar dados pessoais antes de concluir a compra.<br />

                Desrespeito à Legislação: Cumprir com as leis vigentes.<br />

                Essas são as principais obrigações e restrições para ambos os lados, com o intuito de manter a boa convivência e o bom funcionamento da plataforma.<br /><br />
          </p>
          
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermoUsoPage;
