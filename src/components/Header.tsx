import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { Globe, User, Calendar, Menu, X, Shield, PhoneCall } from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenAuth,
  isLoggedIn,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: NavigationTab; label: string }[] = [
    { tab: 'inicio', label: 'Inicio' },
    { tab: 'servicios', label: 'Servicios' },
    { tab: 'recursos', label: 'Recursos' },
    { tab: 'citas', label: 'Citas' },
    { tab: 'contacto', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-900/30 bg-[#0B132B]/85 backdrop-blur-md transition-all">
      {/* Micro ticker / Legal trust bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 border-b border-cyan-950/50 text-[11px] text-cyan-200/70 tracking-wide font-sans">
        <div className="flex items-center gap-3">
          <span className="text-[#FFD700] font-medium tracking-wider">RUMBO GLOBAL</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">ASESORAMIENTO INTEGRAL EN TRÁMITES MIGRATORIOS</span>
          <span className="text-slate-500">·</span>
          <span className="text-cyan-400 font-normal">TU FUTURO, CONECTADO Y SEGURO</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            Guardia Letrada Activa 24/7
          </span>
          <span className="text-slate-600">/</span>
          <a href="tel:+34900839210" className="flex items-center gap-1 hover:text-[#00F5FF] transition-colors">
            <PhoneCall className="w-3 h-3 text-[#00F5FF]" />
            <span>900 839 210</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <button 
          onClick={() => { onSelectTab('inicio'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 text-left group shrink-0 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-900/40 border border-cyan-400/40 flex items-center justify-center text-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.2)] group-hover:border-cyan-300 transition-all">
            <Globe className="w-5 h-5 text-[#00F5FF] group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white font-heading block group-hover:text-cyan-300 transition-colors">
              RUMBO <span className="text-[#00F5FF]">GLOBAL</span>
            </span>
            <span className="text-[10px] tracking-widest text-[#FFD700] uppercase block font-medium">
              Asesoría Migratoria
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`transition-colors whitespace-nowrap py-1 relative focus:outline-none ${
                  isActive
                    ? 'text-[#00F5FF] font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F5FF] shadow-[0_0_8px_#00F5FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Auth & Client Portal CTA */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectTab('perfil')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all ${
                  currentTab === 'perfil'
                    ? 'bg-cyan-500/20 text-[#00F5FF] border border-cyan-400/50 shadow-[0_0_15px_rgba(0,245,255,0.25)]'
                    : 'bg-slate-900/60 text-slate-200 border border-slate-700/60 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Mi Expediente</span>
              </button>
              <button
                onClick={onLogout}
                className="px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                title="Cerrar sesión"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Registro
              </button>
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-[#00F5FF]/10 to-cyan-500/20 text-[#00F5FF] border border-[#00F5FF]/50 hover:bg-[#00F5FF]/20 hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-[#00F5FF]" />
                <span>Iniciar Sesión</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cyan-900/40 bg-[#0B132B]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  onSelectTab(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentTab === item.tab
                    ? 'text-[#00F5FF] bg-cyan-950/40 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    onSelectTab('perfil');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase bg-cyan-500/20 text-[#00F5FF] border border-cyan-400/50"
                >
                  <Shield className="w-4 h-4 text-[#FFD700]" />
                  <span>Ver Mi Expediente</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs text-slate-400 text-center"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuth('register');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-lg text-xs font-medium text-slate-300 border border-slate-700 bg-slate-900/60 text-center"
                >
                  Registro
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-lg text-xs font-semibold text-[#00F5FF] border border-[#00F5FF]/50 bg-[#00F5FF]/10 text-center"
                >
                  Iniciar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
