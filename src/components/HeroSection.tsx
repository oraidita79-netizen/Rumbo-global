import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { 
  ArrowRight, Calendar, Sparkles, Compass, ShieldCheck, 
  Eye, EyeOff, Globe, ChevronDown, CheckCircle2, RotateCw, Activity
} from 'lucide-react';

interface HeroSectionProps {
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAlex: () => void;
  onScrollToExplore?: () => void;
  selectedHub: string;
  onSelectHub: (hub: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectTab,
  onOpenAlex,
  onScrollToExplore,
  selectedHub,
  onSelectHub,
}) => {
  const [minimalMode, setMinimalMode] = useState(false);

  const hubDetails: Record<string, { corridor: string; time: string; consulate: string; coords: string }> = {
    'Madrid': { 
      corridor: 'Sede Central Europa & Consejo Letrado', 
      time: 'Tramitación telemática Mercurio', 
      consulate: 'Colegio de Abogados ICAM Nº 89.412',
      coords: '40.4168° N, 3.7038° W'
    },
    'Bogotá': { 
      corridor: 'Corredor Andino (Colombia -> España)', 
      time: 'Media 2-3 meses', 
      consulate: 'Consulado General Calle 94A',
      coords: '4.7110° N, 74.0721° W'
    },
    'Ciudad de México': { 
      corridor: 'Corredor Norte/Centroamérica', 
      time: 'Media 2 meses', 
      consulate: 'Consulado General Polanco',
      coords: '19.4326° N, 99.1332° W'
    },
    'Buenos Aires': { 
      corridor: 'Corredor Cono Sur (Argentina -> España)', 
      time: 'Media 2-3 meses', 
      consulate: 'Consulado General Calle Guido',
      coords: '34.6037° S, 58.3816° W'
    },
    'Miami': { 
      corridor: 'Corredor EE.UU. (Florida -> España)', 
      time: 'Media 20 días (Startups / Nómadas)', 
      consulate: 'Consulado Coral Gables',
      coords: '25.7617° N, 80.1918° W'
    },
    'Santiago': { 
      corridor: 'Corredor Pacífico (Chile -> España)', 
      time: 'Media 2-4 meses', 
      consulate: 'Consulado Providencia',
      coords: '33.4489° S, 70.6693° W'
    },
    'Londres': { 
      corridor: 'Corredor Reino Unido post-Brexit', 
      time: 'Media 1-2 meses', 
      consulate: 'Consulado Chelsea',
      coords: '51.5074° N, 0.1278° W'
    },
  };

  const activeHubInfo = hubDetails[selectedHub] || hubDetails['Madrid'];

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between px-4 sm:px-8 py-6 pointer-events-none">
      {/* Top Header Information & Brand Statement - Kept compact to preserve center 3D motion graphics cleanliness */}
      <div className={`transition-all duration-500 max-w-4xl mx-auto text-center pointer-events-auto ${minimalMode ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100'}`}>
        {/* Prestige Slogan Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-xs font-semibold tracking-wider text-[#00F5FF] uppercase mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(0,245,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>Tu futuro, conectado y seguro</span>
        </div>

        {/* Master Brand Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-heading">
          RUMBO <span className="text-[#00F5FF] glow-text-cyan">GLOBAL</span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-2 text-base sm:text-xl text-slate-300 font-medium tracking-wide">
          Asesoramiento Integral en Trámites Migratorios, Residencia y Ciudadanía
        </p>

        {/* Legal Authority Subtext */}
        <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
          Especialistas colegiados en Derecho de Extranjería, Nómadas Digitales, Arraigo y Homologaciones internacionales. Gestión telemática directa con Oficinas Consulares y Delegaciones de Gobierno.
        </p>

        {/* Interactive 3D Orbit Selector: Click to rotate globe to destination */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          {Object.keys(hubDetails).map((hub) => (
            <button
              key={hub}
              onClick={() => onSelectHub(hub)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                selectedHub === hub
                  ? 'bg-gradient-to-r from-cyan-400 to-[#00B4D8] text-slate-950 font-bold shadow-[0_0_15px_rgba(0,245,255,0.5)] scale-105'
                  : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {hub}
            </button>
          ))}
        </div>

        {/* Active Corridor 3D Telemetry HUD */}
        <div className="mt-2 text-[11px] text-cyan-300/90 font-mono flex items-center justify-center gap-3">
          <span className="flex items-center gap-1 text-[#00F5FF]">
            <Activity className="w-3 h-3 text-[#00F5FF]" />
            <span>{activeHubInfo.coords}</span>
          </span>
          <span className="text-slate-600">·</span>
          <span>{activeHubInfo.corridor}</span>
          <span className="text-slate-600">·</span>
          <span className="text-[#FFD700] font-semibold">{activeHubInfo.time}</span>
        </div>
      </div>

      {/* CENTRAL AREA: 100% CLEAN AND UNOBSTRUCTED VIEW OF THE 3D MOTION GRAPHICS GLOBE AND CYBER WAVE */}
      <div className="flex-1 my-auto pointer-events-none flex items-center justify-center">
        {/* Subtle holographic coordinates indication */}
        <div className="text-[10px] text-cyan-400/30 tracking-widest uppercase font-mono pointer-events-none select-none">
          Espacio 3D Interactivo · Arrastra para Orbitar
        </div>
      </div>

      {/* Bottom Floating Control Strip - Kept low and refined */}
      <div className="max-w-5xl mx-auto w-full pointer-events-auto">
        <div className={`transition-all duration-500 ${minimalMode ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100'}`}>
          {/* Main Action Bar */}
          <div className="p-3 sm:p-4 rounded-2xl glass-panel shadow-[0_10px_35px_rgba(0,0,0,0.5)] border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Quick Proof Metrics */}
            <div className="flex items-center gap-6 sm:gap-8 px-2 text-left">
              <div>
                <span className="block text-lg sm:text-xl font-bold text-[#FFD700] font-heading tabular-nums glow-text-gold">
                  99.4%
                </span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Resoluciones Favorables
                </span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="block text-lg sm:text-xl font-bold text-white font-heading tabular-nums">
                  +18.500
                </span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Expedientes Gestionados
                </span>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block" />
              <div className="hidden sm:block">
                <span className="block text-lg sm:text-xl font-bold text-[#00F5FF] font-heading tabular-nums glow-text-cyan">
                  32 Países
                </span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Corredores Consulares
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => onSelectTab('servicios')}
                className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/60 transition-all text-center whitespace-nowrap"
              >
                Ver Servicios
              </button>

              <button
                onClick={() => onSelectTab('citas')}
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-[#00B4D8] text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Cita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenAlex}
                className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#00F5FF] hover:bg-cyan-500/10 border border-cyan-400/40 transition-all flex items-center gap-1.5"
                title="Consultar con Alex"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                <span className="hidden sm:inline">Asistente Alex</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action strip below: Minimal view toggle & Explore scroll indicator */}
        <div className="flex items-center justify-center gap-4 mt-3 pointer-events-auto">
          <button
            onClick={() => setMinimalMode(!minimalMode)}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 hover:text-cyan-300 hover:border-cyan-800 transition-colors backdrop-blur-sm"
          >
            {minimalMode ? (
              <>
                <Eye className="w-3 h-3 text-[#00F5FF]" />
                <span>Restaurar Panel de Información</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3 text-slate-400" />
                <span>Modo Cine 3D (Despejar Vista)</span>
              </>
            )}
          </button>

          {onScrollToExplore && !minimalMode && (
            <button
              onClick={onScrollToExplore}
              className="hidden sm:flex items-center gap-1 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-[11px] text-cyan-300 hover:text-white transition-colors animate-bounce"
            >
              <span>Explorar Plataforma</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
