import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, X, ChevronRight, ChevronLeft } from "lucide-react";
import ChatInterface from "../components/ChatInterface";
import TypewriterText from "../components/TypewriterText";

export default function Portfolio() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showChat, setShowChat] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'vendas', name: 'Vendas' },
    { id: 'agendamento', name: 'Agendamento' },
    { id: 'suporte-rh', name: 'Suporte RH' },
    { id: 'disparo', name: 'Disparo Automático' }
  ];

  // Array de agentes com webhookUrl, initialMessage e videoUrl individuais
  const agents = [
    {
      id: 1,
      title: "🛒 Agente de Vendas para E-commerce – Atendimento que Vende Antes do Clique",
      category: "vendas",
      description: "Seu melhor vendedor. Ativo 24/7. Preciso, simpático e impossível de ignorar.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      videoUrl: "https://drive.google.com/file/d/1y5RyIGbSS_nJ7wkSA6bodgJKSdqLWWdX/view?usp=sharing",
      longDescription: `Este agente é treinado para conversar com seus clientes em tempo real, tirar dúvidas, mostrar produtos, consultar valores e formas de pagamento, tudo com naturalidade.\n\nEle consulta estoque, ajuda o cliente a escolher o que precisa e já encaminha direto pro carrinho, ou finaliza com o link de pagamento.\n\nMenos carrinhos abandonados. Mais fechamento. Um atendimento com cérebro — e alma.`,
      features: [
        "Atendimento via WhatsApp, site ou embed personalizado",
        "Consulta de produtos por nome, categoria ou necessidade",
        "Apresentação de valores, descrições e variações (cor, tamanho, modelo)",
        "Checagem de estoque em tempo real",
        "Orientação sobre formas de entrega e pagamento",
        "Link direto para checkout",
        "Integração com sistemas de estoque e CRM"
      ],
      workflow: [
        "Saudação e identificação do que o cliente procura",
        "Busca personalizada no catálogo de produtos",
        "Apresentação dos itens (imagem, nome, valor, descrição)",
        "Confirmação de disponibilidade em estoque",
        "Explicação sobre entrega e meios de pagamento",
        "Geração de link de compra ou finalização por API",
        "Registro da interação no CRM ou painel personalizado"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/atendimento",
      initialMessage: "Olá! Sou o agente de vendas do seu e-commerce. O que você procura hoje?",
      ctaFooter: "Quer ver um produto em ação? Fale com ele.\nConverse com o agente e-commerce agora e veja como ele vende por você."
    },
    {
      id: 2,
      title: "📆 Agente de Agendamentos para Consultoria – Sua Agenda, Inteligente e Autônoma",
      category: "agendamento",
      description: "Você foca em entregar valor. Ele cuida do resto.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      videoUrl: "https://drive.google.com/file/d/16EZyFQvu0zbU3syslm_WCEy68veIJIG6/view?usp=sharing",
      longDescription: `Esse agente atua como seu assistente pessoal de alto nível. Ele entende o interesse do lead, faz a triagem inicial, apresenta horários disponíveis e já agenda no seu calendário.\n\nEle valida o perfil do interessado, garante que a reunião tenha propósito e ainda envia lembretes automáticos por WhatsApp. Tudo com linguagem consultiva, sem parecer robótico — e com a sofisticação que o seu serviço merece.\n\nPorque um lead bem atendido não vira só reunião. Vira contrato.`,
      features: [
        "Captação de interesse e objetivo da consultoria",
        "Validação de perfil e momento do lead",
        "Sugestão de horários disponíveis com base no Google Calendar",
        "Agendamento automático com envio de confirmação",
        "Lembrete inteligente 30 min antes da reunião",
        "Integração com CRM ou painel interno"
      ],
      workflow: [
        "Saudação + captação do nome e objetivo da consultoria",
        "Identificação do nível de urgência e perfil do lead",
        "Apresentação de horários disponíveis",
        "Agendamento direto no seu Google Calendar",
        "Envio de confirmação automática no WhatsApp",
        "Lembrete automático com link de reunião",
        "Registro da interação no CRM"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/atendimento",
      initialMessage: "Olá! Sou o agente de agendamentos da sua consultoria. Como posso ajudar?",
      ctaFooter: "Veja como ele organiza a agenda por você."
    },
    {
      id: 3,
      title: "🩺 SDR para Clínicas – Atendimento Inteligente que Agenda e Converte",
      category: "agendamento",
      description: "Consultas marcadas. Leads qualificados. Sem esforço.",
      image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      videoUrl: "https://drive.google.com/file/d/1pOjosSnhNkw3lgHtGJJfz5vEmJHnV4fA/view?usp=sharing",
      longDescription: `Esse agente entra em cena como o primeiro ponto de contato da sua clínica — e já chega preparado.\n\nEle conversa com o paciente, entende o que ele procura, quebra objeções com empatia, valida dados importantes e agenda a consulta automaticamente, respeitando as regras da sua agenda e do seu negócio.\n\nSe o paciente precisar remarcar, ele resolve também. E no dia da consulta? Ele manda o lembrete 30 minutos antes.\n\nMenos ausências. Mais conversões. Um atendimento que realmente cuida.`,
      features: [
        "Atendimento humanizado e ativo pelo WhatsApp",
        "Captação de nome, sintomas e plano de saúde",
        "Gatilhos de confiança para quebrar objeções (preço, distância, tempo)",
        "Agendamento e remarcação automática de consultas",
        "Integração com Google Calendar ou seu sistema de agenda",
        "Lembrete automático antes da consulta",
        "Registro dos dados do paciente no seu CRM"
      ],
      workflow: [
        "Qualificação inicial do paciente",
        "Verificação do tipo de atendimento ou especialidade desejada",
        "Coleta de dados essenciais",
        "Quebra de objeções com linguagem empática",
        "Agendamento direto na agenda da clínica",
        "Envio automático de lembrete 30 min antes",
        "Opção de reagendamento"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/sdr",
      initialMessage: "Olá! Sou o SDR da sua clínica. Vamos agendar sua consulta?",
      ctaText: "Testar este Agente Agora +",
      ctaFooter: "Receba um atendimento de verdade. Teste o agente SDR para clínicas — como se fosse um novo paciente da sua."
    },
    {
      id: 4,
      title: "🏡 Agente SDR Imobiliária — Inteligência que entende, sugere e negocia.",
      category: "vendas",
      description: "Não é só atendimento. É curadoria, viabilidade e proposta na mesa.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      videoUrl: "https://drive.google.com/file/d/1Rh_CCE_bUOsU4vln3ShrRVhCj_g8_pMk/view?usp=sharing",
      longDescription: `Este agente não mostra imóveis aleatórios. Ele começa ouvindo.\nEntende o tipo de imóvel que o cliente busca, analisa o orçamento, cruza dados com renda, localização e estrutura — e só então apresenta imóveis que fazem sentido.\n\nAlém disso, ele aceita trocas. Analisa o bem que o cliente oferece, compara com a proposta e, se for o caso, responde com uma contraoferta viável.\n\nÉ atendimento de alto nível. Automatizado, mas humano.\n\n🧭 O que ele pergunta:\nVocê está buscando comprar, alugar ou trocar?\n\nQual o tipo de imóvel? (casa, apartamento, terreno)\n\nQual região ou bairro deseja?\n\nQual sua renda mensal ou orçamento máximo?\n\nO imóvel é para morar, investir ou alugar?\n\nO que é indispensável para você? (vagas, suítes, área gourmet, etc.)\n\nPossui algum imóvel que pretende usar como parte da negociação?\n    • Tipo, valor estimado, localização\n\n🔍 O que ele faz com isso:\nFiltra imóveis compatíveis com preferências e capacidade de pagamento\n\nApresenta de forma estratégica: imagem, preço, descrição e diferencial\n\nCompara alternativas (ex: "essa tem área menor, mas é em localização premium")\n\nAnalisa propostas de troca com base em liquidez, valor e viabilidade\n\nRetorna com uma resposta assertiva e embasada: aceita, contrapropõe ou sugere melhor opção\n\nSe o cliente quiser, já agenda a visita ou uma ligação com o corretor humano\n\n🧠 Funcionalidades demonstradas:\nAtendimento consultivo, com refinamento progressivo\n\nInteligência de viabilidade (renda x valor x modalidade)\n\nAvaliação simulada de imóveis em troca\n\nArgumentação inteligente para vender ou contornar objeções\n\nIntegração com CRM e sistema de imóveis\n\nRegistro completo do lead com preferências e intenção\n\n💬 Estilo de resposta do agente:\n"Com base no que você procura, encontrei dois imóveis que valem sua atenção. Um deles aceita sua casa na troca — e pode fechar sem entrada."\n\n"O apartamento que você gostou está dentro do seu orçamento. Posso agendar uma visita ou te apresentar uma proposta com desconto à vista."`,
      features: [
        "Atendimento consultivo, com refinamento progressivo",
        "Inteligência de viabilidade (renda x valor x modalidade)",
        "Avaliação simulada de imóveis em troca",
        "Argumentação inteligente para vender ou contornar objeções",
        "Integração com CRM e sistema de imóveis",
        "Registro completo do lead com preferências e intenção"
      ],
      workflow: [
        "Captação do perfil e objetivo do cliente",
        "Análise de orçamento, renda e preferências",
        "Filtragem e apresentação de imóveis compatíveis",
        "Simulação de propostas de troca",
        "Contraoferta ou sugestão personalizada",
        "Agendamento de visita ou contato com corretor"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/imoveis",
      initialMessage: "Olá! Sou o agente imobiliário inteligente. Vamos encontrar o imóvel ideal para você?",
      ctaFooter: "Simule sua busca, teste propostas e veja como o agente imobiliário pode negociar por você."
    },
    {
      id: 5,
      title: "👥 Agente de Suporte para RH — Responde. Libera. Organiza.",
      category: "suporte-rh",
      description: "Seu RH não foi feito pra repetir as mesmas respostas todos os dias.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      videoUrl: "https://drive.google.com/file/d/1SkgotaB5zkZ6DuVYs8t8grlT_cEdCAtE/view?usp=sharing",
      longDescription: `Este agente assume as perguntas chatas, operacionais e frequentes que tiram o foco do setor de Recursos Humanos.\n\nEle atende colaboradores novos e veteranos com respostas personalizadas, linguagem empática e instruções diretas. De folha de pagamento a política de férias — ele resolve. Rápido.\n\nResultado? Menos interrupções. Mais gestão. E um RH que respira.\n\n💼 Exemplo de perguntas que ele responde:\n"Como solicito minhas férias?"\n\n"Quando recebo o vale-alimentação?"\n\n"Preciso de um comprovante de rendimento."\n\n"Qual o canal para falar com o DP?"\n\n"Onde está meu holerite do mês passado?"\n\n"Acabei de entrar, como pego meu crachá?"`,
      features: [
        "Atendimento 24/7 com linguagem humanizada",
        "Consulta por palavra-chave (férias, folha, benefícios, onboarding, etc.)",
        "Respostas por passo a passo ou links personalizados",
        "Redirecionamento para o time de RH só quando necessário",
        "Registro de interação para controle interno"
      ],
      workflow: [
        "O colaborador envia uma dúvida comum",
        "O agente detecta o tema e responde com clareza",
        "Caso necessário, ele pergunta se precisa escalar para atendimento humano",
        "Gera um ticket ou registra a solicitação (simulado)"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/conteudo",
      initialMessage: "Olá! Sou o agente de suporte do RH. Qual sua dúvida?",
      ctaFooter: "Deixe seu time focar em gestão.\nA gente cuida das perguntas repetidas."
    },
    {
      id: 6,
      title: "📡 Agente de Disparo Automático — Comunicação em Massa. Sem Limite. Sem Risco.",
      category: "disparo",
      description: "Você tem uma mensagem. A gente tem o sistema pra ela chegar.",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://drive.google.com/file/d/1rCLHUmyEsnROsesqvGpOpYtnOHTgHzDP/view?usp=sharing",
      longDescription: `Esse agente dispara mensagens em grande volume usando múltiplos números rotacionados estrategicamente — reduzindo risco de bloqueio e garantindo alcance real.\n\nPerfeito para lançadores, agências, e empresas que precisam ativar base com campanhas, boletins, agendamentos ou notificações recorrentes.\n\nPorque ter alcance hoje é mais do que postar. É entregar.\n\n🎯 O que ele faz (de verdade):\nUsa uma fila de números verificados (WhatsApp Business API ou Baileys)\n\nAlterna os envios de forma programada (com delay e cadência por número)\n\nGarante alta taxa de entrega com distribuição inteligente\n\nDetecta automaticamente números bloqueados ou inativos\n\nPermite segmentar por tags, grupos ou filtros personalizados\n\nGera relatórios de entrega, clique e resposta\n\n🧠 Exemplos de uso real:\nEnviar convite de campanha para 10 mil leads — sem travar\n\nDisparar mensagens personalizadas para clientes antigos com link de reativação\n\nLembrar agendamentos com 1 dia de antecedência em massa\n\nEnviar links de catálogo, pagamento ou vídeos por nome, cidade, etc.\n\n🚀 Diferenciais Ugarit:\nInfra com camada de contingência por chip e sessão\n\nControle de rota, hora e carga de cada linha\n\nMonitoramento em tempo real e logs por disparo\n\nTotalmente customizável via painel ou API\n\nCriação de mensagens com contexto, nome e variável personalizada`,
      features: [
        "Fila de números verificados (WhatsApp Business API ou Baileys)",
        "Envio alternado e programado por número",
        "Distribuição inteligente para alta taxa de entrega",
        "Detecção automática de bloqueios/inativos",
        "Segmentação por tags, grupos ou filtros",
        "Relatórios de entrega, clique e resposta",
        "Painel e API customizáveis",
        "Mensagens com variáveis e contexto"
      ],
      workflow: [
        "Importação/segmentação da base de contatos",
        "Configuração de mensagem e variáveis",
        "Disparo automático com rotação de números",
        "Monitoramento em tempo real",
        "Geração de relatórios e logs"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/agenda",
      initialMessage: "Olá! Sou o agente de disparo automático. Qual campanha você quer enviar hoje?",
      ctaFooter: "Pronto para escalar sua comunicação? Fale com a Ugarit."
    }
  ];

  const filteredAgents = filter === "all" 
    ? agents 
    : agents.filter(agent => agent.category === filter);

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    setSelectedAgent(null);
    setShowChat(false);
  };

  const handleOpenChat = () => {
    setShowChat(true);
  };

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Agent Detail Modal */}
        <AnimatePresence>
          {selectedAgent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-start pt-10 pb-20 px-4"
              onClick={handleClose}
              style={{ cursor: 'pointer' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl shadow-xl max-w-5xl w-full overflow-hidden"
                style={{ maxHeight: '90vh', overflowY: 'auto', cursor: 'auto' }}
                onClick={e => e.stopPropagation()}
              >
                {/* Show chat when showChat is true */}
                {showChat ? (
                  <div className="h-[80vh]">
                    <ChatInterface 
                      agentName={selectedAgent.title}
                      agentAvatar={selectedAgent.image} // Still using image for avatar in chat
                      onClose={() => setShowChat(false)}
                      webhookUrl={selectedAgent.webhookUrl}
                      initialMessage={selectedAgent.initialMessage}
                    />
                  </div>
                ) : (
                  <>
                    {/* Replaced img with video */}
                    <div className="relative h-64 sm:h-96 bg-black flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
                      <div className="relative z-10 w-full px-8">
                        <TypewriterText
                          text={
                            selectedAgent.id === 1 ? 'function VenderProduto(produto) {\n  if (estoque) {\n    AdicionarAoCarrinho(produto);\n    FinalizarCompra();\n  } else {\n    NotificarIndisponibilidade();\n  }\n}' :
                            selectedAgent.id === 2 ? 'function AgendarConsultoria(lead) {\n  if (lead.qualificado) {\n    SugerirHorarios();\n    ConfirmarAgendamento();\n  } else {\n    SolicitarMaisInformacoes();\n  }\n}' :
                            selectedAgent.id === 3 ? 'function AgendarConsulta(paciente) {\n  if (dadosValidos) {\n    MarcarConsulta();\n    EnviarLembrete();\n  } else {\n    SolicitarDados();\n  }\n}' :
                            selectedAgent.id === 4 ? 'function SugerirImovel(cliente) {\n  if (perfilAprovado) {\n    ApresentarImoveis();\n    NegociarProposta();\n  } else {\n    SolicitarPreferencias();\n  }\n}' :
                            selectedAgent.id === 5 ? 'function ResponderRH(duvida) {\n  if (duvida.comum) {\n    ResponderAutomatico();\n  } else {\n    EncaminharRH();\n  }\n}' :
                            selectedAgent.id === 6 ? 'function DispararMensagem(mensagem) {\n  while (base.length) {\n    EnviarComRotacao();\n    GerarRelatorio();\n  }\n}' :
                            '// Agente Inteligente'
                          }
                          speed={22}
                          className="block text-xs sm:text-sm md:text-base text-left font-mono text-[#00f0ff] whitespace-pre-line min-h-[6.5rem]"
                        />
                      </div>
                      <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-20"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </div>

                    <div className="p-8">
                      <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                          <h2 className="text-3xl font-bold">{selectedAgent.title}</h2>
                          <div className="mt-2">
                            <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300">
                              {categories.find(c => c.id === selectedAgent.category)?.name}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl font-semibold mb-4 gradient-text">Sobre o Agente</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">{selectedAgent.longDescription}</p>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold mb-4 gradient-text">Funcionalidades</h3>
                            <ul className="space-y-2">
                              {selectedAgent.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="w-5 h-5 mr-3 mt-1 flex-shrink-0">
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00f0ff] to-[#9442fe]"></div>
                                  </div>
                                  <span className="text-gray-300 text-lg">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold mb-4 gradient-text">Fluxo de Trabalho</h3>
                            <div className="relative pl-8">
                              {selectedAgent.workflow.map((step, index) => (
                                <div key={index} className="relative pb-8">
                                  {index !== selectedAgent.workflow.length - 1 && (
                                    <span className="absolute top-5 left-[11px] -ml-px h-full w-0.5 bg-gradient-to-b from-[#00f0ff] to-[#9442fe]" aria-hidden="true"></span>
                                  )}
                                  <div className="relative flex items-start space-x-3">
                                    <div className="relative">
                                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#9442fe] flex items-center justify-center ring-4 ring-gray-900">
                                        <span className="text-black font-bold">{index + 1}</span>
                                      </div>
                                    </div>
                                    <div className="min-w-0 flex-1 py-1.5">
                                      <div className="text-lg text-gray-300">
                                        {step}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Botões minimalistas e modernos com gradiente animado para todos os agentes */}
                          <div className="pt-8 text-center flex flex-col items-center gap-4">
                            {selectedAgent.id === 6 ? (
                              <button
                                onClick={() => alert('Em breve!')}
                                className="animated-gradient-btn w-80 py-3 rounded-full font-bold text-lg text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00f0ff]/50 transition-all duration-300"
                              >
                                Agendar minha Reunião
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => { handleOpenChat(); window.gtmTrack('clique_solicitar_agente', { agente: selectedAgent?.title }); }}
                                  className="animated-gradient-btn w-64 py-3 rounded-full font-bold text-lg text-white shadow-lg mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00f0ff]/50 transition-all duration-300"
                                >
                                  Testar Agora
                                </button>
                                <button
                                  onClick={() => alert('Em breve!')}
                                  className="animated-gradient-btn w-80 py-3 rounded-full font-bold text-lg text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00f0ff]/50 transition-all duration-300"
                                >
                                  Agendar minha Reunião
                                </button>
                              </>
                            )}
                            <div className="mt-6 text-center text-gray-300 text-base font-medium max-w-md">
                              {selectedAgent.ctaFooter?.split('\n').map((line, idx) => (
                                <span key={idx}>{line}<br/></span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - Portfolio Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center mb-4 gradient-text">
            Portfólio de Agentes de Automação e IA
          </h1>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Explore nossos agentes especializados, prontos para automatizar e otimizar diversas áreas do seu negócio.
          </p>

          {/* Category Filters */}
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => { setFilter(category.id); window.gtmTrack('clique_filtro_categoria', { categoria: category.name }); }}
                className={`px-4 py-2 mb-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === category.id
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Agent Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredAgents.map((agent) => (
                <motion.div
                  key={agent.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 flex flex-col h-full group cursor-pointer"
                  onClick={() => { handleAgentClick(agent); window.gtmTrack('clique_ver_detalhes', { agente: agent.title }); }}
                >
                  <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
                    <div className="w-full px-4">
                      <TypewriterText
                        text={
                          agent.id === 1 ? 'function VenderProduto(produto) {\n  if (estoque) {\n    AdicionarAoCarrinho(produto);\n    FinalizarCompra();\n  } else {\n    NotificarIndisponibilidade();\n  }\n}' :
                          agent.id === 2 ? 'function AgendarConsultoria(lead) {\n  if (lead.qualificado) {\n    SugerirHorarios();\n    ConfirmarAgendamento();\n  } else {\n    SolicitarMaisInformacoes();\n  }\n}' :
                          agent.id === 3 ? 'function AgendarConsulta(paciente) {\n  if (dadosValidos) {\n    MarcarConsulta();\n    EnviarLembrete();\n  } else {\n    SolicitarDados();\n  }\n}' :
                          agent.id === 4 ? 'function SugerirImovel(cliente) {\n  if (perfilAprovado) {\n    ApresentarImoveis();\n    NegociarProposta();\n  } else {\n    SolicitarPreferencias();\n  }\n}' :
                          agent.id === 5 ? 'function ResponderRH(duvida) {\n  if (duvida.comum) {\n    ResponderAutomatico();\n  } else {\n    EncaminharRH();\n  }\n}' :
                          agent.id === 6 ? 'function DispararMensagem(mensagem) {\n  while (base.length) {\n    EnviarComRotacao();\n    GerarRelatorio();\n  }\n}' :
                          '// Agente Inteligente'
                        }
                        speed={22}
                        className="block text-xs sm:text-sm md:text-base text-left font-mono text-[#00f0ff] whitespace-pre-line min-h-[6.5rem]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <span className="absolute top-4 left-4 px-2 py-0.5 text-xs rounded-full bg-gray-800/70 text-gray-300">
                      {categories.find(c => c.id === agent.category)?.name}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{agent.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">{agent.description}</p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center text-sm font-medium text-[#00f0ff] group-hover:text-[#9442fe] transition-colors">
                        Ver Detalhes
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}

