
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { mockAPI } from '../mockData';
import { toast } from '@/components/ui/use-toast';

// Types pour le formulaire et l'API
export interface AppointmentFormData {
  doctorId: number;
  date: Date;
  startTime: string;
  patientFirstName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
  notes?: string;
}

// Type pour l'API
interface AppointmentApiData {
  doctorId: number;
  startTime: string;
  endTime: string;
  patientFirstName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
  notes?: string;
  status: 'scheduled';
}

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AppointmentFormData) => {
      // Transformer les données du formulaire en données d'API
      const appointmentData: AppointmentApiData = {
        doctorId: data.doctorId,
        startTime: `${data.date.toISOString().split('T')[0]}T${data.startTime}`,
        // Calculer l'heure de fin (par exemple, rendez-vous de 30 minutes)
        endTime: calculateEndTime(data.date, data.startTime),
        patientFirstName: data.patientFirstName,
        patientLastName: data.patientLastName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        status: 'scheduled',
        reason: data.reason,
        notes: data.notes,
      };

      // En environnement de production, utiliser l'API réelle
      // return await api.post<AppointmentApiData>('/appointments', appointmentData);
      
      // Pour la démonstration, utiliser les données mockées
      return await mockAPI.createAppointment(appointmentData);
    },
    onSuccess: () => {
      // Invalider les requêtes pour forcer un rafraîchissement
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['availabilities'] });
      
      // Afficher une notification de succès
      toast({
        title: "Rendez-vous confirmé",
        description: "Votre rendez-vous a été enregistré avec succès",
      });
    },
    onError: (error) => {
      // Afficher une notification d'erreur
      toast({
        title: "Erreur",
        description: "Impossible de créer le rendez-vous. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error('Appointment creation error:', error);
    },
  });
};

// Fonction utilitaire pour calculer l'heure de fin (rendez-vous de 30 minutes par défaut)
const calculateEndTime = (date: Date, startTime: string): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endDate = new Date(date);
  endDate.setHours(hours);
  endDate.setMinutes(minutes + 30);
  
  return endDate.toISOString();
};
