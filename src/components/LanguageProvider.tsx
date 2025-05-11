
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    home: 'Home',
    booking: 'Book Now',
    dashboard: 'Admin Dashboard',
    contact: 'Contact',
    bookNow: 'Book Now',
    language: 'Language',
    english: 'English',
    french: 'French',
    arabic: 'Arabic',
  },
  fr: {
    home: 'Accueil',
    booking: 'Réserver',
    dashboard: 'Tableau de bord',
    contact: 'Contact',
    bookNow: 'Réserver',
    language: 'Langue',
    english: 'Anglais',
    french: 'Français',
    arabic: 'Arabe',
  },
  ar: {
    home: 'الرئيسية',
    booking: 'حجز الآن',
    dashboard: 'لوحة التحكم',
    contact: 'اتصل بنا',
    bookNow: 'حجز الآن',
    language: 'اللغة',
    english: 'الإنجليزية',
    french: 'الفرنسية',
    arabic: 'العربية',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
