import React, { useState } from 'react';
import { Expediente, ExpedienteDocument } from '../types';
import { 
  ShieldCheck, FileText, UploadCloud, CheckCircle, Clock, 
  AlertCircle, Download, Eye, FileUp, Sparkles, Send, 
  ExternalLink, UserCheck, ShieldAlert, Check
} from 'lucide-react';

interface ClientDashboardProps {
  expediente: Expediente;
  onUploadDocument: (doc: Omit<ExpedienteDocument, 'id' | 'uploadDate'>) => void;
  onOpenChatWithLawyer: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  expediente,
  onUploadDocument,
  onOpenChatWithLawyer,
}) => {
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Tasas');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [activeReceiptModal, setActiveReceiptModal] = useState(false);

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName && !selectedFile) return;

    const docName = newDocName || selectedFile?.name || 'Documento Aportado';
    const sizeStr = selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB';

    onUploadDocument({
      name: docName,
      category: newDocCategory,
      status: 'En revisión',
      size: sizeStr,
      fileType: 'PDF'
    });

    setNewDocName('');
    setSelectedFile(null);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const getStatusBadge = (status: ExpedienteDocument['status']) => {
    switch (status) {
      case 'Aprobado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>Validado</span>
          </span>
        );
      case 'En revisión':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>En Revisión</span>
          </span>
        );
      case 'Pendiente':
      case 'Requerido':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            <span>Pendiente</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner / Dossier Header */}
      <div className="glass-panel-gold rounded-2xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.6)] border border-[#FFD700]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-md text-[11px] font-mono font-bold bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40">
                {expediente.id}
              </span>
              <span className="text-xs text-slate-400">
                Sede Electrónica de Extranjería
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-2">
              {expediente.caseType}
            </h2>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300">
              <span>Titular: <strong className="text-white">{expediente.clientName}</strong></span>
              <span className="text-slate-600">·</span>
              <span>Pasaporte: <strong className="font-mono text-cyan-300">{expediente.passportNumber}</strong></span>
              <span className="text-slate-600">·</span>
              <span>País Destino: <strong className="text-white">{expediente.destinationCountry}</strong></span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveReceiptModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/90 text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan-400 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#00F5FF]" />
              <span>Ver Resguardo Oficial</span>
            </button>

            <button
              onClick={onOpenChatWithLawyer}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Contactar Letrado</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
              Estado Actual: <span className="text-[#00F5FF]">{expediente.currentPhase}</span>
            </span>
            <span className="font-bold text-[#FFD700] tabular-nums font-mono text-sm">
              {expediente.progressPercentage}%
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-[#00B4D8] to-[#FFD700] rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(0,245,255,0.5)]"
              style={{ width: `${expediente.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Milestones Timeline + Document Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline of Milestones (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00F5FF]" />
              <span>Cronología del Expediente</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              5 Fases Procedimentales
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {expediente.milestones.map((milestone, idx) => {
              const isCompleted = milestone.status === 'completed';
              const isCurrent = milestone.status === 'current';

              return (
                <div key={idx} className="relative">
                  {/* Timeline bullet */}
                  <div
                    className={`absolute -left-[27px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                        : isCurrent
                        ? 'bg-[#00F5FF] border-cyan-200 shadow-[0_0_12px_#00F5FF] animate-pulse'
                        : 'bg-slate-900 border-slate-700'
                    }`}
                  >
                    {isCompleted && <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-xs font-bold ${
                        isCurrent ? 'text-[#00F5FF]' : isCompleted ? 'text-white' : 'text-slate-400'
                      }`}>
                        {milestone.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {milestone.date}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assigned Lawyer Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Letrado Responsable del Caso
            </span>
            <div className="flex items-center gap-3">
              <img
                src={expediente.assignedLawyer.avatar}
                alt={expediente.assignedLawyer.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD700]/70"
              />
              <div>
                <h4 className="text-xs font-bold text-white">
                  {expediente.assignedLawyer.name}
                </h4>
                <p className="text-[11px] text-[#FFD700]">
                  {expediente.assignedLawyer.role}
                </p>
                <p className="text-[10px] text-slate-400">
                  {expediente.assignedLawyer.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Document Vault & Dropzone (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Document list */}
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FFD700]" />
                <span>Bóveda Documental del Expediente</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                {expediente.documents.length} Archivos Custodiados
              </span>
            </div>

            <div className="space-y-2.5">
              {expediente.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-900/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-[#00F5FF] shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white leading-tight">
                        {doc.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <span>{doc.category}</span>
                        <span>·</span>
                        <span>{doc.size}</span>
                        <span>·</span>
                        <span>Subido: {doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {getStatusBadge(doc.status)}
                    <button
                      onClick={() => alert(`Visualizando documento: ${doc.name}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Ver documento"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload New Document Dropzone */}
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2 mb-3">
              <UploadCloud className="w-4 h-4 text-[#00F5FF]" />
              <span>Aportar Nueva Documentación / Subsanación</span>
            </h3>

            {uploadSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Documento recibido con éxito y puesto a disposición de la asesoría letrada.</span>
              </div>
            )}

            <form onSubmit={handleDocumentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Descripción del Documento
                  </label>
                  <input
                    type="text"
                    required
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    placeholder="Ej. Justificante de abono tasa 790"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Categoría
                  </label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Tasas">Tasas y Comprobantes de Pago</option>
                    <option value="Identidad">Identidad y Pasaporte</option>
                    <option value="Laboral">Laboral y Seguridad Social</option>
                    <option value="Legal">Certificados y Legalizaciones</option>
                    <option value="Integración">Integración e Informes Municipales</option>
                  </select>
                </div>
              </div>

              {/* Dropzone Area */}
              <div className="border-2 border-dashed border-cyan-800/60 hover:border-cyan-400/80 rounded-xl p-5 text-center transition-colors bg-slate-950/40 cursor-pointer">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                      if (!newDocName) setNewDocName(e.target.files[0].name);
                    }
                  }}
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <FileUp className="w-7 h-7 mx-auto text-[#00F5FF] mb-1.5" />
                  <span className="text-xs font-semibold text-slate-200 block">
                    {selectedFile ? selectedFile.name : 'Arrastra o haz clic para subir tu archivo (PDF, JPG, PNG)'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Máximo 25 MB por archivo · Encriptación AES-256 en reposo
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-cyan-500/20 text-[#00F5FF] hover:bg-cyan-500/30 border border-cyan-400/50 transition-colors flex items-center justify-center gap-1.5"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Incorporar Archivo al Expediente</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Official Receipt Modal */}
      {activeReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl p-6 rounded-2xl glass-panel border border-[#FFD700]/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
                <h3 className="text-base font-bold text-white font-heading">
                  Acuse de Registro y Resguardo Oficial
                </h3>
              </div>
              <button
                onClick={() => setActiveReceiptModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>ORGANISMO:</span>
                <span className="text-white">MINISTERIO DE POLÍTICA TERRITORIAL</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Nº ENTRADA REGISTRO:</span>
                <span className="text-[#FFD700]">REGAGE26e0004918294</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>FECHA Y HORA:</span>
                <span className="text-white">14/02/2026 10:42:15 CET</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>INTERESADO:</span>
                <span className="text-cyan-300">ALEJANDRO MORALES SERRANO</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CSV (CÓDIGO VERIFICACIÓN):</span>
                <span className="text-slate-300">CSV-991A-F820-B881-2026</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Este resguardo acredita la válida interposición del procedimiento ante la Oficina de Extranjería. Mantiene la estancia legal provisional del interesado durante la sustanciación del expediente.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveReceiptModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  alert('Descargando copia certificada con firma electrónica avanzada...');
                  setActiveReceiptModal(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FFD700] text-slate-950 hover:bg-yellow-400 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar PDF Firmado</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
