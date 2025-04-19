
import { useQuery } from '@tanstack/react-query';
import { Specialty } from '../types';
import api from '../services/api';
import { mockAPI } from '../mockData';
import { toast } from '@/hooks/use-toast';

export const useSpecialties = () => {
  return useQuery<Specialty[]>({
    queryKey: ['specialties'],
    queryFn: async () => {
      try {
        // En environnement de production, utiliser l'API réelle
        // return await api.get<Specialty[]>('/specialties');
        
        // Pour la démonstration, utiliser les données mockées
        return await mockAPI.getSpecialties();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error loading specialties",
          description: "There was a problem loading the specialty list. Please try again.",
        });
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000, // 1 heure
  });
};
