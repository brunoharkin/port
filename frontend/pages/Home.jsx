import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight, Zap, Brain, Sparkles, BarChart3, Target, Code, Wrench, FlaskConical, Rocket, TrendingUp, CheckCircle, CircleDot } from "lucide-react";
import UgaritLogo from "../assets/logos/UgaritLogo.svg";
import UgaritLogoImgPng from "../assets/images/Screenshot_2025-05-14_13.42.23-removebg-preview.png";
import HeroBg from "../assets/images/hero-bg.svg";
import LogoMarquee from "../components/LogoMarquee";
import TestimonialCarousel from "../components/TestimonialCarousel";
import TypewriterText from "../components/TypewriterText";

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 100]);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isVisible && count < 23) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [count, isVisible]);

  const processSteps = [
    {
      number: '01',
      icon: <Target className="w-7 h-7 text-teal-400" />,
      title: 'Imersão Estratégica',
      tagline: 'O Começo da Transformação',
      description: 'Entendemos sua alma antes de escrever uma linha de código.',
      checklist: [
        'Diagnóstico profundo do seu negócio, cultura e desafios',
        'Coleta de dados reais (conversas, documentos, histórico de atendimento)',
        'Definição do arquétipo e personalidade do agente'
      ]
    },
    {
      number: '02',
      icon: <FlaskConical className="w-7 h-7 text-rose-400" />,
      title: 'Co-Criação do MVP',
      tagline: 'A Hipótese Ganha Forma',
      description: 'Construímos um protótipo funcional com foco em impacto rápido.',
      checklist: [
        'Definição do escopo mínimo viável da automação ou agente',
        'Criação do fluxo inicial com foco na dor prioritária',
        'Validação do modelo com feedback rápido'
      ]
    },
    {
      number: '03',
      icon: <Wrench className="w-7 h-7 text-indigo-400" />,
      title: 'Implementação Técnica Inicial',
      tagline: 'A Máquina Começa a Rodar',
      description: 'Tecnologia com propósito, integração com estratégia.',
      checklist: [
        'Construção da estrutura técnica e lógica de operação',
        'Integração com CRMs, APIs, banco de dados e sistemas existentes',
        'Segurança, resiliência e padronização na arquitetura'
      ]
    },
    {
      number: '04',
      icon: <Code className="w-7 h-7 text-sky-400" />,
      title: 'Testes com Dados Reais',
      tagline: 'Do Laboratório para o Campo de Batalha',
      description: 'Validação real antes da escala.',
      checklist: [
        'Inserção de dados reais em ambiente de testes',
        'Ajuste fino da lógica e da comunicação do agente',
        'Correção de falhas e otimização da performance'
      ]
    },
    {
      number: '05',
      icon: <Rocket className="w-7 h-7 text-amber-400" />,
      title: 'Ativação em Produção',
      tagline: 'O Agente Entra em Cena',
      description: 'Chegou a hora de performar no mundo real.',
      checklist: [
        'Lançamento em ambiente produtivo com acompanhamento ativo',
        'Treinamento e handoff para times internos',
        'Monitoramento inicial de interações e resultados'
      ]
    },
    {
      number: '06',
      icon: <TrendingUp className="w-7 h-7 text-lime-400" />,
      title: 'Métricas & Evolução Contínua',
      tagline: 'Tudo que é Vivo, Evolui',
      description: 'Performance se mede, impacto se escala.',
      checklist: [
        'Monitoramento contínuo de KPIs e interações',
        'Relatórios com insights e plano de evolução',
        'Otimizações recorrentes com base em dados concretos'
      ]
    }
  ];

  return (
    <>
      <div className="min-h-screen" ref={scrollRef}>
        {/* Hero Section */}
        <section className="relative flex items-center justify-center bg-black pt-40 sm:min-h-screen sm:py-0">
          <div className="absolute inset-0">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src={HeroBg} alt="" className="w-full h-full object-cover opacity-30" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
            
            {/* Gradientes de fundo */}
            <div className="absolute top-0 right-0 w-1/3 h-64 bg-[#9442fe]/20 blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-64 bg-[#00f0ff]/20 blur-[120px]"></div>
          </div>

          {/* Badge - Moved for independent positioning */}
          <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 neon-animated-border">
                <span className="mr-2 flex items-center">
                  {/* Ícone Brain Lucide com cor de cérebro humano */}
                  <Brain className="w-5 h-5 text-[#FF6F91] drop-shadow-[0_0_6px_#FF6F91]" strokeWidth={2.2} />
                </span>
                <span className="text-sm text-white/90 whitespace-nowrap">Laboratório de Automação Inteligente</span>
              </div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center pt-16"
              style={{ opacity: opacity, y: heroY }}
            >
              {/* Título Principal */}
              <div className="mb-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                  <TypewriterText
                    text={"Automação Inteligente e Agentes Humanizados para Empresas Inovadoras"}
                    speed={45}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-center"
                  />
                </h1>
              </div>

              {/* Subtítulo */}
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Não somos uma agência de chatbots. Somos um laboratório que cria <span className="font-semibold text-[#6B8AFF]">agentes humanizados</span> que decidem com lógica, sentem com linguagem e aprendem com dados reais.
              </p>

              {/* Cards de Benefícios */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="rounded-2xl bg-white/10 border border-[#00f0ff]/30 p-4 md:p-6 text-center shadow-lg backdrop-blur-md">
                  <div className="flex justify-center mb-3">
                    <Brain className="w-8 h-8 text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff] animate-pulse" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Inteligência Real</h3>
                  <p className="text-gray-300 text-sm">Agentes que pensam e se adaptam</p>
                </div>
                <div className="rounded-2xl bg-white/10 border border-[#00f0ff]/30 p-4 md:p-6 text-center shadow-lg backdrop-blur-md">
                  <div className="flex justify-center mb-3">
                    <Sparkles className="w-8 h-8 text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff] animate-pulse" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Personalização Cognitiva</h3>
                  <p className="text-gray-300 text-sm">Únicos como sua empresa</p>
                </div>
                <div className="rounded-2xl bg-white/10 border border-[#00f0ff]/30 p-4 md:p-6 text-center shadow-lg backdrop-blur-md">
                  <div className="flex justify-center mb-3">
                    <Zap className="w-8 h-8 text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff] animate-pulse" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Performance Mensurável</h3>
                  <p className="text-gray-300 text-sm">Resultados que você pode ver</p>
                </div>
              </div>

              {/* Frase Destacada */}
              <div className="max-w-3xl mx-auto mb-10 flex items-center">
                <div className="w-1 h-16 bg-yellow-400 mr-4 rounded"></div>
                <p className="italic text-lg text-gray-200">
                  "Liberamos o tempo dos visionários impacientes. Como um laboratório de automação, nossa missão é desacelerar o tempo para você, permitindo que seu negócio salte uma década à frente."
                </p>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="animated-gradient-button px-8 py-4 text-black font-bold rounded-full flex items-center space-x-2 group transition-all duration-300"
                  onClick={() => window.gtmTrack('clique_diagnostico')}
                >
                  <span>Quero um diagnóstico gratuito</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black font-medium rounded-full flex items-center space-x-2 group hover:bg-opacity-90 transition-all duration-300"
                  onClick={() => window.gtmTrack('clique_saiba_mais')}
                >
                  <span>Saiba Mais</span>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Produtos & Serviços Section */}
        <section id="produtos-servicos" className="pb-24 bg-black relative overflow-hidden">
          {/* Glow de fundo */}
          <div className="absolute -left-32 -top-32 w-96 h-96 bg-[#00f0ff]/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#9442fe]/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex justify-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full border neon-border neon-pulse-btn">
                <span className="mr-2 flex items-center">
                  <BarChart3 className="w-5 h-5 text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff] animate-pulse" strokeWidth={2.2} />
                </span>
                <span className="text-sm text-white/90">Produtos e Serviços</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#00f0ff] via-[#6B8AFF] to-[#9442fe] text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
              Produtos e Serviços com Automação Real. Sem rótulos. Sem atalhos.
            </h2>
            <p className="text-base md:text-lg text-gray-200 text-center mb-4 max-w-2xl mx-auto font-medium">
              Do código aberto à entrega isolada: tudo seu — com performance, segurança, identidade e serviço dedicado.
            </p>

            {/* Cards dos Produtos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Card Synapse */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#00f0ff]/20 bg-transparent group transition-all duration-300 hover:shadow-[0_0_20px_#00f0ff55] hover:border-[#00f0ff] hover:scale-[1.015] flex flex-col h-full justify-between">
                <div className="flex items-center gap-3 px-4 sm:px-8 py-6 bg-transparent">
                  <span className="text-3xl">🔮</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#9442fe] bg-clip-text text-transparent drop-shadow-[0_0_8px_#00f0ff]">Ugarit Synapse</span>
                </div>
                {/* Para quem é */}
                <div className="flex items-start gap-2 px-4 sm:px-8 pb-2">
                  <span className="text-[#00f0ff] text-lg mt-1">📌</span>
                  <span className="text-sm text-[#00f0ff] font-semibold">Ideal para empresas que precisam de atendimento inteligente e personalizado</span>
                </div>
                <div className="flex-1 flex flex-col px-4 sm:px-8 py-6 justify-between">
                  <div>
                    <p className="text-gray-200 mb-6">CRM conversacional com IA que fala como sua marca e organiza o caos.</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-2"><span className="text-[#00f0ff] mt-1">✅</span><span className="text-gray-200">Centraliza WhatsApp, Instagram, E-mail e outros canais</span></div>
                      <div className="flex items-start gap-2"><span className="text-[#00f0ff] mt-1">✅</span><span className="text-gray-200">Utiliza linguagem treinada com o DNA da sua empresa</span></div>
                      <div className="flex items-start gap-2"><span className="text-[#00f0ff] mt-1">✅</span><span className="text-gray-200">Gera métricas acionáveis: tempo de resposta, engajamento, conversões por canal</span></div>
                      <div className="flex items-start gap-2"><span className="text-[#00f0ff] mt-1">✅</span><span className="text-gray-200">Visual sob medida, com domínio próprio e estrutura isolada</span></div>
                      <div className="flex items-start gap-2"><span className="text-[#00f0ff] mt-1">✅</span><span className="text-gray-200">Criptografia em múltiplas camadas: os dados do seu cliente ficam onde devem estar — sob controle</span></div>
                    </div>
                    <div className="bg-[#00f0ff]/5 rounded-xl p-4 border border-[#00f0ff]/20 mb-6 flex items-start gap-2">
                      <span className="text-2xl">🧩</span>
                      <div>
                        <span className="text-[#00f0ff] font-semibold">Impacto real:</span>
                        <span className="text-gray-200 block">Atenda melhor com menos esforço operacional.</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#6B8AFF] to-[#9442FE] text-white font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_#00F0FF60] hover:shadow-[0_0_40px_#00F0FF90] transition-all"
                      onClick={() => { window.gtmTrack('clique_synapse'); const el = document.getElementById('contato'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                      🔮 Quero ver como o Synapse funciona na prática
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Machina */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#FFB86C]/20 bg-transparent group transition-all duration-300 hover:shadow-[0_0_20px_#FFB86C55] hover:border-[#FFB86C] hover:scale-[1.015] flex flex-col h-full justify-between">
                <div className="flex items-center gap-3 px-4 sm:px-8 py-6 bg-transparent">
                  <span className="text-3xl">⚙️</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#FFB86C] to-[#FF6F91] bg-clip-text text-transparent drop-shadow-[0_0_8px_#FFB86C]">Ugarit Machina</span>
                </div>
                {/* Para quem é */}
                <div className="flex items-start gap-2 px-4 sm:px-8 pb-2">
                  <span className="text-[#FFB86C] text-lg mt-1">📌</span>
                  <span className="text-sm text-[#FFB86C] font-semibold">Ideal para empresas com processos recorrentes e integração entre sistemas</span>
                </div>
                <div className="flex-1 flex flex-col px-4 sm:px-8 py-6 justify-between">
                  <div>
                    <p className="text-gray-200 mb-6">Plataforma de automação que executa decisões com a lógica do seu negócio.</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-2"><span className="text-[#FFB86C] mt-1">✅</span><span className="text-gray-200">Criação de fluxos inteligentes sob medida (no-code ou código puro)</span></div>
                      <div className="flex items-start gap-2"><span className="text-[#FFB86C] mt-1">✅</span><span className="text-gray-200">Integração com APIs, CRMs, bancos de dados e sistemas internos</span></div>
                      <div className="flex items-start gap-2"><span className="text-[#FFB86C] mt-1">✅</span><span className="text-gray-200">Logs e rastreabilidade total por cliente</span></div>
                      <div className="flex items-start gap-2"><span className="text-[#FFB86C] mt-1">✅</span><span className="text-gray-200">Estrutura com isolamento por VPS + criptografia ponta a ponta</span></div>
                      <div className="flex items-start gap-2"><span className="text-[#FFB86C] mt-1">✅</span><span className="text-gray-200">Alertas, backups e fallback automático para garantir resiliência</span></div>
                    </div>
                    <div className="bg-[#FFB86C]/5 rounded-xl p-4 border border-[#FFB86C]/20 mb-6 flex items-start gap-2">
                      <span className="text-2xl">🧩</span>
                       <div>
                        <span className="text-[#FFB86C] font-semibold">Impacto real:</span>
                        <span className="text-gray-200 block">Menos dependência de tarefas manuais. Mais tempo e controle para o que importa.</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#FFB86C] to-[#FF6F91] text-white font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_#FFB86C60] hover:shadow-[0_0_40px_#FFB86C90] transition-all"
                      onClick={() => { window.gtmTrack('clique_machina'); const el = document.getElementById('contato'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                      ⚙️ Me envie um exemplo real do Machina
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção Por que Funciona */}
            <div className="bg-gradient-to-br from-[#00f0ff]/5 to-[#9442fe]/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-transparent bg-clip-text flex items-center justify-center gap-2">
                <span className="text-2xl">💡</span> Por que marcas exigentes escolhem a Ugarit?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <span className="font-bold text-white block mb-1">Transparência técnica</span>
                    <span className="text-sm text-gray-300">Open source auditável. Sem caixa-preta.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <span className="font-bold text-white block mb-1">Engenharia aplicada</span>
                    <span className="text-sm text-gray-300">Automação construída sob sua lógica.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-2xl">🔐</span>
                  <div>
                    <span className="font-bold text-white block mb-1">Segurança por design</span>
                    <span className="text-sm text-gray-300">Dados isolados, criptografados, controláveis.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <span className="font-bold text-white block mb-1">Alinhamento com quem decide</span>
                    <span className="text-sm text-gray-300">Atrai decisores técnicos que valorizam estrutura.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Diferenciais */}
            <div className="mt-8 bg-black/40 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-transparent bg-clip-text flex items-center justify-center gap-2">
                <span className="text-2xl">🧠</span> Você não compra acesso. Você recebe controle.
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <div className="flex flex-col items-center text-center p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-3xl mb-3">🌐</span>
                  <span className="font-bold text-white mb-2">Domínio próprio</span>
                  <span className="text-sm text-gray-300">Sua marca, sua identidade</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-3xl mb-3">🖥️</span>
                  <span className="font-bold text-white mb-2">Infra VPS dedicada</span>
                  <span className="text-sm text-gray-300">Performance e segurança garantidas</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-3xl mb-3">🎨</span>
                  <span className="font-bold text-white mb-2">Personalização total</span>
                  <span className="text-sm text-gray-300">Visual e funcional sob medida</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-3xl mb-3">🤖</span>
                  <span className="font-bold text-white mb-2">IA embarcada desde o início</span>
                  <span className="text-sm text-gray-300">Inteligência desde o primeiro dia</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-3xl mb-3">🔐</span>
                  <span className="font-bold text-white mb-2">Criptografia por Camada</span>
                  <span className="text-sm text-gray-300">Dados protegidos em múltiplas camadas</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-black/40 rounded-xl border subtle-neon-border transition-all duration-300 hover:scale-104">
                  <span className="text-3xl mb-3">🔁</span>
                  <span className="font-bold text-white mb-2">Fallback automático</span>
                  <span className="text-sm text-gray-300">Resiliência garantida em caso de falhas</span>
                </div>
              </div>
            </div>

            {/* Frase de Fechamento */}
            <div className="mt-8 flex justify-center">
              <span className="text-xl text-white text-center flex items-center gap-2">
                <span className="text-2xl">🎯</span> 
                Automação de verdade respeita seu processo, protege seus dados e fala como você.
              </span>
            </div>

            {/* CTA Final */}
            <div className="mt-8 flex justify-center">
              <button
                className="animated-gradient-button px-8 py-4 rounded-full text-white font-bold flex items-center justify-center gap-2 shadow-[0_0_10px_#00f0ff30] hover:shadow-[0_0_20px_#00f0ff50] hover:scale-[1.02] transition-all"
                onClick={() => window.gtmTrack('clique_agendar_diagnostico')}
              >
                🔍 Agendar diagnóstico da minha infraestrutura SaaS
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Nova Seção Nosso Processo de Transformação */}
        <section className="py-16 sm:py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full border neon-border neon-pulse-btn">
                  <span className="mr-2 flex items-center">
                    <Rocket className="w-5 h-5 text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff] animate-pulse" strokeWidth={2.2} />
                  </span>
                  <span className="text-sm text-white/90">Nossos Serviços</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00f0ff] via-[#6B8AFF] to-[#9442fe] text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">Nosso Processo de Transformação</h2>
              <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto">Seis etapas cuidadosamente planejadas para criar o agente perfeito para seu negócio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {processSteps.map((step) => (
                <div key={step.number} className="animated-gradient-background-subtle subtle-neon-border border rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-slate-800/60 border border-slate-700">
                      {step.icon}
                    </div>
                    <span className="text-5xl sm:text-6xl font-bold text-white/20 absolute top-4 right-8">{step.number}</span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <span className="inline-block bg-slate-800 text-slate-300 px-3 py-1 rounded-md text-sm mb-4 border border-slate-700">{step.tagline}</span>
                    <p className="text-sm sm:text-base text-gray-400 mb-6">{step.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {step.checklist.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                          <span className="text-sm sm:text-base text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="animated-gradient-button px-8 py-4 text-black font-bold rounded-full inline-flex items-center space-x-2 group transition-all duration-300"
                onClick={() => { 
                  window.gtmTrack('clique_iniciar_transformacao');
                  const el = document.getElementById('contato'); 
                  if (el) el.scrollIntoView({ behavior: 'smooth' }); 
                }}
              >
                <span>Inicie sua transformação agora</span>
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

          </div>
        </section>

        {/* O restante do arquivo continua a partir daqui, como a seção "Featured Agents" */}
        <div className="divider-animated-gradient my-2"></div>

        {/* Featured Agents Section */}
        <section className="py-24 bg-black relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center px-4 py-2 rounded-full border neon-border neon-pulse-btn"
                >
                  <span className="mr-2 flex items-center">
                    {/* Ícone neon */}
                    <svg className="w-5 h-5 text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff] animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </span>
                  <span className="text-sm text-white/90">Teste na Prática</span>
                </motion.div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
                <span className="text-[#6B8AFF]">Agentes Humanizados</span>{" "}
                <span className="text-white">em Ação</span>
              </h2>
              <p className="text-xl text-gray-300">
                Cada agente é único, desenhado com lógica de negócio e linguagem personalizada.<br/>
                Testes reais, sem bots genéricos — veja como a inteligência aplicada funciona no seu fluxo.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AgentCard
                title="🛒 Agente de Vendas para E-commerce – Atendimento que Vende Antes do Clique"
                description="Seu melhor vendedor. Ativo 24/7. Preciso, simpático e impossível de ignorar."
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                delay={0}
              />
              <AgentCard
                title="📆 Agente de Agendamentos para Consultoria – Sua Agenda, Inteligente e Autônoma"
                description="Você foca em entregar valor. Ele cuida do resto."
                image="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
                delay={0.2}
              />
              <AgentCard
                title="🩺 SDR para Clínicas – Atendimento Inteligente que Agenda e Converte"
                description="Consultas marcadas. Leads qualificados. Sem esforço."
                image="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                delay={0.4}
              />
            </div>
          </div>
        </section>
        <div className="divider-animated-gradient my-2"></div>

        {/* Case de Sucesso Section */}
        <section className="py-24 bg-black relative">
          <div className="container mx-auto px-6 relative">
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-black backdrop-blur-md border border-[#00F0FF]/30 shadow-[0_0_15px_rgba(0,240,255,0.2)] neon-pulse-btn">
                <svg className="w-4 h-4 mr-2 text-[#00F0FF] drop-shadow-[0_0_3px_rgba(0,240,255,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm text-white/90">Case de Sucesso</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
              <span className="text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">OakLab:</span>{" "}
              <span className="bg-gradient-to-r from-[#00F0FF] to-[#9442FE] text-transparent bg-clip-text">
                De 72% a 89% de qualificação
              </span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Lado Esquerdo - Informações */}
              <div className="bg-black backdrop-blur-xl rounded-2xl p-8 border border-[#00F0FF]/20 shadow-[0_0_25px_rgba(0,240,255,0.1)]">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00F0FF] to-[#9442FE] text-transparent bg-clip-text">O Desafio</h3>
                    <p className="text-gray-300">
                      A OakLab, startup de biotecnologia, chegou até nós com um problema crítico: 
                      <span className="text-[#00F0FF] font-semibold drop-shadow-[0_0_3px_rgba(0,240,255,0.5)]"> 72% dos leads se perdiam</span> antes do contato humano. 
                      O time de vendas estava sobrecarregado e a qualificação era inconsistente.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00F0FF] to-[#9442FE] text-transparent bg-clip-text">Nossa Solução</h3>
                    <p className="text-gray-300">
                      Criamos um agente inteligente conectado ao CRM e à base de dúvidas técnicas do produto. 
                      O agente qualifica leads automaticamente, responde questões técnicas e alimenta o time de 
                      vendas com insights reais.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00F0FF] to-[#9442FE] text-transparent bg-clip-text">O Resultado</h3>
                    <p className="text-gray-300">
                      Em apenas 3 semanas, a taxa de qualificação aumentou para <span className="text-[#00F0FF] font-semibold drop-shadow-[0_0_3px_rgba(0,240,255,0.5)]">89%</span>. 
                      O agente agora aprende sozinho com as objeções mais comuns e gera relatórios semanais com insights acionáveis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lado Direito - Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Taxa de Qualificação */}
                <div className="col-span-2 bg-black backdrop-blur-xl rounded-2xl p-8 border border-[#00F0FF]/20 shadow-[0_0_25px_rgba(0,240,255,0.1)]">
                  <style jsx>{`
                    @keyframes loadBar {
                      0% { width: 0%; }
                      100% { width: var(--target-width); }
                    }
                    @keyframes pulse {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0.7; }
                    }
                    .animate-load-bar {
                      animation: loadBar 1.5s ease-out forwards, pulse 2s ease-in-out infinite;
                    }
                  `}</style>

                  <h4 className="text-xl mb-6 bg-gradient-to-r from-[#00F0FF] to-[#9442FE] text-transparent bg-clip-text font-bold">Taxa de Qualificação</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Antes</span>
                        <span className="text-gray-400">72%</span>
                      </div>
                      <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
                        <div 
                          className="h-full bg-[#FF6B6B] rounded-full shadow-[0_0_10px_rgba(255,107,107,0.5)] animate-load-bar"
                          style={{"--target-width": "72%"}}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Depois</span>
                        <span className="text-[#00F0FF] drop-shadow-[0_0_3px_rgba(0,240,255,0.5)]">89%</span>
                      </div>
                      <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
                        <div 
                          className="h-full bg-gradient-to-r from-[#00F0FF] to-[#9442FE] rounded-full shadow-[0_0_15px_rgba(0,240,255,0.5)] animate-load-bar"
                          style={{"--target-width": "89%"}}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[#4ADE80] text-sm drop-shadow-[0_0_3px_rgba(74,222,128,0.5)]">+17%</span>
                    </div>
                  </div>
                </div>

                {/* Conversões */}
                <motion.div 
                  className="bg-black backdrop-blur-xl rounded-2xl p-6 border border-[#00F0FF]/20 shadow-[0_0_25px_rgba(0,240,255,0.1)] group hover:border-[#00F0FF]/40 transition-all duration-300"
                  onViewportEnter={() => setIsVisible(true)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <svg className="w-5 h-5 text-[#00F0FF] drop-shadow-[0_0_3px_rgba(0,240,255,0.6)] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-xl font-bold text-[#4ADE80] drop-shadow-[0_0_3px_rgba(74,222,128,0.5)]">+{count}%</span>
                  </div>
                  <h4 className="text-lg bg-gradient-to-r from-[#00F0FF] to-[#9442FE] text-transparent bg-clip-text font-bold">Conversões</h4>
                </motion.div>

                {/* Implementação */}
                <div className="bg-black backdrop-blur-xl rounded-2xl p-6 border border-[#9442FE]/20 shadow-[0_0_25px_rgba(148,66,254,0.1)] group hover:border-[#9442FE]/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <svg className="w-5 h-5 text-[#9442FE] drop-shadow-[0_0_3px_rgba(148,66,254,0.6)] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xl font-bold text-white">3 sem</span>
                  </div>
                  <h4 className="text-lg bg-gradient-to-r from-[#00F0FF] to-[#9442FE] text-transparent bg-clip-text font-bold">Implementação</h4>
                </div>

                {/* Disponibilidade */}
                <div className="bg-black backdrop-blur-xl rounded-2xl p-6 border border-[#00F0FF]/20 shadow-[0_0_25px_rgba(0,240,255,0.1)] group hover:border-[#00F0FF]/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <svg className="w-5 h-5 text-[#00F0FF] drop-shadow-[0_0_3px_rgba(0,240,255,0.6)] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-xl font-bold text-[#00F0FF] drop-shadow-[0_0_3px_rgba(0,240,255,0.5)]">24/7</span>
                  </div>
                  <h4 className="text-lg bg-gradient-to-r from-[#00F0FF] to-[#9442FE] text-transparent bg-clip-text font-bold">Disponibilidade</h4>
                </div>

                {/* Memória */}
                <div className="bg-black backdrop-blur-xl rounded-2xl p-6 border border-[#9442FE]/20 shadow-[0_0_25px_rgba(148,66,254,0.1)] group hover:border-[#9442FE]/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <svg className="w-5 h-5 text-[#9442FE] drop-shadow-[0_0_3px_rgba(148,66,254,0.6)] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="text-xl font-bold text-[#9442FE] drop-shadow-[0_0_3px_rgba(148,66,254,0.5)]">∞</span>
                  </div>
                  <h4 className="text-lg bg-gradient-to-r from-[#00F0FF] to-[#9442FE] text-transparent bg-clip-text font-bold">Memória</h4>
                </div>

                {/* Citação */}
                <div className="col-span-2 bg-black backdrop-blur-xl rounded-2xl p-8 border border-[#00F0FF]/20 shadow-[0_0_25px_rgba(0,240,255,0.1)]">
                  <blockquote className="text-center">
                    <p className="text-xl text-gray-300 italic mb-4">
                      "Foi como adicionar um vendedor técnico com memória infinita — sem custo fixo."
                    </p>
                    <footer className="text-sm">
                      <cite className="text-[#00F0FF] font-semibold block drop-shadow-[0_0_3px_rgba(0,240,255,0.5)]">CEO da OakLab</cite>
                      <span className="text-gray-400">Startup de Biotecnologia</span>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#9442FE]/5 blur-[100px] rounded-full animate-pulse"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00F0FF]/5 blur-[100px] rounded-full animate-pulse"></div>
          
          {/* Decorative gradient line at bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#9442FE] to-transparent opacity-50"></div>
        </section>
        <div className="divider-animated-gradient my-2"></div>

        {/* CTA Section */}
        <section className="py-24 bg-black relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-5xl mx-auto bg-gradient-to-r from-[#111111] to-[#1a1a1a] p-12 rounded-2xl border border-gray-800 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#9442fe]/20 blur-[100px] rounded-full"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#00f0ff]/20 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Pronto para decolar?
                  </h2>
                  <p className="text-xl text-gray-300">
                    Fale com a Ugarit e transforme seu negócio com automação de outro nível.
                  </p>
                </div>
                <Link to={createPageUrl("Contact")}>
                  <motion.a
                    href="https://wa.me/5511989354601?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Ugarit%20Digital!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-bold rounded-full whitespace-nowrap flex items-center space-x-2"
                    onClick={() => window.gtmTrack('clique_inovar_home')}
                  >
                    <span>Quero Inovar com a Ugarit</span>
                    <Zap className="w-5 h-5" />
                  </motion.a>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        <div className="divider-animated-gradient my-2"></div>
      </div>
    </>
  );
}

// Helper Components
const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden backdrop-blur-md border border-[#00f0ff]/20 p-8 transition-all duration-500 group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        borderColor: "rgba(0, 240, 255, 0.4)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Efeito de glow no background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-[#9442fe]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
      
      {/* Conteúdo */}
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00f0ff]/20 to-[#9442fe]/20 flex items-center justify-center mb-6 group-hover:from-[#00f0ff]/30 group-hover:to-[#9442fe]/30 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]">
          <IconComponent name={icon} className="w-6 h-6 text-[#00f0ff] drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]" />
        </div>
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,240,255,0.3)]">{title}</h3>
        <p className="text-gray-400 transition-all duration-300 group-hover:text-gray-300">{description}</p>
      </div>

      {/* Bordas com glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#9442fe]/50 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#00f0ff]/50 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#9442fe]/50 to-transparent"></div>
      </div>
    </motion.div>
  );
};

const AgentCard = ({ title, description, image, delay }) => {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden group border border-slate-800 bg-gradient-to-br from-slate-900 to-black"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ y: -5, borderColor: '#00f0ff' }}
    >
      <div className="relative h-48 overflow-hidden flex items-center justify-center bg-black/50">
        <div className="w-full px-4">
          <TypewriterText
            text={
              title.includes('E-commerce') ? 'function VenderProduto(produto) {\n  if (estoque) {\n    AdicionarAoCarrinho(produto);\n    FinalizarCompra();\n  } else {\n    NotificarIndisponibilidade();\n  }\n}' :
              title.includes('Consultoria') ? 'function AgendarConsultoria(lead) {\n  if (lead.qualificado) {\n    SugerirHorarios();\n    ConfirmarAgendamento();\n  } else {\n    SolicitarMaisInformacoes();\n  }\n}' :
              title.includes('Clínicas') ? 'function AgendarConsulta(paciente) {\n  if (dadosValidos) {\n    MarcarConsulta();\n    EnviarLembrete();\n  } else {\n    SolicitarDados();\n  }\n}' :
              '// Agente Inteligente'
            }
            speed={22}
            className="block text-xs sm:text-sm text-left font-mono text-[#00f0ff] whitespace-pre-line min-h-[6.5rem]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-6 text-sm">{description}</p>
        <Link to={createPageUrl("Portfolio")}> 
          <motion.button
            initial={{ scale: 0.96, boxShadow: '0 0 0px 0px #fff0' }}
            animate={{ scale: 1, boxShadow: '0 0 6px 1px #fff2' }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 12px 2px #fff4' }}
            whileTap={{ scale: 0.98, boxShadow: '0 0 8px 2px #fff5' }}
            className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center space-x-2 transition-all duration-300"
            onClick={() => window.gtmTrack('clique_ver_em_acao')}
          >
            <span className="font-bold">Testar Agora</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

const IconComponent = ({ name, className }) => {
  switch (name) {
    case 'star':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24">
          <motion.path
            d="M12 2l3.09 6.26L22 9.27l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      );
    case 'brain':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24">
          <motion.path
            d="M12 8c3.5 0 6 2.5 6 6s-2.5 6-6 6-6-2.5-6-6 2.5-6 6-6zm0 0V3m0 5c-1.5 0-3 .5-4 1.5M12 8c1.5 0 3 .5 4 1.5"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="14"
            r="2"
            stroke="currentColor"
            strokeWidth={1.5}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      );
    case 'shield':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24">
          <motion.path
            d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M12 9l2 2-2 2-2-2 2-2z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      );
    case 'code':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24">
          <motion.path
            d="M16 18l6-6-6-6M8 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      );
    case 'users':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24">
          <motion.path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="9"
            cy="7"
            r="4"
            stroke="currentColor"
            strokeWidth={1.5}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.path
            d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      );
    case 'award':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24">
          <motion.circle
            cx="12"
            cy="8"
            r="6"
            stroke="currentColor"
            strokeWidth={1.5}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M15.477 12.89L16.5 22l-4.5-3-4.5 3 1.023-9.11"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      );
      default:
        return null;
    }
  };