import React from 'react';
import { 
  ShieldCheck, Cpu, Clock, Award, Users, 
  Sparkles, CheckCircle2, ArrowRight, Globe2, 
  FileCheck, Scale, ExternalLink 
} from 'lucide-react';

const NOMAD_IMG = '/src/assets/images/case_nomad_worker_1794219615073.jpg';
const FAMILY_IMG = '/src/assets/images/case_family_residence_1794219614401.jpg';
const OFFICE_IMG = '/src/assets/images/legal_council_office_1794219614750.jpg';

interface ReaddyShowcaseSectionsProps {
  onGoToAppointments: () => void;
  onGoToServices: () => void;
  onAskAlex: (topic: string) => void;
}

export const ReaddyShowcaseSections: React.FC<ReaddyShowcaseSectionsProps> = ({
  onGoToAppointments,
  onGoToServices,
  onAskAlex,
}) => {
  const caseStudies = [
    {
      title: 'Autorización de Residencia para Nómada Digital',
      client: 'Camila Restrepo · Ingeniera de Software (Colombia)',
      timeline: '19 Días Hábiles',
      outcome: 'Residencia concedida por 3 años + Beneficio Fiscal Beckham (24% fijo)',
      quote: 'Rumbo Global y el asistente Alex coordinaron todo en remoto. Mi visado fue resuelto por la UGE en tiempo récord sin moverme de Bogotá.',
      image: NOMAD_IMG,
      category: 'Ley de Startups 28/2022'
    },
    {
      title: 'Reagrupación Familiar y Tarjeta Comunitaria',
      client: 'Familia Valenzuela Méndez · 4 Miembros (México)',
      timeline: '34 Días',
      outcome: 'Tarjetas TIE expedidas con permiso de trabajo simultáneo para cónyuge e hijos',
      quote: 'Presentaron todo telemáticamente por Mercurio y subsanaron una legalización consular antes de que fuera requerida. Impecable servicio letrado.',
      image: FAMILY_IMG,
      category: 'Régimen Comunitario UE'
    }
  ];

  return (
    <div className="space-y-24 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100">
      {/* SECTION 1: Bento Grid de Pilares Tecnológicos y Seguridad Jurídica */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00F5FF]">
            Tecnología Legal de Vanguardia
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mt-2">
            La Nueva Era del Asesoramiento Migratorio
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Combinamos inteligencia artificial multimodal con letrados colegiados en ejercicio. Menos burocracia, máxima certidumbre jurídica y seguimiento en tiempo real de cada fase.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Bento Card 1: Large Council Feature */}
          <div className="md:col-span-8 rounded-2xl glass-panel border border-cyan-500/20 overflow-hidden relative flex flex-col justify-between group shadow-xl">
            <div className="h-64 sm:h-72 w-full relative overflow-hidden">
              <img
                src={OFFICE_IMG}
                alt="Sede Central y Consejo Letrado"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-[#FFD700] border border-[#FFD700]/40 backdrop-blur-md">
                  Consejo Jurídico Colegiado
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3 relative -mt-8 z-10 bg-gradient-to-t from-[#0B132B] via-[#0B132B] to-transparent">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Firma Letrada Colegiada en Extranjería y Derecho Internacional
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Todos nuestros expedientes son auditados y rubricados por abogados ejercientes del Ilustre Colegio de Abogados de Madrid (ICAM). Garantizamos la interposición telemática directa a través de la plataforma oficial Mercurio.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5FF]" />
                  Cero desplazamientos a oficinas de Extranjería
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5FF]" />
                  Certificado digital con firma avanzada
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: AI Assistant Alex Pillar */}
          <div className="md:col-span-4 rounded-2xl glass-panel-gold border border-[#FFD700]/30 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700] mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold text-[#FFD700] tracking-wider block">
                Asistente Virtual Alex
              </span>
              <h3 className="text-lg font-bold text-white font-heading mt-1">
                Orientación Multimodal con Síntesis de Voz
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Alex analiza tu caso en lenguaje natural, te guía en los 4 flujos migratorios principales y te conecta de inmediato con nuestros abogados cuando tu expediente lo requiere.
              </p>
            </div>

            <button
              onClick={() => onAskAlex('¿Cuáles son los primeros pasos para regularizar mi situación en España?')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#FFD700] text-slate-950 hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conversar con Alex</span>
            </button>
          </div>

          {/* Bento Card 3: Direct Consular Corridors */}
          <div className="md:col-span-6 rounded-2xl glass-panel border border-cyan-500/20 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[#00F5FF]">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  32 Corredores Consulares Activos
                </h3>
                <span className="text-[11px] text-slate-400">
                  Gestión integral en origen y destino
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tramitamos apostillas de La Haya, homologaciones de títulos, antecedentes penales y visados consulares directamente con las representaciones diplomáticas de España en Colombia, México, Argentina, EE.UU., Chile y Perú.
            </p>
          </div>

          {/* Bento Card 4: 24/7 Rapid Emergency Response */}
          <div className="md:col-span-6 rounded-2xl glass-panel border border-cyan-500/20 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Guardia de Frontera en Menos de 60 Minutos
                </h3>
                <span className="text-[11px] text-slate-400">
                  Aeropuertos de Madrid-Barajas y Barcelona-El Prat
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Servicio de asistencia letrada inmediata en salas de inadmisión y comisarías de extranjería. Redacción de medidas cautelares urgentes ante juzgados de lo contencioso-administrativo.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Casos Reales y Testimonios con Evidencia */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
            Historias Reales de Éxito
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mt-2">
            Miles de Vidas Conectadas a su Futuro
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Cada expediente representa una familia, un proyecto profesional o una nueva oportunidad internacional. Conoce casos reales resueltos por nuestro equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel border border-cyan-500/20 overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-black/30" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-[#00F5FF] border border-cyan-400/30 backdrop-blur-md">
                  {study.category}
                </span>
                <span className="absolute bottom-4 right-4 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#FFD700] text-slate-950 shadow-md">
                  {study.timeline}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {study.title}
                  </h3>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    {study.client}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-cyan-300 font-medium">
                  {study.outcome}
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed border-l-2 border-[#00F5FF] pl-3 py-0.5">
                  "{study.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Comparativa - Gestoría Tradicional vs Rumbo Global */}
      <section className="glass-panel rounded-2xl p-6 sm:p-10 border border-cyan-500/20 shadow-xl space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00F5FF]">
            Transparencia y Eficiencia
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
            Por qué elegir la plataforma Rumbo Global
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                <th className="py-3 px-4 font-semibold">Criterio de Servicio</th>
                <th className="py-3 px-4 font-semibold text-slate-500">Gestoría Tradicional</th>
                <th className="py-3 px-4 font-semibold text-[#00F5FF]">Rumbo Global</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Presentación de Expedientes</td>
                <td className="py-3.5 px-4 text-slate-400">Presencial o con citas colapsadas</td>
                <td className="py-3.5 px-4 font-semibold text-cyan-300">Telemática inmediata vía Mercurio (24-48h)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Seguimiento del Estado</td>
                <td className="py-3.5 px-4 text-slate-400">Llamadas telefónicas sin respuesta</td>
                <td className="py-3.5 px-4 font-semibold text-cyan-300">Dashboard digital en tiempo real con 5 hitos</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Atención y Consultas</td>
                <td className="py-3.5 px-4 text-slate-400">Horario de oficina restringido</td>
                <td className="py-3.5 px-4 font-semibold text-cyan-300">Asistente Alex 24/7 + Guardia Letrada</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Custodia Documental</td>
                <td className="py-3.5 px-4 text-slate-400">Papel físico y riesgo de extravío</td>
                <td className="py-3.5 px-4 font-semibold text-cyan-300">Bóveda digital cifrada AES-256 en la nube</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: Final High-Impact CTA Strip */}
      <section className="glass-panel-gold rounded-2xl p-8 sm:p-12 border border-[#FFD700]/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
            Empieza Hoy Tu Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            ¿Listo para dar el paso hacia tu residencia o visado?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Reserva una consulta con nuestros letrados o realiza un diagnóstico previo con el asistente virtual Alex. Tu futuro internacional comienza aquí.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
          <button
            onClick={onGoToAppointments}
            className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-[#FFD700] text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2"
          >
            <span>Agendar Cita con Asesor Jurídico</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToServices}
            className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/90 border border-slate-700 hover:border-cyan-400 transition-colors"
          >
            Consultar Catálogo de Trámites
          </button>
        </div>
      </section>
    </div>
  );
};
