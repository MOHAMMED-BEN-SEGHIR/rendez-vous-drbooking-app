
// Types pour les médecins
export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialtyId: number;
  specialty: Specialty;
  imageUrl?: string;
  // Propriétés additionnelles nécessaires
  name?: string; // Pour la rétrocompatibilité
  rating?: number;
  reviewCount?: number;
  location?: string;
  gender?: 'male' | 'female';
  hasAvailability?: boolean;
}

// Types pour les spécialités
export interface Specialty {
  id: number;
  name: string;
  description?: string;
}

// Types pour les disponibilités
export interface Availability {
  id: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Types pour les rendez-vous
export interface Appointment {
  id?: number;
  doctorId: number;
  patientId?: number;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  reason?: string;
  notes?: string;
}

// Type pour le formulaire de création de rendez-vous
export interface AppointmentFormData {
  doctorId: number;
  date: Date;
  startTime: string;
  reason: string;
  patientFirstName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
}

// Type pour les options de sélection (utilisé avec react-select)
export interface SelectOption {
  value: string | number;
  label: string;
}
