
import { useQuery } from '@tanstack/react-query';
import { Doctor } from '../types';
import api from '../services/api';
import { mockAPI } from '../mockData';

export const useDoctors = (specialtyId?: number) => {
  return useQuery<Doctor[]>({
    queryKey: ['doctors', { specialtyId }],
    queryFn: async () => {
      // En environnement de production, utiliser l'API réelle
      // return await api.get<Doctor[]>(endpoint);
      
      // Pour la démonstration, utiliser les données mockées
      return await mockAPI.getDoctors(specialtyId);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDoctor = (id: number) => {
  return useQuery<Doctor>({
    queryKey: ['doctors', id],
    queryFn: async () => {
      // En environnement de production, utiliser l'API réelle
      // return await api.get<Doctor>(`/doctors/${id}`);
      
      // Pour la démonstration, utiliser les données mockées
      return await mockAPI.getDoctor(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
