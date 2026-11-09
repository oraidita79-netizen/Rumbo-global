import { Expediente, Appointment, ConsulateContact, MigrationService } from '../types';

export const INITIAL_EXPEDIENTE: Expediente = {
  id: 'EXP-2026-RG-84291',
  clientName: 'Alejandro Morales Serrano',
  passportNumber: 'PA9283741',
  caseType: 'Autorización de Residencia por Arraigo Social',
  destinationCountry: 'España',
  assignedLawyer: {
    name: 'Lic. Elena Valenzuela',
    role: 'Colegiada ICAM Nº 89.412 - Dcho. Extranjería',
    email: 'e.valenzuela@rumboglobal.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  progressPercentage: 65,
  currentPhase: 'Fase 3: Revisión Jurídica y Cotejo Consular',
  submissionDate: '14 de Febrero, 2026',
  estimatedResolutionDate: '28 de Mayo, 2026',
  documents: [
    {
      id: 'doc-1',
      name: 'Pasaporte Completo (Todas las hojas selladas)',
      category: 'Identidad',
      status: 'Aprobado',
      uploadDate: '15/02/2026',
      size: '14.2 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-2',
      name: 'Certificado de Antecedentes Penales con Apostilla de La Haya',
      category: 'Legal',
      status: 'Aprobado',
      uploadDate: '18/02/2026',
      size: '3.8 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-3',
      name: 'Precontrato Laboral Indefinido (Jornada completa)',
      category: 'Laboral',
      status: 'En revisión',
      uploadDate: '26/02/2026',
      size: '2.1 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-4',
      name: 'Informe de Inserción Social Emitido por Ayuntamiento',
      category: 'Integración',
      status: 'En revisión',
      uploadDate: '02/03/2026',
      size: '4.5 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-5',
      name: 'Certificado Histórico de Empadronamiento Continuado (3 años)',
      category: 'Acreditación',
      status: 'Aprobado',
      uploadDate: '16/02/2026',
      size: '1.9 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-6',
      name: 'Comprobante de Pago Tasa 790 Código 052',
      category: 'Tasas',
      status: 'Pendiente',
      uploadDate: '-',
      size: '-',
      fileType: 'PDF'
    }
  ],
  milestones: [
    {
      title: 'Apertura de Expediente y Auditoría Previa',
      description: 'Análisis de viabilidad jurídica y asignación de letrado especialista.',
      date: '14 Feb 2026',
      status: 'completed'
    },
    {
      title: 'Compilación y Validación de Documentos',
      description: 'Cotejo de legalizaciones consulares y apostillas notariales.',
      date: '28 Feb 2026',
      status: 'completed'
    },
    {
      title: 'Revisión Jurídica y Cotejo Consular',
      description: 'Filtro técnico de solidez antes del registro telemático Mercurio.',
      date: 'En curso (Marzo 2026)',
      status: 'current'
    },
    {
      title: 'Presentación Oficial Telemática en Extranjería',
      description: 'Generación del resguardo oficial con número de entrada registral.',
      date: 'Previsto: 18 Mar 2026',
      status: 'pending'
    },
    {
      title: 'Resolución Favorable y Expedición de TIE',
      description: 'Notificación DEHú, toma de huellas dactilares y entrega de tarjeta.',
      date: 'Previsto: Mayo 2026',
      status: 'pending'
    }
  ],
  notes: [
    'Documento de antecedentes penales validado correctamente con vigencia de 6 meses.',
    'Pendiente recepción del comprobante de tasa administrativa abonada en entidad bancaria.',
    'El informe municipal de inserción social presenta valoración altamente favorable.'
  ]
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'CIT-2026-001',
    clientName: 'Alejandro Morales Serrano',
    email: 'alejandro.morales@gmail.com',
    phone: '+34 612 894 102',
    date: '2026-03-24',
    timeSlot: '11:30 - 12:15',
    modality: 'Videoconferencia Telemática',
    specialty: 'Arraigo Social y Cotejo Documental',
    status: 'Confirmada',
    bookingCode: 'RG-CONF-9842',
    notes: 'Revisión previa a la presentación telemática por plataforma Mercurio.'
  },
  {
    id: 'CIT-2026-002',
    clientName: 'Alejandro Morales Serrano',
    email: 'alejandro.morales@gmail.com',
    phone: '+34 612 894 102',
    date: '2026-04-10',
    timeSlot: '16:00 - 16:45',
    modality: 'Presencial en Sede Central',
    specialty: 'Firma de Apoderamiento Apud Acta',
    status: 'Confirmada',
    bookingCode: 'RG-CONF-4177',
    notes: 'Sede Madrid: Paseo de la Castellana 95, Planta 18.'
  }
];

export const MIGRATION_SERVICES: MigrationService[] = [
  {
    id: 'srv-1',
    title: 'Autorización de Residencia por Arraigo Social',
    category: 'Residencia',
    description: 'Vía legal para regularizar la estancia continuada en España por más de 3 años, con precontrato laboral e informe de inserción social.',
    processingTime: '2 a 4 meses',
    legalRequirements: [
      'Permanencia continuada mínima de 3 años (empadronamiento histórico sin ausencias >120 días)',
      'Carecer de antecedentes penales en España y en países de residencia de los últimos 5 años',
      'Contrato de trabajo firmado mínimo de 30 horas semanales',
      'Informe favorable de inserción social de la Comunidad Autónoma'
    ],
    governmentFee: 'Tasa 790-052 (~38,28 €)',
    officialEntity: 'Oficina de Extranjería / Ministerio de Política Territorial',
    popular: true
  },
  {
    id: 'srv-2',
    title: 'Visado y Residencia para Nómadas Digitales (Ley Startups)',
    category: 'Visados',
    description: 'Permiso de residencia de hasta 3 años para profesionales y teletrabajadores internacionales con régimen fiscal especial favorable (Beckham).',
    processingTime: '20 días hábiles (silencio administrativo positivo)',
    legalRequirements: [
      'Graduados universitarios o con mínimo 3 años de experiencia acreditada en su sector',
      'Trabajo en remoto para empresas ubicadas fuera de España con más de 1 año de antigüedad',
      'Acreditar ingresos económicos mensuales equivalentes al 200% del SMI (~2.700 €/mes)',
      'Seguro médico privado con cobertura completa en territorio español'
    ],
    governmentFee: 'Tasa 790-038 (~73,26 €)',
    officialEntity: 'UGE-CE (Unidad de Grandes Empresas y Colectivos Estratégicos)',
    popular: true
  },
  {
    id: 'srv-3',
    title: 'Nacionalidad Española por Residencia',
    category: 'Nacionalidad',
    description: 'Adquisición de la ciudadanía española con pasaporte de la Unión Europea para ciudadanos iberoamericanos a partir de 2 años de residencia legal continuada.',
    processingTime: '4 a 9 meses (vía telemática con recurso contencioso)',
    legalRequirements: [
      '2 años de residencia legal continuada para nacionales de países iberoamericanos, Andorra, Filipinas o Guinea Ecuatorial',
      'Superación de las pruebas CCSE (conocimientos constitucionales y socioculturales) del Instituto Cervantes',
      'Certificados de nacimiento y antecedentes penales debidamente legalizados y apostillados',
      'Buena conducta cívica e integración probada'
    ],
    governmentFee: 'Tasa 790-026 (~104,05 €)',
    officialEntity: 'Ministerio de Justicia / Dirección General de Seguridad Jurídica y Fe Pública',
    popular: true
  },
  {
    id: 'srv-4',
    title: 'Residencia Temporal No Lucrativa',
    category: 'Residencia',
    description: 'Autorización para residir en España sin realizar actividades laborales o profesionales, acreditando solvencia económica suficiente.',
    processingTime: '1 a 3 meses',
    legalRequirements: [
      'Disponer de fondos económicos mínimos equivalentes al 400% del IPREM anual (~28.800 € para el titular principal)',
      'Seguro médico privado sin copagos suscrito con entidad aseguradora autorizada en España',
      'Certificado médico oficial de no padecer enfermedades que comprometan la salud pública',
      'Certificado de antecedentes penales apostillado de los últimos 5 años'
    ],
    governmentFee: 'Tasa de Visado Consular (~80,00 €) + Tasa 790-052',
    officialEntity: 'Consulado General de España en origen',
    popular: false
  },
  {
    id: 'srv-5',
    title: 'Reagrupación Familiar y Tarjeta de Familiar de Comunitario',
    category: 'Residencia',
    description: 'Derecho a residir y trabajar para cónyuges, parejas de hecho registradas, hijos y ascendientes directos a cargo de ciudadanos de la UE.',
    processingTime: '1 a 2 meses',
    legalRequirements: [
      'Vínculo de parentesco acreditado y legalizado (partidas de matrimonio, libro de familia o certificados de nacimiento)',
      'Disponibilidad de vivienda adecuada (en régimen general) o medios económicos suficientes de la persona de la UE',
      'Acreditación de vivir a cargo en caso de ascendientes mayores de 65 años o descendientes mayores de 21 años'
    ],
    governmentFee: 'Tasa 790-012 (~12,00 €)',
    officialEntity: 'Delegación de Gobierno / Comisaría General de Extranjería',
    popular: true
  },
  {
    id: 'srv-6',
    title: 'Homologación y Convalidación de Títulos Universitarios',
    category: 'Homologación',
    description: 'Reconocimiento oficial de títulos extranjeros de educación superior para el ejercicio de profesiones reguladas o equivalencias de grado académico.',
    processingTime: '6 a 12 meses',
    legalRequirements: [
      'Título original apostillado o legalizado por vía diplomática',
      'Certificación académica de los estudios cursados con desglose de asignaturas, carga horaria y créditos',
      'Traducción jurada oficial en lengua castellana si el idioma original no es el español',
      'Acreditación de competencia lingüística nivel B2 en castellano (si procede)'
    ],
    governmentFee: 'Tasa 079 (~166,50 €)',
    officialEntity: 'Ministerio de Ciencia, Innovación y Universidades',
    popular: false
  }
];

export const CONSULATE_DIRECTORY: ConsulateContact[] = [
  {
    id: 'con-urg-1',
    country: 'España (Nacional)',
    city: 'Madrid / Central',
    institution: 'Línea de Emergencia y Guardia Jurídica Rumbo Global 24/7',
    emergencyPhone: '+34 900 839 210',
    generalPhone: '+34 910 782 400',
    email: 'urgencias@rumboglobal.com',
    address: 'Paseo de la Castellana 95, Planta 18, 28046 Madrid',
    hours: '24 horas / 365 días (Atención letrada ininterrumpida)',
    jurisdiction: 'Nacional e Internacional',
    isPriorityHotline: true
  },
  {
    id: 'con-col-1',
    country: 'Colombia',
    city: 'Bogotá',
    institution: 'Consulado General de España en Bogotá',
    emergencyPhone: '+57 310 211 4410',
    generalPhone: '+57 601 742 8111',
    email: 'cog.bogota@maec.es',
    address: 'Calle 94A Nº 11A-70, Bogotá D.C.',
    hours: 'Lunes a Viernes de 08:30 a 14:00',
    jurisdiction: 'República de Colombia'
  },
  {
    id: 'con-mex-1',
    country: 'México',
    city: 'Ciudad de México',
    institution: 'Consulado General de España en México D.F.',
    emergencyPhone: '+52 55 4246 8421',
    generalPhone: '+52 55 5280 4508',
    email: 'cog.mexico@maec.es',
    address: 'Galileo 114 (esq. Horacio), Colonia Polanco, Miguel Hidalgo, 11560 CDMX',
    hours: 'Lunes a Viernes de 08:30 a 14:30',
    jurisdiction: 'Estados Unidos Mexicanos'
  },
  {
    id: 'con-arg-1',
    country: 'Argentina',
    city: 'Buenos Aires',
    institution: 'Consulado General de España en Buenos Aires',
    emergencyPhone: '+54 9 11 4050 2000',
    generalPhone: '+54 11 4814 9100',
    email: 'cog.buenosaires@maec.es',
    address: 'Calle Guido 1770, C1016AAE Ciudad Autónoma de Buenos Aires',
    hours: 'Lunes a Viernes de 08:30 a 13:30',
    jurisdiction: 'CABA y Provincias Limítrofes'
  },
  {
    id: 'con-usa-1',
    country: 'Estados Unidos',
    city: 'Miami',
    institution: 'Consulado General de España en Miami',
    emergencyPhone: '+1 305 790 1851',
    generalPhone: '+1 305 446 5511',
    email: 'cog.miami@maec.es',
    address: '2655 Le Jeune Rd, Suite 203, Coral Gables, FL 33134',
    hours: 'Lunes a Viernes de 09:00 a 14:00',
    jurisdiction: 'Florida, Georgia y Carolina del Sur'
  },
  {
    id: 'con-chl-1',
    country: 'Chile',
    city: 'Santiago',
    institution: 'Consulado General de España en Santiago de Chile',
    emergencyPhone: '+56 9 9249 2861',
    generalPhone: '+56 2 2263 5400',
    email: 'cog.santiagodechile@maec.es',
    address: 'Av. Nueva Providencia 2353, Piso 9, Providencia, Región Metropolitana',
    hours: 'Lunes a Viernes de 08:30 a 13:30',
    jurisdiction: 'República de Chile'
  },
  {
    id: 'con-per-1',
    country: 'Perú',
    city: 'Lima',
    institution: 'Consulado General de España en Lima',
    emergencyPhone: '+51 997 580 839',
    generalPhone: '+51 1 513 7930',
    email: 'cog.lima@maec.es',
    address: 'Calle Los Pinos 490, San Isidro, Lima 15073',
    hours: 'Lunes a Viernes de 08:30 a 13:30',
    jurisdiction: 'República del Perú'
  },
  {
    id: 'con-uk-1',
    country: 'Reino Unido',
    city: 'Londres',
    institution: 'Consulado General de España en Londres',
    emergencyPhone: '+44 7789 382 011',
    generalPhone: '+44 20 7589 8989',
    email: 'cog.londres@maec.es',
    address: '20 Draycott Place, Chelsea, London SW3 2RZ',
    hours: 'Lunes a Viernes de 09:00 a 14:00',
    jurisdiction: 'Inglaterra y Gales'
  }
];

export const AVAILABLE_TIME_SLOTS = [
  '09:30 - 10:15',
  '10:30 - 11:15',
  '11:30 - 12:15',
  '12:30 - 13:15',
  '16:00 - 16:45',
  '17:00 - 17:45',
  '18:00 - 18:45'
];

export const GLOBAL_HUBS = [
  { name: 'Madrid', lat: 40.4168, lng: -3.7038, country: 'España', role: 'Sede Central Europa' },
  { name: 'Barcelona', lat: 41.3851, lng: 2.1734, country: 'España', role: 'Oficina Regional' },
  { name: 'Bogotá', lat: 4.7110, lng: -74.0721, country: 'Colombia', role: 'Hub Andino' },
  { name: 'Ciudad de México', lat: 19.4326, lng: -99.1332, country: 'México', role: 'Hub Norte & Centroamérica' },
  { name: 'Buenos Aires', lat: -34.6037, lng: -58.3816, country: 'Argentina', role: 'Hub Cono Sur' },
  { name: 'Miami', lat: 25.7617, lng: -80.1918, country: 'EE.UU.', role: 'Liaison USA' },
  { name: 'Santiago', lat: -33.4489, lng: -70.6693, country: 'Chile', role: 'Corredor Pacífico' },
  { name: 'Lima', lat: -12.0464, lng: -77.0428, country: 'Perú', role: 'Corredor Andino' },
  { name: 'Londres', lat: 51.5074, lng: -0.1278, country: 'UK', role: 'Liaison Británico' },
  { name: 'París', lat: 48.8566, lng: 2.3522, country: 'Francia', role: 'Enlace UE' }
];
