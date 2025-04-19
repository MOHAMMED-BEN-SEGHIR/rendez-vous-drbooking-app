
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoctors } from '@/hooks/useDoctors';
import { useSpecialties } from '@/hooks/useSpecialties';
import { Doctor } from '@/types';
import DoctorCard from '@/components/DoctorCard';
import SpecialtyFilterSidebar from '@/components/SpecialtyFilterSidebar';
import { Loader2 } from 'lucide-react';

type FilterState = {
  specialtyId?: number;
  gender?: 'male' | 'female' | null;
  availability?: 'free' | 'unavailable' | null;
};

const DoctorsListPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({});
  
  const { data: doctors, isLoading: isLoadingDoctors } = useDoctors(filters.specialtyId);
  const { data: specialties, isLoading: isLoadingSpecialties } = useSpecialties();
  
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleViewDoctor = (doctorId: number) => {
    navigate(`/doctors/${doctorId}`);
  };
  
  // Filter doctors based on gender and availability if needed
  const filteredDoctors = doctors?.filter(doctor => {
    if (filters.gender && doctor.gender !== filters.gender) return false;
    if (filters.availability === 'free' && !doctor.hasAvailability) return false;
    if (filters.availability === 'unavailable' && doctor.hasAvailability) return false;
    return true;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SpecialtyFilterSidebar 
        specialties={specialties || []}
        isLoading={isLoadingSpecialties}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />
      
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-medical-teal">Find a Doctor</h1>
          <p className="mt-2 text-gray-600">Choose from our network of trusted healthcare professionals</p>
        </div>
        
        {isLoadingDoctors ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-medical-teal animate-spin" />
          </div>
        ) : filteredDoctors?.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600">No doctors found matching your criteria. Try changing your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors?.map(doctor => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor} 
                onViewMore={() => handleViewDoctor(doctor.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorsListPage;
