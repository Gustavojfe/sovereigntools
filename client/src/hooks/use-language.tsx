import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, getTranslation, languageNames } from '../translations';
import { Feature, Wallet } from '../lib/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any, fallback?: string) => string;
  translateFeature: (feature: Feature) => { name: string; description: string };
  translateWallet: (wallet: Wallet) => { name: string; description: string };
  availableLanguages: Language[];
  languageNames: Record<Language, string>;
}

const defaultLanguage: Language = 'en';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string, _options?: any, fallback?: string) => fallback !== undefined ? fallback : key,
  translateFeature: (feature) => ({ name: feature.name, description: feature.description }),
  translateWallet: (wallet) => ({ name: wallet.name, description: wallet.description }),
  availableLanguages: ['en', 'es'],
  languageNames
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get stored language from localStorage or use browser language
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return defaultLanguage;
    
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && ['en', 'es'].includes(storedLanguage)) {
      return storedLanguage;
    }
    
    // Try to use browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') return 'es';
    
    return defaultLanguage;
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Optional: Set lang attribute on html element
    document.documentElement.setAttribute('lang', lang);
  };

  // Initialize language on mount
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, []);

  // Translation function
  const t = (key: string, _options?: any, fallback?: string): string => {
    const result = getTranslation(language, key);
    return result === key && fallback !== undefined ? fallback : result;
  };

  // Feature translation function
  const translateFeature = (feature: Feature) => {
    // Use proper key lookup path for feature translations
    // First try direct name match in features file
    let translatedName = getTranslation(language, `features.${feature.name}.name`);
    let translatedDescription = getTranslation(language, `features.${feature.name}.description`);

    // If we get back the key itself (no match found), the key might contain spaces
    // Try again with exact feature name match
    if (translatedName === `features.${feature.name}.name` || !translatedName) {
      translatedName = feature.name;
    }
    
    if (translatedDescription === `features.${feature.name}.description` || !translatedDescription) {
      translatedDescription = feature.description;
    }
    
    return {
      name: translatedName,
      description: translatedDescription
    };
  };

  // Wallet translation function
  const translateWallet = (wallet: Wallet) => {
    // Use proper key lookup path for wallet translations
    // First try direct name match in wallets file
    let translatedName = getTranslation(language, `wallets.${wallet.name}.name`);
    let translatedDescription = getTranslation(language, `wallets.${wallet.name}.description`);
    
    // If we get back the key itself (no match found), use the original value
    if (translatedName === `wallets.${wallet.name}.name` || !translatedName) {
      translatedName = wallet.name;
    }
    
    if (translatedDescription === `wallets.${wallet.name}.description` || !translatedDescription) {
      translatedDescription = wallet.description;
    }
    
    return {
      name: translatedName,
      description: translatedDescription
    };
  };

  const value = {
    language,
    setLanguage,
    t,
    translateFeature,
    translateWallet,
    availableLanguages: ['en', 'es'] as Language[],
    languageNames
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);