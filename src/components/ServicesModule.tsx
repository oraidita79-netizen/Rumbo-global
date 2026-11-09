import React, { useState } from 'react';
import { MigrationService, NavigationTab } from '../types';
import { MIGRATION_SERVICES } from '../data/mockData';
import { 
  FileCheck2, Clock, Landmark, Coins, ArrowRight, 
  Sparkles, CheckCircle2, ChevronRight, Shield, BookOpen, X 
} from 'lucide-react';

interface ServicesModuleProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
  onAskAlex: (serviceTitle: string) => void;
}

export const ServicesModule: React.FC<ServicesModuleProps> = ({
  onSelectServiceForBooking,
  onAskAlex,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeGuideModal, setActiveGuideModal] = useState<MigrationService | null>(null);

  const categories = ['Todos', 'Residencia', 'Visados', 'Nacionalidad', 'Homologación'];

  const filteredServices = MIGRATION_SERVICES.filter((srv) => {
    return selectedCategory === 'Todos' || srv.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#00F5FF]">
          Catálogo Jurídico Especializado
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mt-2">
          Servicios y Guías de Trámites Migratorios
        </h2>
        <p className="mt-3 text-sm text-slate-300">
          Asistencia técnica integral en derecho de extranjería, visados de teletrabajo, autorizaciones de residencia y adquisición de ciudadanía europea.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-400 to-[#00B4D8] text-slate-950 shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl p-6 glass-panel border border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all flex flex-col justify-between space-y-5 group"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00F5FF]">
                  {service.category}
                </span>
                {service.popular && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30">
                    Más Solicitado
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white font-heading mt-2 group-hover:text-cyan-300 transition-colors">
                {service.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {service.description}
              </p>

              {/* Legal Metrics */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{service.processingTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                  <span className="truncate">{service.governmentFee}</span>
                </div>
              </div>

              {/* Requirements checklist snippet */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Requisitos Clave:
                </span>
                {service.legalRequirements.slice(0, 2).map((req, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 leading-snug">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <button
                onClick={() => onSelectServiceForBooking(service.title)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00F5FF]/15 hover:bg-[#00F5FF]/25 text-[#00F5FF] border border-[#00F5FF]/40 transition-all"
              >
                <span>Agendar Cita para este Trámite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  onClick={() => setActiveGuideModal(service)}
                  className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-center transition-colors flex items-center justify-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-[#FFD700]" />
                  <span>Ver Guía Completa</span>
                </button>
                <button
                  onClick={() => onAskAlex(`¿Cuáles son los requisitos detallados para ${service.title}?`)}
                  className="py-1.5 px-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/50 text-center transition-colors flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Preguntar a Alex</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Detail Modal */}
      {activeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-400/50 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-[#00F5FF] uppercase tracking-wider">
                  {activeGuideModal.category} · Guía Oficial Paso a Paso
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1">
                  {activeGuideModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveGuideModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeGuideModal.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Plazo Medio de Resolución:</span>
                <strong className="text-white">{activeGuideModal.processingTime}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Tasa Gubernamental:</span>
                <strong className="text-[#FFD700]">{activeGuideModal.governmentFee}</strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[11px]">Órgano Competente:</span>
                <strong className="text-cyan-300">{activeGuideModal.officialEntity}</strong>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                Requisitos y Documentación Obligatoria
              </h4>
              <div className="space-y-2">
                {activeGuideModal.legalRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveGuideModal(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  const title = activeGuideModal.title;
                  setActiveGuideModal(null);
                  onSelectServiceForBooking(title);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-[#00B4D8] text-slate-950 hover:brightness-110 shadow-md"
              >
                Iniciar Este Trámite Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
