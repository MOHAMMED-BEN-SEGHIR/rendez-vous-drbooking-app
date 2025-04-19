
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctor } from '@/hooks/useDoctors';
import { useAvailabilities } from '@/hooks/useAvailabilities';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Phone, Mail, User, Award, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const DoctorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctorId = parseInt(id || '0', 10);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Récupération des données du médecin
  const { data: doctor, isLoading: isLoadingDoctor, error: doctorError } = useDoctor(doctorId);
  
  // Récupération des disponibilités
  const { data: availabilities, isLoading: isLoadingAvailabilities } = useAvailabilities(doctorId, selectedDate);
  
  const handleBookAppointment = (startTime: string) => {
    // Pour l'instant, juste un toast
    toast({
      title: "Fonctionnalité à venir",
      description: `Bientôt, vous pourrez réserver un rendez-vous avec Dr. ${doctor?.lastName} le ${format(new Date(startTime), 'dd MMMM yyyy à HH:mm', { locale: fr })}`,
    });
    
    // Dans une version future, rediriger vers un formulaire de prise de RDV
    // navigate(`/appointments/new?doctorId=${doctorId}&startTime=${startTime}`);
  };
  
  if (isLoadingDoctor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 text-medical-teal animate-spin" />
      </div>
    );
  }
  
  if (doctorError || !doctor) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur lors du chargement des informations du médecin</h2>
        <p className="mb-6">Nous n'avons pas pu récupérer les détails de ce médecin. Veuillez réessayer plus tard.</p>
        <Button onClick={() => navigate('/doctors')}>Retour à la liste des médecins</Button>
      </div>
    );
  }
  
  const doctorFullName = `${doctor.firstName} ${doctor.lastName}`;
  const doctorImageUrl = doctor.imageUrl || `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80`;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profil du médecin */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={doctorImageUrl} 
                alt={doctorFullName}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-white -mt-16 relative shadow-md">
                  <AvatarImage src={doctorImageUrl} alt={doctorFullName} />
                  <AvatarFallback>
                    {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold text-gray-800">{doctorFullName}</h1>
                <Badge className="mt-2 bg-medical-teal">{doctor.specialty.name}</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-medical-teal mr-3" />
                  <span>{doctor.location || "Adresse non spécifiée"}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-medical-teal mr-3" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-medical-teal mr-3" />
                  <span>{`${doctor.firstName.toLowerCase()}.${doctor.lastName.toLowerCase()}@drbooking.com`}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-medical-teal mr-3" />
                  <span>Diplômé de l'Université de Médecine de Paris</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-lg mb-3">À propos</h3>
                <p className="text-gray-600">
                  Le Dr. {doctor.lastName} est un {doctor.specialty.name.toLowerCase()} expérimenté, ayant pratiqué pendant plus de 10 ans.
                  Spécialisé dans {doctor.specialty.name === "Généraliste" ? "la médecine générale" : `le domaine de ${doctor.specialty.name.toLowerCase()}`},
                  il s'engage à fournir des soins de qualité à tous ses patients.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Disponibilités et réservation */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Disponibilités</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <CalendarIcon className="h-5 w-5 text-medical-teal mr-2" />
              <h3 className="font-semibold">Sélectionnez une date</h3>
            </div>
            
            {/* Ici, on pourrait intégrer un calendrier plus élaboré */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {Array.from({ length: 7 }).map((_, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                const isSelected = selectedDate.toDateString() === date.toDateString();
                
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      isSelected 
                        ? 'bg-medical-teal text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-xs">{format(date, 'EEE', { locale: fr })}</div>
                    <div className="font-bold">{format(date, 'd', { locale: fr })}</div>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-medical-teal mr-2" />
                <h3 className="font-semibold">Horaires disponibles</h3>
              </div>
              
              {isLoadingAvailabilities ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 text-medical-teal animate-spin" />
                </div>
              ) : availabilities && availabilities.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {availabilities.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={slot.isAvailable ? "outline" : "ghost"}
                      disabled={!slot.isAvailable}
                      className={slot.isAvailable ? "hover:bg-medical-teal hover:text-white" : "opacity-50"}
                      onClick={() => handleBookAppointment(slot.startTime)}
                    >
                      {format(new Date(slot.startTime), 'HH:mm')}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p>Aucune disponibilité pour cette date</p>
                  <p className="text-sm">Veuillez sélectionner une autre date ou contacter le cabinet</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-medical-light bg-opacity-30 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-medical-teal" />
              Informations pratiques
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-medium">Délai moyen d'attente:</span> 15 minutes
              </p>
              <p>
                <span className="font-medium">Langues parlées:</span> Français, Anglais
              </p>
              <p>
                <span className="font-medium">Moyens de paiement acceptés:</span> Carte Vitale, Carte Bancaire, Espèces
              </p>
              <p>
                <span className="font-medium">Accessibilité:</span> Cabinet accessible aux personnes à mobilité réduite
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
