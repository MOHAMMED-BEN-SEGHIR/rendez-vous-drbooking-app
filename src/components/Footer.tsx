
import { Calendar, Heart, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-medical-teal" />
              <span className="text-xl font-bold text-medical-teal">DrBooking</span>
            </div>
            <p className="text-gray-600 text-sm">
              La plateforme simple et rapide pour gérer vos rendez-vous médicaux
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-medium text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-medical-teal text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-medical-teal text-sm">
                  Rendez-vous
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 hover:text-medical-teal text-sm">
                  Médecins
                </Link>
              </li>
              <li>
                <Link to="/specialties" className="text-gray-600 hover:text-medical-teal text-sm">
                  Spécialités
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-medium text-lg mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-medical-teal text-sm">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-medical-teal text-sm">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-medical-teal text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-medical-teal text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="h-4 w-4 text-medical-teal" />
                <span>123 Rue de la Santé, 75001 Paris</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone className="h-4 w-4 text-medical-teal" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="h-4 w-4 text-medical-teal" />
                <span>contact@drbooking.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} DrBooking. Tous droits réservés.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-1 mt-4 md:mt-0">
            Réalisé avec <Heart className="h-3 w-3 text-medical-teal" /> par DrBooking
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
