import React, { useState, useEffect, useRef } from 'react';
import { NavigationTab, ChatMessage } from '../types';
import { 
  Volume2, VolumeX, MessageSquare, X, Send, 
  Sparkles, Calendar, Shield, PhoneCall, BookOpen, 
  UserCheck, RefreshCw, ChevronUp, ChevronDown 
} from 'lucide-react';

interface AlexAssistantProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  isLoggedIn: boolean;
  isOpen: boolean;
  onToggleOpen: () => void;
}

const ALEX_AVATAR_PATH = '/src/assets/images/alex_avatar_1794218994419.jpg';

export const AlexAssistant: React.FC<AlexAssistantProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  isLoggedIn,
  isOpen,
  onToggleOpen,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'alex',
      text: '¡Hola! Te doy la bienvenida a Rumbo Global. Soy Alex, tu asistente virtual. ¿En qué te puedo ayudar hoy? Puedo guiarte con tus trámites migratorios, ayudarte a reservar una cita o darte acceso a tu perfil.',
      timestamp: 'Ahora'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [chatMode, setChatMode] = useState<'alex' | 'lawyer'>('alex');
  const [isTyping, setIsTyping] = useState(false);
  const [minimizedBubble, setMinimizedBubble] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Text-To-Speech Synthesis function
  const speakText = (text: string) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith('es') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Monica') || v.name.includes('Jorge')));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Welcome speech on first interaction or opening
  useEffect(() => {
    // We don't autoplay unprompted to respect browser audio policies, but speak when opened
    if (isOpen && messages.length === 1 && audioEnabled) {
      // Gentle speak after a tiny delay
      const timer = setTimeout(() => {
        speakText(messages[0].text);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Exact conversational logic & scripted flows
  const processUserQuery = (userText: string) => {
    const textLower = userText.toLowerCase().trim();

    // Check Flow 1: Gestión de Citas
    if (
      textLower.includes('cita') || 
      textLower.includes('agendar') || 
      textLower.includes('consulta') || 
      textLower.includes('calendario') ||
      textLower.includes('reservar')
    ) {
      return {
        reply: '¡Perfecto! Puedo ayudarte a agendar una cita con nuestros asesores. Por favor, selecciona en el calendario el día y la hora que mejor te convengan, o haz clic en la sección \'Citas\' del menú superior.',
        action: {
          type: 'open_appointment' as const,
          tab: 'citas' as NavigationTab,
          label: 'Ir a Gestión de Citas'
        }
      };
    }

    // Check Flow 2: Trámites e Información Legal
    if (
      textLower.includes('trámite') || 
      textLower.includes('tramite') || 
      textLower.includes('visado') || 
      textLower.includes('residencia') || 
      textLower.includes('arraigo') || 
      textLower.includes('nómada') || 
      textLower.includes('nomada') || 
      textLower.includes('requisito') ||
      textLower.includes('homologación') ||
      textLower.includes('homologacion') ||
      textLower.includes('nacionalidad')
    ) {
      return {
        reply: 'Con gusto. En nuestra sección de \'Recursos y Servicios\' encontrarás las guías paso a paso sobre visados, residencia, homologación de títulos y permisos de trabajo. ¿Hay algún trámite en específico sobre el que necesites orientación?',
        action: {
          type: 'navigate' as const,
          tab: 'servicios' as NavigationTab,
          label: 'Explorar Catálogo de Servicios'
        }
      };
    }

    // Check Flow 3: Área de Cliente y Expediente
    if (
      textLower.includes('expediente') || 
      textLower.includes('perfil') || 
      textLower.includes('estado') || 
      textLower.includes('documento') || 
      textLower.includes('papeles') ||
      textLower.includes('avance')
    ) {
      if (isLoggedIn) {
        return {
          reply: 'Tu expediente está activo y autenticado. Puedes revisar el avance de tus solicitudes y subir documentos pendientes directamente en tu área privada.',
          action: {
            type: 'navigate' as const,
            tab: 'perfil' as NavigationTab,
            label: 'Ver Mi Expediente (EXP-84291)'
          }
        };
      } else {
        return {
          reply: 'Para revisar tus documentos y el avance de tus solicitudes, debes iniciar sesión. Haz clic en el botón \'Iniciar Sesión\' situado en la esquina superior derecha.',
          action: {
            type: 'open_login' as const,
            label: 'Iniciar Sesión en Área de Cliente'
          }
        };
      }
    }

    // Check Flow 4: Contacto de Emergencia y Soporte Humano
    if (
      textLower.includes('persona') || 
      textLower.includes('humano') || 
      textLower.includes('abogado') || 
      textLower.includes('asesor') || 
      textLower.includes('teléfono') || 
      textLower.includes('telefono') || 
      textLower.includes('emergencia') || 
      textLower.includes('consulado') ||
      textLower.includes('ayuda')
    ) {
      return {
        reply: 'Si necesitas atención directa, puedes abrir nuestra ventana de \'Chat en Vivo\' o consultar la pestaña \'Contacto\' para ver las líneas telefónicas prioritarias y direcciones de consulados.',
        action: {
          type: 'navigate' as const,
          tab: 'contacto' as NavigationTab,
          label: 'Ver Directorio y Teléfonos de Emergencia'
        }
      };
    }

    // Respuesta de Reserva (Ante dudas ambiguas)
    return {
      reply: 'Entiendo. Para darte la mejor orientación posible, puedes escribir tu duda en el chat en vivo o seleccionar una de las opciones del menú principal. Estoy aquí para lo que necesites.',
      action: {
        type: 'navigate' as const,
        tab: 'servicios' as NavigationTab,
        label: 'Consultar Guía de Servicios'
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Ahora'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulate short natural typing delay
    setTimeout(() => {
      setIsTyping(false);

      if (chatMode === 'lawyer') {
        const lawyerReply: ChatMessage = {
          id: `law-${Date.now()}`,
          sender: 'lawyer',
          text: `Hola, soy la Lic. Elena Valenzuela. He recibido tu consulta: "${text}". Nuestros letrados revisan la documentación oficial para garantizar la presentación sin requerimientos. Puedes dejarme los detalles o coordinar una sesión privada.`,
          timestamp: 'Ahora',
          actionPayload: {
            type: 'open_appointment',
            tab: 'citas',
            label: 'Reservar sesión con Lic. Valenzuela'
          }
        };
        setMessages(prev => [...prev, lawyerReply]);
        if (audioEnabled) speakText(lawyerReply.text);
      } else {
        const responseData = processUserQuery(text);
        const alexReply: ChatMessage = {
          id: `alex-${Date.now()}`,
          sender: 'alex',
          text: responseData.reply,
          timestamp: 'Ahora',
          actionPayload: responseData.action
        };
        setMessages(prev => [...prev, alexReply]);
        if (audioEnabled) speakText(responseData.reply);
      }
    }, 700);
  };

  const handleQuickPrompt = (query: string) => {
    handleSendMessage(query);
  };

  const executeAction = (action?: ChatMessage['actionPayload']) => {
    if (!action) return;
    if (action.type === 'navigate' && action.tab) {
      onNavigate(action.tab);
    } else if (action.type === 'open_appointment') {
      onNavigate('citas');
    } else if (action.type === 'open_login') {
      onOpenAuth('login');
    } else if (action.type === 'call_emergency') {
      onNavigate('contacto');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
      {/* Live Chat Window Drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[540px] max-h-[82vh] mb-3.5 rounded-2xl glass-panel shadow-[0_15px_50px_rgba(0,0,0,0.7)] border border-cyan-400/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-4 py-3 bg-[#0B132B]/95 border-b border-cyan-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={ALEX_AVATAR_PATH}
                  alt="Alex Asistente Virtual"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#00F5FF]/70 shadow-[0_0_12px_rgba(0,245,255,0.4)]"
                  onError={(e) => {
                    // Fallback to avatar container if needed
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0B132B]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-sm text-white">Alex</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-[#00F5FF] border border-cyan-500/30 font-medium">
                    Asistente IA
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {chatMode === 'alex' ? 'Rumbo Global · Guía Multimodal' : 'Lic. Elena Valenzuela · Letrada de Guardia'}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5 text-slate-300">
              {/* TTS Mute Toggle */}
              <button
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setAudioEnabled(!audioEnabled);
                }}
                className={`p-1.5 rounded-lg border transition-all ${
                  audioEnabled 
                    ? 'text-[#00F5FF] border-cyan-500/40 bg-cyan-950/40' 
                    : 'text-slate-500 border-slate-800 hover:text-slate-300'
                }`}
                title={audioEnabled ? 'Voz activada (Click para silenciar)' : 'Voz desactivada (Click para activar TTS)'}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={onToggleOpen}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Switcher: Alex IA vs Asesor Jurídico en Directo */}
          <div className="px-3 py-2 bg-slate-950/70 border-b border-cyan-950 flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Canal de atención:</span>
            <div className="flex items-center p-0.5 bg-slate-900 rounded-lg border border-slate-800">
              <button
                onClick={() => setChatMode('alex')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  chatMode === 'alex'
                    ? 'bg-[#00F5FF]/20 text-[#00F5FF] font-semibold border border-[#00F5FF]/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Alex (IA)
              </button>
              <button
                onClick={() => setChatMode('lawyer')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  chatMode === 'lawyer'
                    ? 'bg-[#FFD700]/20 text-[#FFD700] font-semibold border border-[#FFD700]/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Asesor Humano
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isAlex = msg.sender === 'alex';
              const isLawyer = msg.sender === 'lawyer';
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[88%]">
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5 border border-cyan-400/40">
                        <img 
                          src={isLawyer ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80' : ALEX_AVATAR_PATH} 
                          alt="Avatar" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <div>
                      <div
                        className={`p-3 rounded-2xl leading-relaxed ${
                          isUser
                            ? 'bg-[#00F5FF]/20 text-white rounded-br-none border border-cyan-400/30'
                            : isLawyer
                            ? 'bg-amber-950/40 text-amber-100 rounded-bl-none border border-amber-500/30'
                            : 'bg-slate-900/90 text-slate-100 rounded-bl-none border border-slate-700/60 shadow-sm'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Interactive Direct Action Button */}
                        {msg.actionPayload && (
                          <div className="mt-2.5 pt-2 border-t border-slate-700/50">
                            <button
                              onClick={() => executeAction(msg.actionPayload)}
                              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#00F5FF] text-slate-950 hover:bg-cyan-300 transition-colors shadow-sm"
                            >
                              <span>{msg.actionPayload.label}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Message meta with audio replay button */}
                      <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-500">
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <button
                            onClick={() => speakText(msg.text)}
                            className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                            title="Escuchar mensaje"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Escuchar</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-cyan-400/30">
                  <img src={ALEX_AVATAR_PATH} alt="Alex" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/90 rounded-bl-none border border-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:200ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:400ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Flow Suggestion Pills (Guion Oficial) */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            <button
              onClick={() => handleQuickPrompt('Quiero pedir una cita')}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[10px] whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <Calendar className="w-2.5 h-2.5 text-[#00F5FF]" />
              <span>Pedir una cita</span>
            </button>
            <button
              onClick={() => handleQuickPrompt('Información sobre trámites')}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[10px] whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-2.5 h-2.5 text-[#FFD700]" />
              <span>Trámites y requisitos</span>
            </button>
            <button
              onClick={() => handleQuickPrompt('Ver mi expediente')}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[10px] whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <Shield className="w-2.5 h-2.5 text-cyan-400" />
              <span>Ver mi expediente</span>
            </button>
            <button
              onClick={() => handleQuickPrompt('Hablar con una persona')}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[10px] whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-2.5 h-2.5 text-emerald-400" />
              <span>Hablar con persona</span>
            </button>
          </div>

          {/* Input field */}
          <div className="p-3 bg-[#0B132B] border-t border-cyan-900/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu consulta migratoria a Alex..."
                className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-[#00B4D8] text-slate-950 disabled:opacity-40 hover:brightness-110 transition-all focus:outline-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Interactive Avatar Pill / Orb (Always visible in bottom-right) */}
      <div className="flex items-center gap-3">
        {/* Callout preview bubble if chat closed */}
        {!isOpen && (
          <div 
            onClick={onToggleOpen}
            className="cursor-pointer max-w-[240px] hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl glass-panel border border-cyan-400/40 text-xs text-slate-200 hover:text-white hover:border-cyan-300 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="truncate">
              <span className="font-semibold text-[#00F5FF]">Alex: </span>
              <span className="text-slate-300 text-[11px]">¿Necesitas ayuda con tu trámite?</span>
            </div>
          </div>
        )}

        {/* Master Avatar Button */}
        <button
          onClick={onToggleOpen}
          className="relative group p-1 rounded-full focus:outline-none"
          aria-label="Abrir asistente virtual Alex"
        >
          {/* Animated audio wave or cyber pulse */}
          <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-[#FFD700] opacity-70 blur-sm group-hover:opacity-100 transition-opacity ${
            isSpeaking ? 'animate-ping' : 'animate-pulse'
          }`} />

          {/* Avatar frame */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.5)] bg-[#0B132B]">
            <img
              src={ALEX_AVATAR_PATH}
              alt="Alex Avatar"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Live voice wave indicator */}
            {isSpeaking && (
              <div className="absolute inset-x-0 bottom-0 py-0.5 bg-[#00F5FF]/80 backdrop-blur-xs flex items-center justify-center gap-0.5">
                <span className="w-0.5 h-2 bg-slate-950 animate-bounce" />
                <span className="w-0.5 h-3 bg-slate-950 animate-bounce [animation-delay:150ms]" />
                <span className="w-0.5 h-1.5 bg-slate-950 animate-bounce [animation-delay:300ms]" />
              </div>
            )}
          </div>

          {/* Active status pip */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0B132B] shadow-sm" />
        </button>
      </div>
    </div>
  );
};
