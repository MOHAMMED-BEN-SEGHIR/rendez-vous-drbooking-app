
import { useQuery } from '@tanstack/react-query';
import { Availability } from '../types';
import api from '../services/api';
import { mockAPI } from '../mockData';
import { format } from 'date-fns';

export const useAvailabilities = (doctorId: number, date?: Date) => {
  return useQuery<Availability[]>({
    queryKey: ['availabilities', doctorId, date],
    queryFn: async () => {
      // En environnement de production, utiliser l'API réelle
      // const dateParam = date ? `&date=${format(date, 'yyyy-MM-dd')}` : '';
      // return await api.get<Availability[]>(`/availabilities?doctorId=${doctorId}${dateParam}`);
      
      // Pour la démonstration, utiliser les données mockées
      return await mockAPI.getAvailabilities(doctorId, date);
    },
    enabled: !!doctorId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
