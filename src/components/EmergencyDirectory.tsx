import React, { useState } from 'react';
import { CONSULATE_DIRECTORY } from '../data/mockData';
import { 
  PhoneCall, MapPin, Mail, Clock, Search, 
  ShieldAlert, ExternalLink, Globe, AlertTriangle, CheckCircle 
} from 'lucide-react';

export const EmergencyDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Todos');
  const [emergencySubmitted, setEmergencySubmitted] = useState(false);
  const [urgentPhone, setUrgentPhone] = useState('');
  const [urgentLocation, setUrgentLocation] = useState('Aeropuerto Madrid-Barajas T4');
  const [urgentDetails, setUrgentDetails] = useState('');

  const countries = ['Todos', 'España (Nacional)', 'Colombia', 'México', 'Argentina', 'Estados Unidos', 'Chile', 'Perú', 'Reino Unido'];

  const filteredConsulates = CONSULATE_DIRECTORY.filter((con) => {
    const matchCountry = selectedCountry === 'Todos' || con.country === selectedCountry;
    const matchQuery =
      con.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      con.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      con.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      con.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCountry && matchQuery;
  });

  const handleUrgentEmergencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urgentPhone) return;
    setEmergencySubmitted(true);
    setTimeout(() => setEmergencySubmitted(false), 5000);
    setUrgentPhone('');
    setUrgentDetails('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#00F5FF]">
          Red Consular y Asistencia Legal Inmediata
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mt-2">
          Directorio de Contactos Prioritarios y Emergencias
        </h2>
        <p className="mt-3 text-sm text-slate-300">
          Líneas de emergencia consular, asistencia en puestos fronterizos y delegaciones diplomáticas acreditadas. Guardia letrada 24/7 disponible para incidencias urgentes.
        </p>
      </div>

      {/* 24/7 Urgent Legal Defense Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-2 border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.15)] bg-gradient-to-r from-rose-950/30 via-[#0B132B] to-slate-900/60">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/30 text-rose-300 border border-rose-500/40">
                  Guardia de Urgencia 24 Horas
                </span>
                <span className="text-xs text-slate-400">
                  Inadmisiones en Frontera & Detenciones
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-heading mt-1">
                ¿Necesitas asistencia letrada inmediata en aeropuerto o comisaría?
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Nuestros abogados de guardia se personan en un plazo máximo de 60 minutos en los puestos fronterizos de Madrid-Barajas, Barcelona-El Prat y comisarías de extranjería.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <a
              href="tel:+34900839210"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Llamar Guardia 900 839 210</span>
            </a>
          </div>
        </div>

        {/* Rapid Alert Form for border incidents */}
        <div className="mt-6 pt-6 border-t border-rose-950/80">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Notificación Telemática de Urgencia al Letrado de Guardia</span>
          </h4>

          {emergencySubmitted ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Aviso transmitido al abogado de guardia con éxito. Te llamaremos en menos de 5 minutos.</span>
            </div>
          ) : (
            <form onSubmit={handleUrgentEmergencySubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <input
                  type="tel"
                  required
                  placeholder="Tu teléfono con código país (+34...)"
                  value={urgentPhone}
                  onChange={(e) => setUrgentPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  type="text"
                  placeholder="Lugar (ej. Barajas T4, Sala de Inadmitidos)"
                  value={urgentLocation}
                  onChange={(e) => setUrgentLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                />
              </div>
              <div className="sm:col-span-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/50 hover:border-rose-400 transition-colors"
                >
                  Activar Abogado de Guardia
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-cyan-500/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por ciudad, embajada o país..."
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Country Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCountry === country
                  ? 'bg-cyan-500/20 text-[#00F5FF] border border-cyan-400/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConsulates.map((con) => (
          <div
            key={con.id}
            className={`rounded-2xl p-5 glass-panel transition-all duration-300 flex flex-col justify-between space-y-4 ${
              con.isPriorityHotline
                ? 'border-2 border-[#FFD700]/50 shadow-[0_0_20px_rgba(255,215,0,0.15)]'
                : 'border border-cyan-500/20 hover:border-cyan-400/50 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00F5FF]">
                    {con.country} · {con.city}
                  </span>
                  <h4 className="text-sm font-bold text-white font-heading mt-0.5">
                    {con.institution}
                  </h4>
                </div>
                {con.isPriorityHotline && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 shrink-0">
                    Sede Central
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{con.address}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{con.hours}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Jurisdicción: {con.jurisdiction}</span>
                </div>
              </div>
            </div>

            {/* Direct Telephone and Contact Buttons */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <a
                href={`tel:${con.emergencyPhone.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-rose-400" />
                  <span>Urgencias 24h:</span>
                </span>
                <span className="font-mono">{con.emergencyPhone}</span>
              </a>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <a
                  href={`tel:${con.generalPhone.replace(/\s+/g, '')}`}
                  className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-center transition-colors truncate"
                  title="Teléfono general"
                >
                  {con.generalPhone}
                </a>

                <a
                  href={`mailto:${con.email}`}
                  className="py-1.5 px-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/50 text-center transition-colors truncate flex items-center justify-center gap-1"
                  title="Enviar correo"
                >
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
