
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageSwitcherProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
}

const LanguageSwitcher = ({
  onLanguageChange,
  currentLanguage = 'fr',
}: LanguageSwitcherProps) => {
  const languages: Language[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <span className="text-base">{selectedLanguage.flag}</span>
          <span className="hidden md:inline">{selectedLanguage.name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer"
            onClick={() => onLanguageChange(language.code)}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.name}</span>
            {currentLanguage === language.code && (
              <Check className="h-4 w-4 ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
