import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('alejandro.morales@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alejandro Morales Serrano');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
    onClose();
  };

  const handleDemoLogin = () => {
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[#00F5FF] mb-3 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">
            {mode === 'login' ? 'Acceso al Área de Cliente' : 'Registro de Nuevo Expediente'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Plataforma Segura Cifrada · Rumbo Global
          </p>
        </div>

        {/* Quick Demo Login Pill */}
        <div className="mb-5 p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-[#00F5FF]/30 text-center">
          <span className="text-[10px] uppercase font-bold text-[#FFD700] block mb-1">
            Acceso Rápido de Prueba (Demo)
          </span>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-[#00F5FF] text-slate-950 hover:bg-cyan-300 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Entrar con Expediente Demo (EXP-84291)</span>
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0B132B] px-2 text-slate-500 text-[10px]">
              O con tus credenciales
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Nombre y Apellidos
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-[#00B4D8] text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all mt-2"
          >
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta y Abrir Expediente'}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mt-5 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              ¿Aún no tienes expediente asignado?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-[#00F5FF] font-semibold hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          ) : (
            <p>
              ¿Ya eres cliente de Rumbo Global?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#00F5FF] font-semibold hover:underline"
              >
                Inicia sesión aquí
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
