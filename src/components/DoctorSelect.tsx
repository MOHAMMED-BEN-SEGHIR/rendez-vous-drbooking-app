
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { useDoctors } from '@/hooks/useDoctors';
import { useSpecialties } from '@/hooks/useSpecialties';
import { Doctor, Specialty, SelectOption } from '@/types';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

interface DoctorSelectProps {
  onDoctorSelect: (doctorId: number) => void;
  selectedDoctorId?: number;
}

const DoctorSelect = ({ onDoctorSelect, selectedDoctorId }: DoctorSelectProps) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | undefined>();
  
  // Requêtes pour les spécialités et les médecins
  const { data: specialties, isLoading: isLoadingSpecialties } = useSpecialties();
  const { data: doctors, isLoading: isLoadingDoctors } = useDoctors(selectedSpecialty);

  // Options pour les sélecteurs
  const specialtyOptions: SelectOption[] = specialties?.map((specialty: Specialty) => ({
    value: specialty.id,
    label: specialty.name,
  })) || [];

  const doctorOptions: SelectOption[] = doctors?.map((doctor: Doctor) => ({
    value: doctor.id,
    label: `${doctor.firstName} ${doctor.lastName} (${doctor.specialty.name})`,
  })) || [];

  // Gérer le changement de spécialité
  const handleSpecialtyChange = (value: string) => {
    const specialtyId = parseInt(value);
    setSelectedSpecialty(specialtyId);
  };

  // Gérer le changement de médecin
  const handleDoctorChange = (value: string) => {
    const doctorId = parseInt(value);
    onDoctorSelect(doctorId);
  };

  return (
    <div className="space-y-6">
      {/* Sélecteur de spécialité */}
      <div className="space-y-2">
        <Label htmlFor="specialty">Spécialité médicale</Label>
        
        {isLoadingSpecialties ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select value={selectedSpecialty?.toString() || ''} onValueChange={handleSpecialtyChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez une spécialité" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {specialtyOptions.map((option) => (
                  <SelectItem key={option.value.toString()} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Sélecteur de médecin */}
      <div className="space-y-2">
        <Label htmlFor="doctor">Médecin</Label>
        
        {isLoadingDoctors ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select 
            value={selectedDoctorId?.toString() || ''} 
            onValueChange={handleDoctorChange}
            disabled={!doctors || doctors.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez un médecin" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {doctorOptions.map((option) => (
                  <SelectItem key={option.value.toString()} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default DoctorSelect;
