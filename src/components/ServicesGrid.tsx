
import ServiceCard from "./ServiceCard";
import { Heart, Bandage, Microscope, Pill } from "lucide-react";

const SERVICES = [
  {
    icon: Heart,
    title: "Therapiya",
    description: "Personalized therapy sessions with expert psychologists and therapists using modern approaches."
  },
  {
    icon: Bandage,
    title: "Dentistry",
    description: "State-of-the-art dental care, cosmetic dentistry, orthodontics and oral hygiene clinics."
  },
  {
    icon: Microscope,
    title: "Virusology",
    description: "Advanced diagnostics for viral infections and research in virology for preventative care."
  },
  {
    icon: Pill,
    title: "Pharmacology",
    description: "Expert pharmaceutical consultation and medication management for better health outcomes."
  }
];

const ServicesGrid = () => (
  <div>
    <h2 className="text-center text-2xl md:text-3xl font-bold mb-7 text-blue-900">Our Medical Services</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {SERVICES.map((srv) => (
        <ServiceCard
          key={srv.title}
          Icon={srv.icon}
          title={srv.title}
          description={srv.description}
        />
      ))}
    </div>
  </div>
);

export default ServicesGrid;
