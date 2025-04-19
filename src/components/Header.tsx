
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Calendar, Menu, User, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
  currentLanguage?: string;
}

const Header = ({ onLanguageChange, currentLanguage = 'fr' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-medical-teal" />
            <span className="text-xl font-bold text-medical-teal">DrBooking</span>
          </Link>
        </div>

        {/* Navigation pour desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/appointments" className="text-sm font-medium hover:text-medical-teal transition-colors">
            Rendez-vous
          </Link>
          <Link to="/doctors" className="text-sm font-medium hover:text-medical-teal transition-colors">
            Médecins
          </Link>
          <Link to="/specialties" className="text-sm font-medium hover:text-medical-teal transition-colors">
            Spécialités
          </Link>
        </nav>

        {/* Actions pour desktop */}
        <div className="hidden md:flex items-center gap-4">
          {onLanguageChange && (
            <LanguageSwitcher
              onLanguageChange={onLanguageChange}
              currentLanguage={currentLanguage}
            />
          )}
          
          <Button variant="outline" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            <span>Connexion</span>
          </Button>
          
          <Button className="bg-medical-teal hover:bg-medical-dark text-white" size="sm">
            Prendre RDV
          </Button>
        </div>

        {/* Menu mobile */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link 
                to="/appointments" 
                className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="h-5 w-5" />
                Rendez-vous
              </Link>
              <Link 
                to="/doctors" 
                className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                Médecins
              </Link>
              <Link 
                to="/specialties" 
                className="flex items-center gap-2 text-lg font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="h-5 w-5" />
                Spécialités
              </Link>
            </nav>
            
            <div className="flex flex-col gap-4 mt-8">
              {onLanguageChange && (
                <div className="p-2">
                  <LanguageSwitcher
                    onLanguageChange={(lang) => {
                      if (onLanguageChange) onLanguageChange(lang);
                    }}
                    currentLanguage={currentLanguage}
                  />
                </div>
              )}
              
              <Button variant="outline" className="gap-2 justify-start" size="lg">
                <User className="h-5 w-5" />
                <span>Connexion</span>
              </Button>
              
              <Button className="bg-medical-teal hover:bg-medical-dark text-white mt-2" size="lg">
                Prendre RDV
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
