
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useCreateAppointment, AppointmentFormData as ApiFormData } from '@/hooks/useCreateAppointment';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Doctor } from '@/types';

// Schéma de validation avec Zod
const appointmentFormSchema = z.object({
  patientFirstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  patientLastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  patientEmail: z.string().email('Email invalide'),
  patientPhone: z.string().min(10, 'Numéro de téléphone invalide'),
  reason: z.string().min(5, 'Veuillez indiquer un motif de consultation'),
  notes: z.string().optional(),
});

// Type pour les données du formulaire
type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

interface AppointmentFormProps {
  doctorId: number;
  doctor?: Doctor;
  selectedDate?: Date;
  onSuccess?: () => void;
  onCancel?: () => void;
  locale?: 'fr' | 'en';
}

const AppointmentForm = ({
  doctorId,
  doctor,
  selectedDate,
  onSuccess,
  onCancel,
  locale = 'fr',
}: AppointmentFormProps) => {
  const dateLocale = locale === 'fr' ? fr : enUS;
  const createAppointment = useCreateAppointment();
  
  // Initialiser le formulaire avec React Hook Form
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patientFirstName: '',
      patientLastName: '',
      patientEmail: '',
      patientPhone: '',
      reason: '',
      notes: '',
    },
  });

  // Vérifier si une date est sélectionnée
  const hasSelectedDate = !!selectedDate;
  
  // Formatter la date et l'heure pour l'affichage
  const formattedDate = selectedDate
    ? format(selectedDate, 'EEEE d MMMM yyyy', { locale: dateLocale })
    : '';
  
  const formattedTime = selectedDate
    ? format(selectedDate, 'HH:mm', { locale: dateLocale })
    : '';

  // Soumettre le formulaire
  const onSubmit = (data: AppointmentFormValues) => {
    if (!selectedDate || !doctorId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un médecin et une date",
        variant: "destructive",
      });
      return;
    }

    // Préparer les données pour l'API
    const appointmentData = {
      doctorId,
      date: selectedDate,
      startTime: format(selectedDate, 'HH:mm'),
      ...data,
    };

    // Créer le rendez-vous avec les données correctement typées
    const fullAppointmentData: ApiFormData = {
      doctorId: appointmentData.doctorId,
      date: appointmentData.date,
      startTime: appointmentData.startTime,
      patientFirstName: data.patientFirstName,
      patientLastName: data.patientLastName,
      patientEmail: data.patientEmail,
      patientPhone: data.patientPhone,
      reason: data.reason,
      notes: data.notes
    };
    
    createAppointment.mutate(fullAppointmentData, {
      onSuccess: () => {
        form.reset();
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>
          {locale === 'fr' ? 'Prendre rendez-vous' : 'Book appointment'}
        </CardTitle>
        <CardDescription>
          {doctor && (
            <span>
              {locale === 'fr' ? 'avec ' : 'with '}
              <strong>Dr. {doctor.lastName} {doctor.firstName}</strong>
              {doctor.specialty && ` (${doctor.specialty.name})`}
            </span>
          )}
          {selectedDate && (
            <div className="mt-2 font-medium">
              {locale === 'fr' ? 'Le ' : 'On '} 
              {formattedDate} {locale === 'fr' ? 'à ' : 'at '} 
              {formattedTime}
            </div>
          )}
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                {locale === 'fr' ? 'Informations patient' : 'Patient information'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="patientFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {locale === 'fr' ? 'Prénom' : 'First name'}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {locale === 'fr' ? 'Nom' : 'Last name'}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="patientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {locale === 'fr' ? 'Téléphone' : 'Phone'}
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                {locale === 'fr' ? 'Détails du rendez-vous' : 'Appointment details'}
              </h3>
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {locale === 'fr' ? 'Motif de consultation' : 'Reason for visit'}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {locale === 'fr' ? 'Notes additionnelles' : 'Additional notes'}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={3} 
                        placeholder={
                          locale === 'fr' 
                            ? 'Informations supplémentaires pour le médecin' 
                            : 'Additional information for the doctor'
                        } 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </Button>
            <Button 
              type="submit" 
              disabled={!hasSelectedDate || createAppointment.isPending}
              className="bg-medical-teal hover:bg-medical-dark text-white"
            >
              {createAppointment.isPending
                ? (locale === 'fr' ? 'Traitement...' : 'Processing...')
                : (locale === 'fr' ? 'Confirmer le rendez-vous' : 'Confirm appointment')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AppointmentForm;
