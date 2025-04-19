
import { CheckSquare, Square } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Specialty } from '@/types';

interface SpecialtyFilterSidebarProps {
  specialties: Specialty[];
  isLoading: boolean;
  onFilterChange: (filters: any) => void;
  currentFilters: {
    specialtyId?: number;
    gender?: 'male' | 'female' | null;
    availability?: 'free' | 'unavailable' | null;
  };
}

const SpecialtyFilterSidebar = ({ 
  specialties, 
  isLoading, 
  onFilterChange,
  currentFilters
}: SpecialtyFilterSidebarProps) => {
  const handleSpecialtyChange = (specialtyId: number) => {
    if (currentFilters.specialtyId === specialtyId) {
      onFilterChange({ specialtyId: undefined });
    } else {
      onFilterChange({ specialtyId });
    }
  };
  
  const handleGenderChange = (gender: 'male' | 'female' | null) => {
    onFilterChange({ gender });
  };
  
  const handleAvailabilityChange = (availability: 'free' | 'unavailable' | null) => {
    onFilterChange({ availability });
  };
  
  return (
    <aside className="w-full md:w-64 lg:w-72 p-4 md:p-6 bg-white border-r md:min-h-screen sticky top-0">
      <h2 className="text-xl font-semibold text-medical-teal mb-6">Filters</h2>
      
      {/* Specialty Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Specialty</h3>
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-6 bg-gray-200 rounded w-3/4"></div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {specialties.map(specialty => (
              <li key={specialty.id}>
                <button
                  onClick={() => handleSpecialtyChange(specialty.id)}
                  className="flex items-center w-full text-left py-1 hover:text-medical-teal transition-colors group"
                >
                  {currentFilters.specialtyId === specialty.id ? (
                    <CheckSquare className="h-5 w-5 mr-2 text-medical-teal" />
                  ) : (
                    <Square className="h-5 w-5 mr-2 text-gray-400 group-hover:text-medical-teal" />
                  )}
                  <span className={currentFilters.specialtyId === specialty.id ? "text-medical-teal" : "text-gray-700"}>
                    {specialty.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Appointment Availability */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Appointment availability</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleAvailabilityChange(currentFilters.availability === 'free' ? null : 'free')}
              className="flex items-center w-full text-left py-1 hover:text-medical-teal transition-colors group"
            >
              {currentFilters.availability === 'free' ? (
                <CheckSquare className="h-5 w-5 mr-2 text-medical-teal" />
              ) : (
                <Square className="h-5 w-5 mr-2 text-gray-400 group-hover:text-medical-teal" />
              )}
              <span className={currentFilters.availability === 'free' ? "text-medical-teal" : "text-gray-700"}>
                Free doctors only
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleAvailabilityChange(currentFilters.availability === 'unavailable' ? null : 'unavailable')}
              className="flex items-center w-full text-left py-1 hover:text-medical-teal transition-colors group"
            >
              {currentFilters.availability === 'unavailable' ? (
                <CheckSquare className="h-5 w-5 mr-2 text-medical-teal" />
              ) : (
                <Square className="h-5 w-5 mr-2 text-gray-400 group-hover:text-medical-teal" />
              )}
              <span className={currentFilters.availability === 'unavailable' ? "text-medical-teal" : "text-gray-700"}>
                Unavailable doctors only
              </span>
            </button>
          </li>
        </ul>
      </div>
      
      {/* Gender Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Gender</h3>
        <RadioGroup 
          value={currentFilters.gender || 'no-preference'} 
          onValueChange={(value) => {
            handleGenderChange(value === 'no-preference' ? null : (value as 'male' | 'female'));
          }}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no-preference" id="no-preference" />
            <Label htmlFor="no-preference" className="cursor-pointer">No Preference</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="cursor-pointer">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="cursor-pointer">Male</Label>
          </div>
        </RadioGroup>
      </div>
    </aside>
  );
};

export default SpecialtyFilterSidebar;
