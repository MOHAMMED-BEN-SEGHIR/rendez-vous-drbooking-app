
import { useQuery } from '@tanstack/react-query';
import { Specialty } from '../types';
import api from '../services/api';
import { mockAPI } from '../mockData';

export const useSpecialties = () => {
  return useQuery<Specialty[]>({
    queryKey: ['specialties'],
    queryFn: async () => {
      // En environnement de production, utiliser l'API réelle
      // return await api.get<Specialty[]>('/specialties');
      
      // Pour la démonstration, utiliser les données mockées
      return await mockAPI.getSpecialties();
    },
    staleTime: 60 * 60 * 1000, // 1 heure
  });
};
