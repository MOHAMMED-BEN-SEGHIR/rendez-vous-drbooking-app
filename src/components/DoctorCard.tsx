
import { Heart, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Doctor } from '@/types';
import { useState } from 'react';

interface DoctorCardProps {
  doctor: Doctor;
  onViewMore: () => void;
}

const DoctorCard = ({ doctor, onViewMore }: DoctorCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(prev => !prev);
  };
  
  // Calculer le nom complet si 'name' n'est pas disponible
  const doctorName = doctor.name || `${doctor.firstName} ${doctor.lastName}`;
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Doctor Image */}
      <div className="relative">
        <img 
          src={doctor.imageUrl || "https://via.placeholder.com/400x300?text=Doctor"} 
          alt={doctorName}
          className="w-full h-64 object-cover"
        />
        <button 
          onClick={toggleFavorite} 
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      
      <CardContent className="pt-5">
        <h3 className="text-xl font-semibold text-gray-800">{doctorName}</h3>
        
        <div className="mt-2 flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index} 
              className={`h-4 w-4 ${index < (doctor.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({doctor.reviewCount || 0})</span>
        </div>
        
        <p className="mt-2 text-medical-teal font-medium">{doctor.specialty?.name}</p>
        
        <div className="mt-3 flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{doctor.location || 'Location not specified'}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={onViewMore}
          className="w-full bg-medical-teal hover:bg-medical-dark text-white transition-colors"
        >
          View More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
