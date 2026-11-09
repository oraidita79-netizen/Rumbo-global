import React, { useState } from 'react';
import { 
  Calculator, FileDown, CheckCircle2, AlertCircle, 
  HelpCircle, Sparkles, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface ResourcesModuleProps {
  onGoToAppointments: () => void;
  onAskAlex: (query: string) => void;
}

export const ResourcesModule: React.FC<ResourcesModuleProps> = ({
  onGoToAppointments,
  onAskAlex,
}) => {
  // Evaluator state
  const [originRegion, setOriginRegion] = useState('Iberoamérica');
  const [yearsStaying, setYearsStaying] = useState('Más de 3 años');
  const [employmentType, setEmploymentType] = useState('Tengo oferta de contrato laboral');
  const [hasEUTies, setHasEUTies] = useState('No');
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);

  const calculatePathway = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasEUTies === 'Sí, cónyuge o familiar directo') {
      setDiagnosisResult('Vía Óptima: Tarjeta de Residencia de Familiar de Ciudadano de la Unión Europea (Régimen Comunitario). Otorga residencia y derecho a trabajar por 5 años sin límite temporal.');
    } else if (employmentType === 'Teletrabajo para empresa extranjera') {
      setDiagnosisResult('Vía Óptima: Visado o Autorización de Residencia para Nómada Digital (Ley de Startups 28/2022). Tramitación rápida en 20 días con régimen fiscal especial.');
    } else if (yearsStaying === 'Más de 3 años' && employmentType.includes('oferta de contrato')) {
      setDiagnosisResult('Vía Óptima: Autorización de Residencia Temporal por Arraigo Social. Cumples el requisito de permanencia continuada (3 años) y propuesta de contrato laboral.');
    } else if (originRegion === 'Iberoamérica' && yearsStaying === 'Entre 2 y 3 años') {
      setDiagnosisResult('Vía Óptima: Regularización por Arraigo + Vía Rápida a Nacionalidad Española en 2 años gracias al Convenio de Doble Nacionalidad para nacionales iberoamericanos.');
    } else {
      setDiagnosisResult('Vía Recomendada: Estudio personalizado por el equipo letrado para evaluar Arraigo Socioformativo, Residencia No Lucrativa o Estancia por Estudios.');
    }
  };

  const officialTemplates = [
    {
      name: 'Modelo EX-10: Solicitud de Residencia por Circunstancias Excepcionales (Arraigo)',
      code: 'EX-10',
      size: '240 KB',
      format: 'PDF Oficial'
    },
    {
      name: 'Tasa 790 Código 052: Tramitación de autorizaciones de residencia',
      code: 'TASA-790-052',
      size: '180 KB',
      format: 'PDF Rellenable'
    },
    {
      name: 'Modelo EX-17: Solicitud de Tarjeta de Identidad de Extranjero (TIE)',
      code: 'EX-17',
      size: '310 KB',
      format: 'PDF Oficial'
    },
    {
      name: 'Plantilla de Declaración Jurada de Manutención y Convivencia Continuada',
      code: 'DOC-JUR-04',
      size: '120 KB',
      format: 'DOCX / PDF'
    }
  ];

  const faqs = [
    {
      q: '¿Cómo demuestro la permanencia continuada de 3 años para el arraigo social?',
      a: 'El medio de prueba preferente es el certificado histórico de empadronamiento. No obstante, se admiten pruebas complementarias válidas en derecho: envíos de dinero fehacientes, historial médico en la sanidad pública, abonos de transporte nominativos o extractos bancarios.'
    },
    {
      q: '¿Cuánto tiempo tardan los ciudadanos iberoamericanos en obtener la nacionalidad española?',
      a: 'Solo requieren 2 años de residencia legal y continuada en España (a diferencia del régimen general de 10 años). Además, conservan su nacionalidad de origen sin renunciar a ella.'
    },
    {
      q: '¿Qué ocurre si la Oficina de Extranjería no contesta en plazo?',
      a: 'Para la mayoría de autorizaciones iniciales rige el silencio administrativo negativo tras 3 meses, habilitando la interposición de recurso potestativo de reposición o recurso contencioso-administrativo. En cambio, para Nómadas Digitales ante la UGE rige el silencio administrativo positivo en 20 días hábiles.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#00F5FF]">
          Herramientas y Documentación Legal
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mt-2">
          Recursos y Evaluador de Viabilidad Migratoria
        </h2>
        <p className="mt-3 text-sm text-slate-300">
          Evalúa de forma automática tu perfil migratorio, accede a impresos oficiales de extranjería y consulta las preguntas jurídicas frecuentes.
        </p>
      </div>

      {/* Interactive Viability Screener */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[#00F5FF]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              Diagnóstico Automatizado de Vía Migratoria
            </h3>
            <p className="text-xs text-slate-400">
              Selecciona tus circunstancias para calcular la opción legal más viable y rápida.
            </p>
          </div>
        </div>

        <form onSubmit={calculatePathway} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1.5">
                Región o País de Origen
              </label>
              <select
                value={originRegion}
                onChange={(e) => setOriginRegion(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Iberoamérica">País Iberoamericano (Convenio 2 años)</option>
                <option value="Unión Europea / EEE">Unión Europea / Espacio Económico</option>
                <option value="EE.UU. / Canadá">Estados Unidos / Canadá</option>
                <option value="Otros países">Otros Países (Régimen General)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1.5">
                Tiempo de Estancia en España
              </label>
              <select
                value={yearsStaying}
                onChange={(e) => setYearsStaying(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Aún no resido en España">Aún no resido en España (Visado previo)</option>
                <option value="Menos de 2 años">Menos de 2 años</option>
                <option value="Entre 2 y 3 años">Entre 2 y 3 años</option>
                <option value="Más de 3 años">Más de 3 años continuados</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1.5">
                Situación Laboral / Económica
              </label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Tengo oferta de contrato laboral">Tengo oferta de contrato laboral</option>
                <option value="Teletrabajo para empresa extranjera">Teletrabajo en remoto (Nómada Digital)</option>
                <option value="Fondos económicos propios sin trabajar">Fondos económicos propios (No Lucrativa)</option>
                <option value="Estudios / Prácticas académicas">Estudiante / Matrícula Universitaria</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1.5">
                ¿Familiares con Nacionalidad Española o UE?
              </label>
              <select
                value={hasEUTies}
                onChange={(e) => setHasEUTies(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="No">No tengo familiares directos de la UE</option>
                <option value="Sí, cónyuge o familiar directo">Sí, cónyuge, pareja o progenitor</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-[#00F5FF] hover:bg-cyan-500/30 border border-cyan-400/50 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span>Calcular Vía Migratoria</span>
            </button>
          </div>
        </form>

        {diagnosisResult && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-950/70 to-slate-900 border border-cyan-400/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#00F5FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold text-[#FFD700] uppercase block">
                  Resultado del Análisis Previo
                </span>
                <p className="text-xs text-white font-medium mt-0.5 leading-relaxed">
                  {diagnosisResult}
                </p>
              </div>
            </div>

            <button
              onClick={onGoToAppointments}
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00F5FF] text-slate-950 hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 self-end sm:self-auto"
            >
              Agendar Consulta para este Caso
            </button>
          </div>
        )}
      </div>

      {/* Official Downloadable Forms */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
          <FileDown className="w-5 h-5 text-[#FFD700]" />
          <span>Modelos Oficiales de Extranjería Descargables</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {officialTemplates.map((template, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl glass-panel border border-slate-800 hover:border-cyan-800/60 transition-all flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-[#00F5FF] block">
                  {template.code} · {template.format}
                </span>
                <h4 className="text-xs font-semibold text-white mt-0.5">
                  {template.name}
                </h4>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Tamaño: {template.size} · Validado para sede electrónica Mercurio
                </span>
              </div>

              <button
                onClick={() => alert(`Descargando ${template.name}`)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-slate-800 hover:border-cyan-700 transition-colors shrink-0"
                title="Descargar impreso"
              >
                <FileDown className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/20 shadow-md space-y-4">
        <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#00F5FF]" />
          <span>Preguntas Frecuentes Jurídicas</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <h4 className="text-xs font-bold text-[#FFD700]">
                {faq.q}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
