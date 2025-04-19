
import { Doctor, Specialty, Availability } from './types';

// Spécialités médicales
export const mockSpecialties: Specialty[] = [
  { id: 1, name: 'Médecine générale', description: 'Soins médicaux de premier recours' },
  { id: 2, name: 'Cardiologie', description: 'Maladies du cœur et des vaisseaux' },
  { id: 3, name: 'Dermatologie', description: 'Maladies de la peau' },
  { id: 4, name: 'Pédiatrie', description: 'Soins des enfants et adolescents' },
  { id: 5, name: 'Gynécologie', description: 'Santé des femmes' },
  { id: 6, name: 'Ophtalmologie', description: 'Soins des yeux' },
];

// Médecins
export const mockDoctors: Doctor[] = [
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    specialtyId: 1,
    specialty: mockSpecialties[0],
    imageUrl: '/avatars/doctor-1.jpg',
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Laurent',
    specialtyId: 1,
    specialty: mockSpecialties[0],
    imageUrl: '/avatars/doctor-2.jpg',
  },
  {
    id: 3,
    firstName: 'Philippe',
    lastName: 'Martin',
    specialtyId: 2,
    specialty: mockSpecialties[1],
    imageUrl: '/avatars/doctor-3.jpg',
  },
  {
    id: 4,
    firstName: 'Sophie',
    lastName: 'Lefevre',
    specialtyId: 3,
    specialty: mockSpecialties[2],
    imageUrl: '/avatars/doctor-4.jpg',
  },
  {
    id: 5,
    firstName: 'Thomas',
    lastName: 'Moreau',
    specialtyId: 4,
    specialty: mockSpecialties[3],
    imageUrl: '/avatars/doctor-5.jpg',
  },
  {
    id: 6,
    firstName: 'Claire',
    lastName: 'Bernard',
    specialtyId: 5,
    specialty: mockSpecialties[4],
    imageUrl: '/avatars/doctor-6.jpg',
  },
];

// Fonction pour générer des disponibilités pour un médecin
export const generateAvailabilities = (doctorId: number, date: Date): Availability[] => {
  const startHours = [9, 10, 11, 14, 15, 16];
  const availabilities: Availability[] = [];
  
  startHours.forEach((hour, index) => {
    // Créneaux de 30 minutes (00 et 30)
    [0, 30].forEach((minute, minuteIndex) => {
      const startTime = new Date(date);
      startTime.setHours(hour, minute, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 30);
      
      // Simuler des disponibilités aléatoires
      const isAvailable = Math.random() > 0.3;
      
      availabilities.push({
        id: index * 2 + minuteIndex + 1,
        doctorId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        isAvailable,
      });
    });
  });
  
  return availabilities;
};

// Mock de l'API - ces fonctions simulent des requêtes API
export const mockAPI = {
  getSpecialties: () => Promise.resolve(mockSpecialties),
  getDoctors: (specialtyId?: number) => {
    let filteredDoctors = mockDoctors;
    if (specialtyId) {
      filteredDoctors = mockDoctors.filter(doctor => doctor.specialtyId === specialtyId);
    }
    return Promise.resolve(filteredDoctors);
  },
  getDoctor: (id: number) => {
    const doctor = mockDoctors.find(doc => doc.id === id);
    return Promise.resolve(doctor);
  },
  getAvailabilities: (doctorId: number, date?: Date) => {
    return Promise.resolve(generateAvailabilities(doctorId, date || new Date()));
  },
  createAppointment: (appointmentData: any) => {
    console.log('Appointment created:', appointmentData);
    return Promise.resolve({
      id: Math.floor(Math.random() * 1000) + 1,
      ...appointmentData,
    });
  },
};
