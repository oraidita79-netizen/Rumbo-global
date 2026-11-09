/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavigationTab, Expediente, Appointment, ExpedienteDocument } from './types';
import { INITIAL_EXPEDIENTE, INITIAL_APPOINTMENTS } from './data/mockData';
import { ThreeMotionGraphicsScene } from './components/ThreeMotionGraphicsScene';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ReaddyShowcaseSections } from './components/ReaddyShowcaseSections';
import { AlexAssistant } from './components/AlexAssistant';
import { AppointmentsModule } from './components/AppointmentsModule';
import { ClientDashboard } from './components/ClientDashboard';
import { EmergencyDirectory } from './components/EmergencyDirectory';
import { ServicesModule } from './components/ServicesModule';
import { ResourcesModule } from './components/ResourcesModule';
import { AuthModal } from './components/AuthModal';
import { Globe, Shield, Scale, PhoneCall, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('inicio');
  const [selectedHub, setSelectedHub] = useState('Madrid');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expediente, setExpediente] = useState<Expediente>(INITIAL_EXPEDIENTE);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [isAlexOpen, setIsAlexOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const exploreSectionRef = useRef<HTMLDivElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleScrollToExplore = () => {
    exploreSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Appointment handlers
  const handleBookAppointment = (data: Omit<Appointment, 'id' | 'bookingCode' | 'status'>) => {
    const newId = `CIT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newCode = `RG-CONF-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      ...data,
      id: newId,
      bookingCode: newCode,
      status: 'Confirmada'
    };
    setAppointments(prev => [newAppointment, ...prev]);
    showToast(`¡Cita reservada correctamente con código ${newCode}!`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    showToast('Cita cancelada con éxito.');
  };

  const handleRescheduleAppointment = (id: string, newDate: string, newSlot: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          date: newDate,
          timeSlot: newSlot,
          status: 'Reprogramada'
        };
      }
      return a;
    }));
    showToast('Cita reprogramada con éxito.');
  };

  // Document upload handler
  const handleUploadDocument = (doc: Omit<ExpedienteDocument, 'id' | 'uploadDate'>) => {
    const newDoc: ExpedienteDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toLocaleDateString('es-ES')
    };
    setExpediente(prev => ({
      ...prev,
      documents: [newDoc, ...prev.documents]
    }));
    showToast('Documento incorporado a tu expediente y en revisión letrada.');
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentTab('perfil');
    showToast(`Bienvenido, ${expediente.clientName}. Sesión iniciada con éxito.`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentTab('inicio');
    showToast('Sesión cerrada con éxito.');
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setCurrentTab('citas');
    showToast(`Iniciando cita para: ${serviceTitle}`);
  };

  const handleAskAlex = (query: string) => {
    setIsAlexOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col relative selection:bg-[#00F5FF]/30 selection:text-white">
      {/* 3D Motion Graphics Canvas Scene with real 3D depth, undulating cyber wave & bezier corridors */}
      <ThreeMotionGraphicsScene 
        selectedHubName={selectedHub}
        onSelectHub={setSelectedHub}
        interactive={currentTab === 'inicio'} 
      />

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl glass-panel-gold border border-[#FFD700]/50 text-[#FFD700] text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-300">
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAuth={handleOpenAuth}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="flex-1 relative z-10">
        {currentTab === 'inicio' && (
          <div className="space-y-8">
            <HeroSection
              onSelectTab={setCurrentTab}
              onOpenAlex={() => setIsAlexOpen(true)}
              onScrollToExplore={handleScrollToExplore}
              selectedHub={selectedHub}
              onSelectHub={setSelectedHub}
            />

            {/* Seamless Readdy AI Showcase Stream */}
            <div ref={exploreSectionRef} className="relative z-10">
              <ReaddyShowcaseSections
                onGoToAppointments={() => setCurrentTab('citas')}
                onGoToServices={() => setCurrentTab('servicios')}
                onAskAlex={handleAskAlex}
              />
            </div>
          </div>
        )}

        {currentTab === 'servicios' && (
          <ServicesModule
            onSelectServiceForBooking={handleSelectServiceForBooking}
            onAskAlex={handleAskAlex}
          />
        )}

        {currentTab === 'recursos' && (
          <ResourcesModule
            onGoToAppointments={() => setCurrentTab('citas')}
            onAskAlex={handleAskAlex}
          />
        )}

        {currentTab === 'citas' && (
          <AppointmentsModule
            appointments={appointments}
            onBookAppointment={handleBookAppointment}
            onCancelAppointment={handleCancelAppointment}
            onRescheduleAppointment={handleRescheduleAppointment}
          />
        )}

        {currentTab === 'contacto' && (
          <EmergencyDirectory />
        )}

        {currentTab === 'perfil' && (
          <ClientDashboard
            expediente={expediente}
            onUploadDocument={handleUploadDocument}
            onOpenChatWithLawyer={() => {
              setIsAlexOpen(true);
            }}
          />
        )}
      </main>

      {/* Multimodal Virtual Assistant Alex (Voice TTS + Active Chat) */}
      <AlexAssistant
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onOpenAuth={handleOpenAuth}
        isLoggedIn={isLoggedIn}
        isOpen={isAlexOpen}
        onToggleOpen={() => setIsAlexOpen(!isAlexOpen)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal(prev => ({ ...prev, isOpen: false }))}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Corporate Footer */}
      <footer className="relative z-10 border-t border-cyan-950/60 bg-[#0B132B]/90 backdrop-blur-md py-8 px-4 sm:px-8 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white font-heading tracking-tight">
              RUMBO <span className="text-[#00F5FF]">GLOBAL</span>
            </span>
            <span className="text-slate-600">·</span>
            <span>Asesoramiento Integral en Trámites Migratorios</span>
            <span className="text-slate-600">·</span>
            <span className="text-[#FFD700]">Tu futuro, conectado y seguro</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400">
            <span>Sede Central: Paseo de la Castellana 95, Madrid</span>
            <span>·</span>
            <span>Aviso Legal y Privacidad RGPD</span>
            <span>·</span>
            <span>© 2026 Rumbo Global S.L.P.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
