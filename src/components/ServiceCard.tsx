
import { FC } from "react";

interface ServiceCardProps {
  Icon: FC<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ Icon, title, description }) => (
  <div className="flex flex-col items-center bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-shadow text-center h-full">
    <div className="mb-4 bg-blue-100 p-4 rounded-full flex items-center justify-center">
      <Icon size={32} className="text-blue-600" />
    </div>
    <h3 className="font-semibold text-blue-900 mb-2 text-lg">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default ServiceCard;
