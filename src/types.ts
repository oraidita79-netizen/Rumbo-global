export type NavigationTab = 
  | 'inicio' 
  | 'servicios' 
  | 'recursos' 
  | 'citas' 
  | 'contacto' 
  | 'perfil';

export interface ExpedienteDocument {
  id: string;
  name: string;
  category: string;
  status: 'Aprobado' | 'En revisión' | 'Pendiente' | 'Requerido';
  uploadDate: string;
  size: string;
  fileType: string;
}

export interface ExpedienteMilestone {
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
}

export interface Expediente {
  id: string;
  clientName: string;
  passportNumber: string;
  caseType: string;
  destinationCountry: string;
  assignedLawyer: {
    name: string;
    role: string;
    email: string;
    avatar: string;
  };
  progressPercentage: number;
  currentPhase: string;
  submissionDate: string;
  estimatedResolutionDate: string;
  documents: ExpedienteDocument[];
  milestones: ExpedienteMilestone[];
  notes: string[];
}

export interface Appointment {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  modality: 'Videoconferencia Telemática' | 'Presencial en Sede Central';
  specialty: string;
  status: 'Confirmada' | 'Reprogramada' | 'Completada' | 'Cancelada';
  bookingCode: string;
  notes?: string;
}

export interface ConsulateContact {
  id: string;
  country: string;
  city: string;
  institution: string;
  emergencyPhone: string;
  generalPhone: string;
  email: string;
  address: string;
  hours: string;
  jurisdiction: string;
  isPriorityHotline?: boolean;
}

export interface MigrationService {
  id: string;
  title: string;
  category: 'Residencia' | 'Nacionalidad' | 'Visados' | 'Homologación' | 'Urgencias';
  description: string;
  processingTime: string;
  legalRequirements: string[];
  governmentFee: string;
  officialEntity: string;
  popular?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'alex' | 'user' | 'lawyer';
  text: string;
  timestamp: string;
  actionPayload?: {
    type: 'navigate' | 'open_appointment' | 'open_login' | 'call_emergency';
    tab?: NavigationTab;
    label: string;
  };
}
