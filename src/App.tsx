import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Instagram,
  ArrowRight,
  ShieldCheck,
  Activity,
  Dna,
  Microscope,
  Scale,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Menu,
  X,
  HeartPulse,
  Award,
  Stethoscope,
  Check,
  UserCheck
} from 'lucide-react';

const WHATSAPP_NUMBER = '5586994056024';
const WHATSAPP_DISPLAY = '(86) 99405-6024';
const INSTAGRAM_HANDLE = '@leoaciolinutri';
const INSTAGRAM_URL = 'https://www.instagram.com/leoaciolinutri';

const DEFAULT_WA_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
  'Olá, Dr. Leonardo Acioli! Gostaria de mais informações e agendar uma consulta nutricional.'
)}`;

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number>(0);

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const specialties = [
    {
      title: 'Síndrome do Intestino Irritável (SII)',
      tag: 'Gastroenterologia Funcional',
      summary: 'Alívio real para quem convive com dor, inchaço e alterações no hábito intestinal.',
      description:
        'A SII não é apenas "nervosismo". Envolve hipersensibilidade visceral, alteração no eixo intestino-cérebro e fermentação desordenada. Aplicamos protocolos graduados (Low-FODMAP estratégico, modulação de neurotransmissores entéricos e reintrodução guiada) para recuperar o conforto alimentar sem restrições eternas.',
      points: [
        'Investigação dos gatilhos fermentativos individuais',
        'Protocolo de desinflamação da mucosa intestinal',
        'Redução imediata da dor abdominal e distensão',
      ],
    },
    {
      title: 'Disbiose & Reprogramação da Microbiota',
      tag: 'Microbiologia Clínica',
      summary: 'Reequilíbrio profundo da flora bacteriana para cessar a permeabilidade intestinal.',
      description:
        'O desequilíbrio entre bactérias protetoras e patogênicas rompe as junções oclusivas (tight junctions), permitindo a passagem de toxinas para a corrente sanguínea (leaky gut). Através de prebióticos específicos, fitoterápicos moduladores e suporte à barreira mucosa, restauramos a integridade digestiva.',
      points: [
        'Análise aprofundada de microbioma fecal quando indicada',
        'Fitoterapia moduladora de agentes patogênicos',
        'Restauração das junções celulares intestinais',
      ],
    },
    {
      title: 'SIFO & Candidíase de Repetição',
      tag: 'Imunologia Mucosal',
      summary: 'Tratamento integrativo para erradicar a proliferação fúngica no intestino e mucosas.',
      description:
        'O supercrescimento fúngico no intestino delgado (SIFO) e a candidíase recorrente frequentemente resistem a antifúngicos convencionais porque a causa raiz no trato digestivo não foi tratada. Atuamos com antifúngicos naturais de precisão, controle de carboidratos refinados e reconstrução da imunidade secretora.',
      points: [
        'Fim do ciclo vicioso de antifúngicos tópicos temporários',
        'Dieta antifúngica personalizada sem perda de massa magra',
        'Fortalecimento da IgA secretora da mucosa',
      ],
    },
    {
      title: 'Intolerâncias & Alergias Alimentares',
      tag: 'Nutrição de Precisão',
      summary: 'Identificação cirúrgica de sensibilidades a glúten, lactose, histamina e aditivos.',
      description:
        'Muitos pacientes eliminam dezenas de alimentos por conta própria sem resolver o problema. Nossa abordagem identifica a causa da intolerância (que na maioria das vezes é consequência de um intestino inflamado e não a causa primária), tratando a permeabilidade para que você volte a comer com liberdade.',
      points: [
        'Diferenciação clara entre alergia, intolerância e sensibilidade',
        'Protocolo de reabilitação enzimática digestiva',
        'Reintrodução metódica e sustentável dos alimentos',
      ],
    },
    {
      title: 'Emagrecimento Funcional',
      tag: 'Metabolômica & Inflamação',
      summary: 'Queima de gordura real a partir de um metabolismo desinflamado e eficiente.',
      description:
        'O emagrecimento duradouro só acontece quando o intestino está saudável. Bactérias intestinais desreguladas extraem calorias em excesso e enviam sinais inflamatórios que travam a queima de gordura. Alinhamos sua microbiota, sensibilidade à insulina e perfil hormonal para perda de peso consistente.',
      points: [
        'Zero efeito sanfona com regulação de hormônios da saciedade',
        'Controle da inflamação celular de baixo grau',
        'Preservação da massa muscular durante o déficit calórico',
      ],
    },
    {
      title: 'Hipertrofia & Nutrição Esportiva',
      tag: 'Antropometria ISAK',
      summary: 'Absorção máxima de aminoácidos e nutrientes para ganho de massa magra e vigor.',
      description:
        'Não basta comer proteínas; seu intestino precisa ser capaz de digeri-las e absorvê-las sem gerar fermentação tóxica. Com certificação internacional ISAK para medição precisa de composição corporal, estruturamos planos que potencializam sua força, hipertrofia e recuperação muscular.',
      points: [
        'Avaliação antropométrica no padrão internacional ISAK',
        'Otimização da síntese proteica muscular e absorção entérica',
        'Periodização nutricional alinhada à sua rotina de treinos',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Como funciona a consulta online? Tem a mesma eficácia da presencial?',
      answer:
        'Sim, tem exatamente o mesmo rigor clínico e taxa de sucesso! A teleconsulta é realizada por videochamada individual de alta definição. Antes da sessão você preenche um prontuário detalhado; durante a consulta, analisamos minuciosamente seu histórico, exames laboratoriais anteriores e queixas digestivas. Você recebe seu plano alimentar personalizado pelo aplicativo exclusivo, solicitações de exames de precisão quando necessários e suporte contínuo via WhatsApp.',
    },
    {
      question: 'Eu vou precisar cortar tudo o que gosto de comer para curar meu intestino?',
      answer:
        'Não! Essa é uma das maiores falhas de dietas genéricas encontradas na internet. Nosso objetivo não é impor restrições permanentes que gerem ansiedade, mas sim desinflamar o intestino temporariamente e identificar com precisão a causa raiz. Tratada a integridade da barreira intestinal, a grande maioria dos alimentos é reintroduzida com segurança e bem-estar.',
    },
    {
      question: 'Quais são os exames de precisão que podem ser solicitados?',
      answer:
        'Dependendo da sua história clínica, podemos solicitar ou orientar testes genéticos nutricionais (nutrigenética), mapeamento metagenômico da microbiota intestinal (sequenciamento de fezes), testes de intolerâncias alimentares e painéis metabólicos e inflamatórios detalhados. Se você já possui exames recentes, traga-os ou anexe-os na consulta para análise completa.',
    },
    {
      question: 'Em quanto tempo é possível notar melhora nos sintomas de inchaço e dor?',
      answer:
        'A grande maioria dos pacientes relata alívio substancial na distensão abdominal, queimação e frequência evacuatória logo nas primeiras duas a três semanas de implementação do protocolo individualizado. A consolidação da barreira intestinal e da microbiota segue um cronograma progressivo ao longo das semanas seguintes.',
    },
    {
      question: 'Onde fica o consultório presencial em Teresina e como funciona o acesso?',
      answer:
        'Nosso consultório fica na Avenida Marechal Castelo Branco, 911 - Porenquanto, Teresina - PI (CEP 64003-087), sediado no Shopping Rio Poty (Torre Comercial). O local oferece estacionamento coberto e seguro, elevadores modernos, total acessibilidade e comodidade. Atendemos de segunda a sexta das 08:00 às 19:00 e aos sábados das 08:00 às 12:00, mediante agendamento prévio.',
    },
    {
      question: 'O que diferencia o método do Dr. Leonardo Acioli de outros profissionais?',
      answer:
        'A união entre formação prévia em Enfermagem (profunda base clínica, fisiopatológica e medicamentosa) e especializações de ponta em Nutrição Esportiva Funcional, Nutrição de Precisão e Antropometria Internacional ISAK. Em vez de passar apenas um cardápio padrão, investigamos a causa raiz celular e digestiva com acolhimento genuíno e suporte próximo.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-sky-200 selection:text-sky-900 relative">
      {/* Scroll Progress Bar at very top */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-600 via-sky-400 to-emerald-500 origin-left z-50 pointer-events-none"
      />

      {/* 
        ZONE 1: TOP BAR CONTRACT 
        3-zone layout: [Brand wordmark] - [4-5 single line links] - [1 primary CTA]
      */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single element wordmark */}
          <motion.a
            href="#topo"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-display flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-700 to-sky-900 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              LA
            </span>
            <span className="group-hover:text-sky-700 transition-colors">Leonardo Acioli</span>
          </motion.a>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#metodologia" className="hover:text-sky-700 transition-colors whitespace-nowrap shrink-0">
              Metodologia
            </a>
            <a href="#especialidades" className="hover:text-sky-700 transition-colors whitespace-nowrap shrink-0">
              Especialidades
            </a>
            <a href="#sobre" className="hover:text-sky-700 transition-colors whitespace-nowrap shrink-0">
              Sobre o Nutricionista
            </a>
            <a href="#localizacao" className="hover:text-sky-700 transition-colors whitespace-nowrap shrink-0">
              Consultório & Contato
            </a>
            <a href="#faq" className="hover:text-sky-700 transition-colors whitespace-nowrap shrink-0">
              Dúvidas
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <motion.a
              href={DEFAULT_WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Falar no WhatsApp</span>
            </motion.a>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg overflow-hidden"
            >
              <a
                href="#metodologia"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700 hover:text-sky-700"
              >
                Metodologia de Causa Raiz
              </a>
              <a
                href="#especialidades"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700 hover:text-sky-700"
              >
                Especialidades Clínicas
              </a>
              <a
                href="#sobre"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700 hover:text-sky-700"
              >
                Sobre Leonardo Acioli
              </a>
              <a
                href="#localizacao"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700 hover:text-sky-700"
              >
                Consultório no Shopping Rio Poty
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700 hover:text-sky-700"
              >
                Perguntas Frequentes
              </a>
              <div className="pt-2">
                <a
                  href={DEFAULT_WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Agendar Consulta no WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 
        DOBRA 2: HERO SECTION DE ALTO IMPACTO
        2-column desktop layout with high value proposition, trust proof, and verified photos
      */}
      <section id="topo" className="relative pt-10 pb-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden">
        {/* Subtle decorative background shapes with gentle breathing motion */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-200/50 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value proposition with staggered entrance */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6"
            >
              {/* Clean unboxed eyebrow metadata */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-sky-800 uppercase tracking-wider">
                <span>Saúde Gastrointestinal</span>
                <span aria-hidden="true">·</span>
                <span>Nutrição de Precisão</span>
                <span aria-hidden="true">·</span>
                <span>Teresina & Online</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15] text-balance"
              >
                Descubra e trate a <span className="text-sky-700 relative inline-block">
                  causa raiz
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-300 rounded-full origin-left"
                  />
                </span> do seu desconforto intestinal com acompanhamento individualizado.
              </motion.h1>

              {/* Subheadline */}
              <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Especialista no tratamento de Síndrome do Intestino Irritável (SII), Disbiose, SIFO,
                candidíase de repetição e intolerâncias alimentares. Aliando testes nutrigenéticos,
                microbioma e antropometria para devolver sua digestão e vitalidade.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <motion.a
                  href={DEFAULT_WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-base font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-xl shadow-md hover:shadow-lg transition-all text-center"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-300" />
                  <span>Agendar Consulta Inicial</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="#metodologia"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm text-center"
                >
                  <Activity className="w-4 h-4 text-sky-700" />
                  <span>Conhecer Metodologia Clínica</span>
                </motion.a>
              </motion.div>

              {/* Friction-reducing microcopy */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Atendimento ágil direto pelo WhatsApp · Presencial no Shopping Rio Poty e Online</span>
              </motion.div>

              {/* Verified Trust Strip */}
              <motion.div variants={fadeInUp} className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/80">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-500 font-medium">Formação</p>
                  <p className="text-sm font-semibold text-slate-900">Enfermeiro & Nutricionista</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-500 font-medium">Especialização</p>
                  <p className="text-sm font-semibold text-slate-900">Saúde Gastrointestinal</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-500 font-medium">Certificação</p>
                  <p className="text-sm font-semibold text-slate-900">Antropometrista ISAK</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-500 font-medium">Consultório</p>
                  <p className="text-sm font-semibold text-slate-900">Shopping Rio Poty</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Visual with Real Professional Photography */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative mx-auto max-w-md lg:max-w-none"
              >
                {/* Visual frame with soft gradient & subtle border */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xl group"
                >
                  <img
                    id="professional-hero-photo"
                    src="/assets/aistudio/file_000000007498820eafd2f9396a63a028_f7607588.png"
                    alt="Nutricionista Leonardo Acioli em seu consultório"
                    className="w-full h-[460px] sm:h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-102"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />

                  {/* High quality overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

                  {/* Overlaid credentials panel */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div>
                        <h2 className="text-lg font-bold tracking-tight text-white font-display">
                          Leonardo Acioli
                        </h2>
                        <p className="text-xs text-sky-200 font-medium">
                          Nutricionista Clínico · CRN Ativo
                        </p>
                      </div>
                      <motion.a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white hover:bg-white/30 transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-300" />
                        <span>{INSTAGRAM_HANDLE}</span>
                      </motion.a>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      "Investigando a causa raiz dos sintomas digestivos com acolhimento e precisão científica."
                    </p>
                  </div>
                </motion.div>

                {/* Floating pill-free proof card with gentle floating float animation */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                  className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3.5 rounded-xl shadow-lg border border-slate-200/90 hidden sm:flex items-center gap-3 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Atendimento Humanizado</p>
                    <p className="text-[11px] text-slate-500">Presencial em Teresina & Teleconsulta</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        DOBRA 3: DORES DO CLIENTE & AGITAÇÃO EMPÁTICA
        Addressing chronic digestive suffering vs superficial treatments
      */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-12"
          >
            <span className="text-xs font-bold tracking-wider text-sky-700 uppercase">
              Compreensão & Diagnóstico
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-display">
              Você já se sentiu refém de dietas restritivas que nunca resolvem o problema?
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Muitos pacientes chegam ao consultório após anos sofrendo com sintomas digestivos que foram
              minimizados como "apenas estresse" ou tratados apenas com remédios que mascaram a queixa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-slate-50 rounded-2xl p-7 border border-slate-200 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                O ciclo do estufamento diário
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Você acorda com a barriga reta, mas ao longo do dia qualquer refeição gera inchaço
                desconfortável, gases e a sensação de que nada faz digestão direito.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-slate-50 rounded-2xl p-7 border border-slate-200 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Candidíase e infecções de repetição
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Você usa pomadas e remédios antifúngicos que resolvem temporariamente, mas os sintomas
                voltam logo em seguida porque o fungo continua supercrescido no trato intestinal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-slate-50 rounded-2xl p-7 border border-slate-200 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Metabolismo travado e fadiga
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Um intestino inflamado gera má absorção de nutrientes, cansaço constante e bloqueia a
                perda de gordura ou ganho de massa, não importa o quanto você treine.
              </p>
            </motion.div>
          </div>

          {/* Destaque Metodológico */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          >
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-lg sm:text-xl font-bold font-display">
                O segredo está em tratar a causa raiz, e não apenas podar os sintomas.
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Na clínica do Nutricionista Leonardo Acioli, cada intervenção é sustentada por
                análise bioquímica, microbioma e individualidade biológica.
              </p>
            </div>
            <motion.a
              href={DEFAULT_WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors shrink-0 shadow"
            >
              <span>Conversar com a Equipe</span>
              <ArrowRight className="w-4 h-4 text-sky-700" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 
        DOBRA 4: SOLUÇÃO & METODOLOGIA DE PRECISÃO
        4 stages of precision gastrointestinal care
      */}
      <section id="metodologia" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-16"
          >
            <span className="text-xs font-bold tracking-wider text-sky-700 uppercase">
              Protocolo Exclusivo
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-display">
              Como funciona o Acompanhamento 100% Personalizado
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Sem dietas de gaveta. Um processo estruturado passo a passo para mapear, desinflamar,
              reparar a mucosa e consolidar sua saúde a longo prazo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Mapeamento & Investigação',
                desc: 'Anamnese profunda dos sintomas gastrointestinais, rotina, histórico medicamentoso e gatilhos alimentares desde a infância.',
                badge: 'Escuta atenta e acolhimento',
                icon: <Check className="w-4 h-4 text-emerald-600" />,
              },
              {
                num: '02',
                title: 'Exames & Precisão Biológica',
                desc: 'Avaliação de microbioma, testes nutrigenéticos e perfil inflamatório para identificar exatamente o que seu organismo necessita.',
                badge: 'Nutrigenética & Metabolômica',
                icon: <Dna className="w-4 h-4 text-emerald-600" />,
              },
              {
                num: '03',
                title: 'Plano Nutricional Adaptativo',
                desc: 'Cardápio desenhado para o seu paladar, com suporte à cicatrização da barreira epitelial e equilíbrio da microbiota digestiva.',
                badge: 'Aplicativo com plano no celular',
                icon: <Check className="w-4 h-4 text-emerald-600" />,
              },
              {
                num: '04',
                title: 'Remodelação & Sustentabilidade',
                desc: 'Reintrodução alimentar segura, autonomia nas escolhas e monitoramento constante da evolução com antropometria ISAK.',
                badge: 'Antropometria ISAK oficial',
                icon: <Scale className="w-4 h-4 text-emerald-600" />,
              },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-lg group-hover:bg-sky-700 group-hover:text-white transition-colors">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                <div className="pt-2 text-xs font-medium text-sky-800 flex items-center gap-1.5">
                  {step.icon}
                  <span>{step.badge}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        DOBRA 5: VITRINE DE ESPECIALIDADES CLÍNICAS
        Interactive tabs / cards displaying confirmed specialties with smooth AnimatePresence transition
      */}
      <section id="especialidades" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14"
          >
            <span className="text-xs font-bold tracking-wider text-sky-700 uppercase">
              Áreas de Atuação Confirmadas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-display">
              Especialidades & Casos Clínicos Atendidos
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Conheça as principais condições tratadas pelo Nutricionista Leonardo Acioli em Teresina
              e em todo o Brasil através da teleconsulta.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List of Specialty Selectors */}
            <div className="lg:col-span-5 space-y-2">
              {specialties.map((spec, index) => {
                const isActive = selectedSpecialty === index;
                return (
                  <motion.button
                    key={spec.title}
                    onClick={() => setSelectedSpecialty(index)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-left p-4 rounded-xl transition-all border relative overflow-hidden ${
                      isActive
                        ? 'bg-sky-50 border-sky-300 text-sky-950 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                        {spec.tag}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="activeSpecialtyDot"
                          className="w-2.5 h-2.5 rounded-full bg-sky-600"
                        />
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {spec.summary}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Specialty Detailed Card with fluid animated transitions */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 relative min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSpecialty}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                      {specialties[selectedSpecialty].tag}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">
                      {specialties[selectedSpecialty].title}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-slate-700">
                      {specialties[selectedSpecialty].summary}
                    </p>
                  </div>

                  <div className="text-sm text-slate-600 leading-relaxed space-y-3">
                    <p>{specialties[selectedSpecialty].description}</p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-200">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Diferenciais do protocolo:
                    </p>
                    {specialties[selectedSpecialty].points.map((pt) => (
                      <div key={pt} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <motion.a
                      href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
                        `Olá, Dr. Leonardo! Gostaria de orientações e agendamento para o tratamento de ${specialties[selectedSpecialty].title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-300" />
                      <span>Agendar Consulta para este Caso</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 
        DOBRA 6: VÍDEO REAL DO ESPECIALISTA & ORIENTAÇÃO CLÍNICA
        Showcasing Dr. Leonardo Acioli's actual educational reel
      */}
      <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle radial background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left text column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <span className="text-xs font-bold tracking-wider text-sky-400 uppercase">
                Conteúdo & Evidência Clínica
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white leading-tight">
                "Sou nutricionista especialista em intestino e estas são as 5 coisas que proíbo pacientes com disbiose."
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                No dia a dia clínico, vemos hábitos aparentemente inofensivos sabotando a microbiota
                intestinal. Assista à orientação em vídeo do próprio Dr. Leonardo Acioli e descubra
                como pequenos erros diários impedem sua digestão de funcionar perfeitamente.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Por que cortar fibras aleatoriamente piora a disbiose</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>O perigo do uso indiscriminado de probióticos comerciais sem indicação</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Como recuperar a tolerância aos alimentos com acompanhamento guiado</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <motion.a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-pink-600/20 text-pink-300 border border-pink-500/30 hover:bg-pink-600/30 transition-colors text-sm font-medium"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Acompanhar @leoaciolinutri no Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Right column: Interactive video player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[320px] rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl group">
                <video
                  ref={videoRef}
                  src="/assets/aistudio/instagram-1794371198544_bea8fc0e.mp4"
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full aspect-[9/16] object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Video controls overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold bg-black/50 backdrop-blur-md px-2 py-1 rounded">
                    Reel Educativo
                  </span>
                  <motion.button
                    onClick={toggleVideoMute}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors pointer-events-auto"
                    title={isMuted ? 'Ativar som' : 'Desativar som'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </motion.button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                  <motion.button
                    onClick={toggleVideoPlay}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-lg transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isPlaying ? 'Pausar Vídeo' : 'Assistir Vídeo'}</span>
                  </motion.button>
                  <span className="text-[11px] text-slate-300">@leoaciolinutri</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        DOBRA 7: SOBRE O NUTRICIONISTA LEONARDO ACIOLI (com id="professional-photo")
        Complete biography, ISAK certification, and verified photo
      */}
      <section id="sobre" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column with provided asset unnamed__1__062292a6.webp */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="relative max-w-md mx-auto">
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100"
                >
                  <img
                    id="professional-photo"
                    src="/assets/aistudio/unnamed__1__062292a6.webp"
                    alt="Nutricionista Leonardo Acioli - Formação e Especialidades"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <p className="text-center text-xs text-slate-500 mt-2">
                  Registro Profissional Verificado · Conselho Regional de Nutricionistas
                </p>
              </div>
            </motion.div>

            {/* Biography Column */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6 order-1 lg:order-2"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-wider text-sky-700 uppercase">
                  Sobre o Especialista
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-display">
                  Me chamo Leonardo Acioli
                </h2>
                <p className="text-lg font-medium text-sky-800">
                  Nutricionista com pós-graduação em Nutrição Esportiva Funcional e Nutrição de Precisão.
                </p>
              </div>

              <div className="text-base text-slate-600 leading-relaxed space-y-4">
                <p>
                  Sou especialista em saúde gastrointestinal com atendimentos presenciais em{' '}
                  <strong className="text-slate-900">Teresina/PI</strong> e consultas online para todo
                  o Brasil e o exterior.
                </p>
                <p>
                  Minha prática clínica foca diretamente na investigação e tratamento de casos de{' '}
                  <strong className="text-slate-900">
                    síndrome do intestino irritável (SII), disbiose, SIFO, candidíase de repetição e
                    intolerâncias alimentares
                  </strong>
                  . Sempre investigando a causa raiz desses quadros para que você não precise viver à base
                  de remédios paliativos ou restrições dolorosas.
                </p>
                <p>
                  Também trabalho com <strong className="text-slate-900">emagrecimento funcional e hipertrofia</strong>,
                  sempre partindo da saúde intestinal como base biológica obrigatória para resultados reais
                  e duradouros.
                </p>
                <p>
                  Enfermeiro de formação anterior, trago uma visão hospitalar e fisiopatológica integrada.
                  Com especialização em{' '}
                  <strong className="text-slate-900">
                    testes nutrigenéticos, análise de microbioma e metabolômica
                  </strong>
                  , além da certificação internacional <strong className="text-slate-900">ISAK</strong> em antropometria,
                  crio um acompanhamento 100% personalizado de acordo com suas preferências e necessidades
                  individuais.
                </p>
              </div>

              {/* Badges strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: <Award className="w-5 h-5 text-sky-700 shrink-0" />, text: 'Antropometrista Internacional ISAK' },
                  { icon: <Microscope className="w-5 h-5 text-sky-700 shrink-0" />, text: 'Nutrigenética & Microbioma' },
                  { icon: <UserCheck className="w-5 h-5 text-sky-700 shrink-0" />, text: 'Enfermeiro de Formação (Visão Clínica)' },
                  { icon: <HeartPulse className="w-5 h-5 text-sky-700 shrink-0" />, text: 'Acolhimento & Escuta Ativa' },
                ].map((item) => (
                  <motion.div
                    key={item.text}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    {item.icon}
                    <span className="text-xs font-semibold text-slate-800">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-2">
                <motion.a
                  href={DEFAULT_WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-xl shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Agendar Consulta com Leonardo Acioli</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        DOBRA 8: CONSULTÓRIO NO SHOPPING RIO POTY (TERESINA/PI) & ATENDIMENTO ONLINE
        Precise confirmed address, hours, maps embed, and teleconsultation details
      */}
      <section id="localizacao" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-4 mb-14"
          >
            <span className="text-xs font-bold tracking-wider text-sky-700 uppercase">
              Onde nos encontrar
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-display">
              Consultório Presencial em Teresina & Teleconsulta
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Atendimento com total privacidade, conforto e tecnologia no coração de Teresina, ou no
              conforto da sua casa via teleconsulta com cobertura nacional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left address details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Endereço Oficial Presencial
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Avenida Marechal Castelo Branco, 911
                      <br />
                      Bairro Porenquanto, Teresina - PI
                      <br />
                      CEP: 64003-087
                    </p>
                    <p className="text-xs font-semibold text-sky-800 pt-1">
                      Localizado em: Shopping Rio Poty (Torre Comercial)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Horários de Atendimento
                    </h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>
                        <strong className="text-slate-800">Segunda a Sexta:</strong> 08:00 às 19:00
                      </li>
                      <li>
                        <strong className="text-slate-800">Sábado:</strong> 08:00 às 12:00 (meio-dia)
                      </li>
                      <li>
                        <strong className="text-slate-800">Domingo:</strong> Fechado
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Contato & WhatsApp
                    </h3>
                    <p className="text-sm text-slate-700 font-semibold">
                      {WHATSAPP_DISPLAY}
                    </p>
                    <p className="text-xs text-slate-500">
                      Instagram: {INSTAGRAM_HANDLE}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'Shopping Rio Poty, Avenida Marechal Castelo Branco, 911, Teresina - PI, 64003-087'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors shadow-sm text-center"
                >
                  <MapPin className="w-4 h-4 text-sky-700" />
                  <span>Abrir no Google Maps</span>
                </motion.a>

                <motion.a
                  href={`https://waze.com/ul?q=${encodeURIComponent(
                    'Shopping Rio Poty Teresina PI'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors shadow-sm text-center"
                >
                  <ExternalLink className="w-4 h-4 text-sky-700" />
                  <span>Traçar Rota no Waze</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Map Embed & Online Option */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 flex flex-col space-y-4"
            >
              <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 min-h-[300px] relative">
                <iframe
                  title="Localização Shopping Rio Poty - Nutricionista Leonardo Acioli"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.9602521102924!2d-42.81156222416307!3d-5.074786494902123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x78e39f37c3746c1%3A0xe5a3ebbf58eb8b22!2sShopping%20Rio%20Poty!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '320px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Online consultation card */}
              <div className="p-5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-sky-950">
                    Mora fora de Teresina ou no exterior?
                  </h4>
                  <p className="text-xs text-sky-800">
                    A teleconsulta nutricional conta com a mesma eficácia, envio de guias e suporte direto.
                  </p>
                </div>
                <motion.a
                  href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
                    'Olá, Dr. Leonardo! Gostaria de informações sobre o agendamento da teleconsulta (consulta online).'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg whitespace-nowrap shrink-0 shadow-sm"
                >
                  Agendar Online
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        DOBRA 9: PERGUNTAS FREQUENTES (FAQ)
        Accessible accordion answering patient objections with smooth animated heights
      */}
      <section id="faq" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <span className="text-xs font-bold tracking-wider text-sky-700 uppercase">
              Tire suas Dúvidas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-display">
              Perguntas Frequentes
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto">
              Entenda como funciona o acompanhamento, preparação de exames e modalidades de atendimento.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = faqOpenIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-colors hover:border-slate-300"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-sky-700 transition-colors"
                  >
                    <span className="text-base">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-slate-700" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-slate-600 mb-3">Ainda tem alguma dúvida específica sobre o seu caso?</p>
            <motion.a
              href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
                'Olá, Dr. Leonardo! Tenho uma dúvida sobre o tratamento e gostaria de conversar.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Converse diretamente com o Dr. Leonardo no WhatsApp</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* 
        DOBRA 10: AGENDAMENTO EXCLUSIVO PELO WHATSAPP (SEM FORMULÁRIO)
      */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-sky-50/40 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-xl text-center space-y-8 relative overflow-hidden"
          >
            {/* Subtle glow circle behind CTA */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-16 w-80 h-80 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <span className="text-xs font-bold tracking-wider text-sky-700 uppercase">
                Atendimento Direto & Sem Burocracia
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-display">
                Agendamento Exclusivo pelo WhatsApp
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Para garantir um atendimento ágil, personalizado e humano, todo o processo de agendamento,
                consulta de horários e esclarecimento de dúvidas é realizado diretamente pelo WhatsApp oficial.
              </p>
            </div>

            {/* 3 Quick highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left relative z-10">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h3 className="text-sm font-bold text-slate-900">Resposta Rápida</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Informações sobre valores, preparo de exames e próximos horários disponíveis.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h3 className="text-sm font-bold text-slate-900">Presencial ou Online</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Escolha entre o consultório no Shopping Rio Poty ou teleconsulta de alta definição.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h3 className="text-sm font-bold text-slate-900">Suporte Dedicado</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Atendimento acolhedor e direto com a equipe do Nutricionista Leonardo Acioli.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2 relative z-10 space-y-3">
              <motion.a
                href={DEFAULT_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
                <span>Iniciar Conversa no WhatsApp Oficial</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">WhatsApp Oficial: {WHATSAPP_DISPLAY}</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>Atendimento ágil de Segunda a Sábado</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 
        DOBRA 11: RODAPÉ CORPORATIVO & COMPLIANCE (CFN / LGPD)
      */}
      <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
                  LA
                </span>
                <span className="text-lg font-bold text-white font-display">
                  Nutricionista Leonardo Acioli
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Nutricionista especializado em saúde gastrointestinal, nutrição de precisão e esportiva.
                Investigando e tratando a causa raiz de sintomas digestivos com rigor científico e acolhimento humano.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <Instagram className="w-4 h-4 text-pink-400" />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Navegação Rápida
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#metodologia" className="hover:text-white transition-colors">
                    Metodologia de Causa Raiz
                  </a>
                </li>
                <li>
                  <a href="#especialidades" className="hover:text-white transition-colors">
                    Especialidades Clínicas
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-white transition-colors">
                    Sobre o Nutricionista
                  </a>
                </li>
                <li>
                  <a href="#localizacao" className="hover:text-white transition-colors">
                    Shopping Rio Poty
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    Perguntas Frequentes
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Consultório Presencial
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Avenida Marechal Castelo Branco, 911
                <br />
                Porenquanto, Teresina - PI
                <br />
                CEP: 64003-087
                <br />
                Localizado em: Shopping Rio Poty
              </p>
              <p className="text-xs font-semibold text-sky-400 pt-1">
                WhatsApp: {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Nutricionista Leonardo Acioli. Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-slate-500 max-w-md">
              Aviso ético: As orientações contidas neste site possuem caráter informativo e não substituem
              a consulta nutricional e médica individualizada, em consonância com o Código de Ética do CFN.
            </p>
          </div>
        </div>
      </footer>

      {/* 
        FLOATING WHATSAPP BUTTON (Bottom right with discrete pulse & smooth entrance)
      */}
      <motion.a
        href={DEFAULT_WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp com o Nutricionista Leonardo Acioli"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-colors group cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-bold hidden sm:inline-block tracking-wide">
          Atendimento WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
