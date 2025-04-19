
import { useState } from 'react';
import { useDoctor } from '@/hooks/useDoctors';
import DoctorSelect from '@/components/DoctorSelect';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentCalendarSimple from '@/components/AppointmentCalendarSimple';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const AppointmentsPage = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [activeTab, setActiveTab] = useState<string>('select');
  
  // Récupérer les informations du médecin sélectionné
  const { data: doctor } = useDoctor(selectedDoctorId || 0);

  // Gérer la sélection d'un médecin
  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctorId(doctorId);
    setActiveTab('calendar');
  };

  // Gérer la sélection d'une date/heure
  const handleTimeSelect = (date: Date) => {
    setSelectedDate(date);
    setActiveTab('form');
  };

  // Gérer l'annulation du formulaire
  const handleCancel = () => {
    setActiveTab('calendar');
  };

  // Gérer le succès de la création d'un rendez-vous
  const handleSuccess = () => {
    setSelectedDate(undefined);
    setSelectedDoctorId(undefined);
    setActiveTab('select');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Prise de Rendez-vous Médical
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sélectionnez un médecin, choisissez un créneau disponible et remplissez le formulaire pour confirmer votre rendez-vous.
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger 
            value="select" 
            className="flex items-center gap-2"
            data-active={activeTab === 'select'}
          >
            <span className="hidden sm:inline">1.</span> Choisir un médecin
          </TabsTrigger>
          <TabsTrigger 
            value="calendar" 
            disabled={!selectedDoctorId}
            className="flex items-center gap-2" 
            data-active={activeTab === 'calendar'}
          >
            <span className="hidden sm:inline">2.</span> Sélectionner un créneau
          </TabsTrigger>
          <TabsTrigger 
            value="form" 
            disabled={!selectedDate}
            className="flex items-center gap-2"
            data-active={activeTab === 'form'}
          >
            <span className="hidden sm:inline">3.</span> Confirmer le rendez-vous
          </TabsTrigger>
        </TabsList>

        <TabsContent value="select" className="mt-6">
          <Card className="p-6 shadow-md">
            <DoctorSelect 
              onDoctorSelect={handleDoctorSelect} 
              selectedDoctorId={selectedDoctorId} 
            />
            
            {selectedDoctorId && (
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setActiveTab('calendar')}
                  className="bg-medical-teal hover:bg-medical-dark text-white"
                >
                  Suivant
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          {selectedDoctorId && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('select')}
                >
                  Retour
                </Button>
                
                {doctor && (
                  <div className="text-center">
                    <h2 className="text-xl font-medium">
                      Dr. {doctor.lastName} {doctor.firstName}
                    </h2>
                    {doctor.specialty && (
                      <p className="text-sm text-gray-600">{doctor.specialty.name}</p>
                    )}
                  </div>
                )}
                
                <div className="invisible">Espace</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-medical-teal" />
                  <h3 className="text-lg font-medium">
                    Sélectionnez une date et un créneau disponible
                  </h3>
                </div>
                
                <div className="mb-6 text-sm text-gray-600">
                  Cliquez sur un créneau disponible dans le calendrier
                </div>
                
                {/* Calendrier simplifié des disponibilités */}
                <div className="p-4">
                  {selectedDoctorId && (
                    <AppointmentCalendarSimple
                      doctorId={selectedDoctorId}
                      onTimeSelect={handleTimeSelect}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="form" className="mt-6">
          {selectedDoctorId && selectedDate && (
            <AppointmentForm 
              doctorId={selectedDoctorId}
              doctor={doctor}
              selectedDate={selectedDate}
              onCancel={handleCancel}
              onSuccess={handleSuccess}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentsPage;
