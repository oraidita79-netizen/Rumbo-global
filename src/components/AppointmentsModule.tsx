import React, { useState } from 'react';
import { Appointment } from '../types';
import { AVAILABLE_TIME_SLOTS } from '../data/mockData';
import { 
  Calendar as CalendarIcon, Clock, Video, Building2, 
  CheckCircle2, XCircle, AlertCircle, ArrowRight, 
  Download, RefreshCw, Plus, ChevronLeft, ChevronRight, User
} from 'lucide-react';

interface AppointmentsModuleProps {
  appointments: Appointment[];
  onBookAppointment: (appointment: Omit<Appointment, 'id' | 'bookingCode' | 'status'>) => void;
  onCancelAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string, newDate: string, newSlot: string) => void;
}

export const AppointmentsModule: React.FC<AppointmentsModuleProps> = ({
  appointments,
  onBookAppointment,
  onCancelAppointment,
  onRescheduleAppointment,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-03-25');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:30 - 12:15');
  const [modality, setModality] = useState<'Videoconferencia Telemática' | 'Presencial en Sede Central'>('Videoconferencia Telemática');
  const [specialty, setSpecialty] = useState('Autorización de Residencia por Arraigo Social');
  const [clientName, setClientName] = useState('Alejandro Morales Serrano');
  const [email, setEmail] = useState('alejandro.morales@gmail.com');
  const [phone, setPhone] = useState('+34 612 894 102');
  const [notes, setNotes] = useState('');
  const [bookingSuccessCode, setBookingSuccessCode] = useState<string | null>(null);

  // Rescheduling modal state
  const [rescheduleModalId, setRescheduleModalId] = useState<string | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState('2026-04-02');
  const [newRescheduleSlot, setNewRescheduleSlot] = useState('16:00 - 16:45');

  // Interactive mini-calendar days (March 2026)
  const currentMonthYear = 'Marzo 2026';
  const daysInMonth = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-03-${dayNum.toString().padStart(2, '0')}`;
    const dayOfWeek = new Date(2026, 2, dayNum).getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isPast = dayNum < 15;
    return {
      day: dayNum,
      dateStr,
      isAvailable: !isWeekend && !isPast,
      isWeekend
    };
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email || !selectedDate || !selectedTimeSlot) return;

    onBookAppointment({
      clientName,
      email,
      phone,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      modality,
      specialty,
      notes: notes || 'Consulta migratoria integral programada vía portal web.'
    });

    const code = `RG-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingSuccessCode(code);
  };

  const handleDownloadICS = (appt: Appointment) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rumbo Global//Citas Migratorias//ES
BEGIN:VEVENT
SUMMARY:Cita Asesoría Migratoria - ${appt.specialty}
DESCRIPTION:Rumbo Global: ${appt.modality}. Código de reserva: ${appt.bookingCode}.
LOCATION:${appt.modality === 'Presencial en Sede Central' ? 'Paseo de la Castellana 95, Planta 18, Madrid' : 'Videoconferencia Telemática'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Cita_${appt.bookingCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header section */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#00F5FF]">
          Gestión de Citas y Audiencias Jurídicas
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mt-2">
          Reserva tu Consulta Migratoria Personalizada
        </h2>
        <p className="mt-3 text-sm text-slate-300">
          Agenda una sesión telemática o presencial con nuestros abogados expertos en Derecho de Extranjería. Diagnóstico exhaustivo de viabilidad para tu expediente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Booking Wizard */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {bookingSuccessCode ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-heading">
                ¡Cita Confirmada con Éxito!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Hemos reservado tu cita para el <strong className="text-white">{selectedDate}</strong> a las <strong className="text-white">{selectedTimeSlot}</strong> ({modality}).
              </p>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 inline-block font-mono text-sm text-[#FFD700]">
                Código de Reserva: <span className="font-bold">{bookingSuccessCode}</span>
              </div>
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setBookingSuccessCode(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#00F5FF] text-slate-950 hover:bg-cyan-300 transition-colors"
                >
                  Agendar Otra Cita
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Step 1: Modality Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                  1. Modalidad de la Consulta
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setModality('Videoconferencia Telemática')}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      modality === 'Videoconferencia Telemática'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,245,255,0.2)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Video className="w-5 h-5 text-[#00F5FF] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-semibold text-white">
                        Videoconferencia Telemática
                      </span>
                      <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                        Canal cifrado punto a punto. Asesórate desde cualquier país.
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModality('Presencial en Sede Central')}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      modality === 'Presencial en Sede Central'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,245,255,0.2)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-semibold text-white">
                        Presencial en Sede Central
                      </span>
                      <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                        Paseo de la Castellana 95, Planta 18, Madrid.
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Specialty Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  2. Tipo de Trámite o Especialidad Jurídica
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Autorización de Residencia por Arraigo Social">Autorización de Residencia por Arraigo Social</option>
                  <option value="Visado y Residencia para Nómadas Digitales (Ley Startups)">Visado y Residencia para Nómadas Digitales (Ley Startups)</option>
                  <option value="Nacionalidad Española por Residencia">Nacionalidad Española por Residencia</option>
                  <option value="Residencia Temporal No Lucrativa">Residencia Temporal No Lucrativa</option>
                  <option value="Reagrupación Familiar y Tarjeta Comunitaria">Reagrupación Familiar y Tarjeta Comunitaria</option>
                  <option value="Homologación de Títulos Universitarios">Homologación de Títulos Universitarios</option>
                  <option value="Recurso Contencioso o Apelación de Extranjería">Recurso Contencioso o Apelación de Extranjería</option>
                </select>
              </div>

              {/* Step 3: Interactive Date Picker Calendar Grid */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    3. Selecciona la Fecha ({currentMonthYear})
                  </label>
                  <span className="text-[11px] text-cyan-400 font-medium">
                    Fecha elegida: {selectedDate}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 uppercase font-semibold mb-2">
                    <span>Dom</span>
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mié</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sáb</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {daysInMonth.map((d) => {
                      const isSelected = selectedDate === d.dateStr;
                      return (
                        <button
                          type="button"
                          key={d.day}
                          disabled={!d.isAvailable}
                          onClick={() => setSelectedDate(d.dateStr)}
                          className={`h-9 rounded-lg text-xs font-medium transition-all flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#00F5FF] text-slate-950 font-bold shadow-[0_0_10px_#00F5FF]'
                              : d.isAvailable
                              ? 'bg-slate-800/80 text-white hover:bg-cyan-950 hover:text-cyan-300'
                              : 'text-slate-600 bg-transparent cursor-not-allowed opacity-40'
                          }`}
                        >
                          {d.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 4: Time Slot Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  4. Franja Horaria Disponible (Horario de Madrid, CET)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                          isSelected
                            ? 'bg-[#00F5FF]/20 border-cyan-400 text-[#00F5FF] font-semibold'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 5: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Teléfono Móvil (WhatsApp para recordatorio de cita)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-[#00B4D8] text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Confirmar y Reservar Cita Jurídica</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Existing Scheduled Appointments List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00F5FF]" />
                <span>Mis Citas Programadas ({appointments.length})</span>
              </h3>
            </div>

            {appointments.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No tienes citas pendientes agendadas.
              </div>
            ) : (
              <div className="space-y-3.5">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-900/60 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-[#FFD700] block">
                          {appt.bookingCode}
                        </span>
                        <h4 className="text-xs font-bold text-white mt-0.5">
                          {appt.specialty}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        appt.status === 'Confirmada'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {appt.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{appt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{appt.timeSlot}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      {appt.modality.includes('Video') ? (
                        <Video className="w-3.5 h-3.5 text-cyan-400" />
                      ) : (
                        <Building2 className="w-3.5 h-3.5 text-[#FFD700]" />
                      )}
                      <span>{appt.modality}</span>
                    </p>

                    {/* Action buttons */}
                    <div className="pt-2 flex items-center gap-2 border-t border-slate-800/80">
                      <button
                        onClick={() => handleDownloadICS(appt)}
                        className="flex-1 py-1.5 px-2 rounded-lg text-[10px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-1"
                        title="Guardar en Google / Apple Calendar"
                      >
                        <Download className="w-3 h-3 text-[#00F5FF]" />
                        <span>Calendario (.ics)</span>
                      </button>

                      <button
                        onClick={() => {
                          setRescheduleModalId(appt.id);
                          setNewRescheduleDate(appt.date);
                          setNewRescheduleSlot(appt.timeSlot);
                        }}
                        className="py-1.5 px-2.5 rounded-lg text-[10px] font-medium bg-cyan-950/60 border border-cyan-800 text-cyan-300 hover:bg-cyan-900 transition-colors flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reprogramar</span>
                      </button>

                      <button
                        onClick={() => onCancelAppointment(appt.id)}
                        className="p-1.5 rounded-lg text-[10px] text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                        title="Cancelar cita"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Legal Note Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <span className="font-semibold text-slate-200 block flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#FFD700]" />
              Garantía de Cero Espera Consular
            </span>
            <p className="leading-relaxed text-[11px]">
              Nuestras consultas telemáticas incluyen revisión documental en vivo. Si presentas tu expediente con Rumbo Global, el coste de la consulta previa se deduce íntegramente de los honorarios de tramitación.
            </p>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl glass-panel border border-cyan-400/50 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-heading">
              Reprogramar Cita
            </h3>
            <p className="text-xs text-slate-300">
              Selecciona una nueva fecha y franja horaria para tu consulta jurídica.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                  Nueva Fecha
                </label>
                <input
                  type="date"
                  value={newRescheduleDate}
                  min="2026-03-15"
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                  Nueva Franja Horaria
                </label>
                <select
                  value={newRescheduleSlot}
                  onChange={(e) => setNewRescheduleSlot(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {AVAILABLE_TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setRescheduleModalId(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={() => {
                  onRescheduleAppointment(rescheduleModalId, newRescheduleDate, newRescheduleSlot);
                  setRescheduleModalId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#00F5FF] text-slate-950 hover:bg-cyan-300 transition-colors"
              >
                Confirmar Cambio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
