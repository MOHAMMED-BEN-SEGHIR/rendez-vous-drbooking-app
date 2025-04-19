
import { useState, useCallback } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

interface AppointmentCalendarSimpleProps {
  doctorId?: number;
  onTimeSelect: (time: Date) => void;
  locale?: 'fr' | 'en';
}

// Simulation des créneaux horaires disponibles
const generateTimeSlots = (date: Date): TimeSlot[] => {
  // En situation réelle, ces données viendraient de l'API
  const baseSlots = [
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: false },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: false },
    { time: '14:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: false },
    { time: '16:00', available: true },
    { time: '16:30', available: true },
  ];
  
  // Simulation de disponibilités variables selon les jours
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  if (isWeekend) {
    return baseSlots.slice(0, 4).map((slot, index) => ({
      id: index,
      ...slot,
      available: Math.random() > 0.5,
    }));
  }
  
  return baseSlots.map((slot, index) => ({
    id: index,
    ...slot,
    // Randomiser légèrement les disponibilités pour la démo
    available: isSameDay(date, new Date())
      ? slot.available && Math.random() > 0.3
      : Math.random() > 0.4,
  }));
};

const AppointmentCalendarSimple = ({
  doctorId,
  onTimeSelect,
  locale = 'fr',
}: AppointmentCalendarSimpleProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    selectedDate ? generateTimeSlots(selectedDate) : []
  );
  
  const dateLocale = locale === 'fr' ? fr : enUS;
  
  // Gérer le changement de date
  const handleDateChange = useCallback((date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setTimeSlots(generateTimeSlots(date));
    }
  }, []);
  
  // Gérer la sélection d'un créneau horaire
  const handleTimeSlotSelect = (time: string) => {
    if (!selectedDate) return;
    
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    
    onTimeSelect(selectedDateTime);
  };
  
  // Formater les jours de la semaine
  const formatWeekdayName = (day: Date) => {
    return format(day, 'EEEEEE', { locale: dateLocale });
  };
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-center">
          {locale === 'fr' ? 'Sélectionnez une date et un horaire' : 'Select a date and time'}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            locale={dateLocale}
            // formatters pour le jour de la semaine
            disabled={{ before: new Date() }}
            className="rounded-md border"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {selectedDate
              ? format(selectedDate, 'EEEE d MMMM yyyy', { locale: dateLocale })
              : locale === 'fr'
              ? 'Sélectionnez une date'
              : 'Select a date'}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={slot.available ? 'outline' : 'ghost'}
                className={`
                  ${slot.available 
                    ? 'hover:bg-medical-light hover:text-medical-dark' 
                    : 'opacity-50 cursor-not-allowed'}
                `}
                disabled={!slot.available}
                onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
              >
                {slot.time}
              </Button>
            ))}
          </div>
          
          {timeSlots.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              {locale === 'fr'
                ? 'Aucun créneau disponible pour cette date'
                : 'No available time slots for this date'}
            </div>
          )}
          
          {timeSlots.every(slot => !slot.available) && (
            <div className="text-center text-gray-500 py-2">
              {locale === 'fr'
                ? 'Tous les créneaux sont pris, essayez une autre date'
                : 'All slots are taken, try another date'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendarSimple;
