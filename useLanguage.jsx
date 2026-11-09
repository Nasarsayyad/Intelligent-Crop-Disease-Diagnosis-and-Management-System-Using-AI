import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const TRANSLATIONS = {
  en: {
    app_title: "Intelligent Crop Disease Diagnosis & Management System",
    app_short: "AgriAI CropCare",
    tagline: "Empowering farmers with instant AI vision diagnosis, growth stage tracking, and label-guided crop management.",
    analyze_btn: "Analyze Your Crop",
    explore_btn: "Explore Features",
    home: "Home",
    dashboard: "Dashboard",
    diagnose: "AI Diagnosis",
    history: "Diagnosis History",
    monitoring: "Crop Health",
    weather: "Weather Insights",
    chat: "AgriBot AI",
    knowledge: "Knowledge Base",
    calendar: "Crop Calendar",
    expert: "Consult Expert",
    admin: "Admin Analytics",
    healthy: "Healthy",
    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe",
    growth_stages: {
      Germination: "Germination",
      Seedling: "Seedling",
      Vegetative: "Vegetative",
      Budding: "Budding",
      Flowering: "Flowering",
      Fruiting: "Fruiting",
      Maturity: "Maturity",
      "Harvest-ready": "Harvest-ready"
    }
  },
  ta: {
    app_title: "செயற்கை நுண்ணறிவு பயிர் நோய் கண்டறிதல் மற்றும் மேலாண்மை அமைப்பு",
    app_short: "அக்ரி-ஏஐ பயிர் பாதுகாப்பு",
    tagline: "பயிர் நோய்களை நொடிகளில் கண்டறிந்து, வளர்ச்சிப் பருவம் அறிந்து, உகந்த இயற்கை மற்றும் பாதுகாப்பு சிகிச்சை முறைகளை பெறுங்கள்.",
    analyze_btn: "பயிர் பரிசோதனை செய்",
    explore_btn: "வசதிகளைப் பார்க்க",
    home: "முகப்பு",
    dashboard: "டாஷ்போர்டு",
    diagnose: "AI நோய் கண்டறிதல்",
    history: "பரிசோதனை வரலாறு",
    monitoring: "பயிர் கண்காணிப்பு",
    weather: "வானிலை நிலவரம்",
    chat: "அக்ரிபோட் உதவியாளர்",
    knowledge: "பயிர் களஞ்சியம்",
    calendar: "விவசாய நாட்காட்டி",
    expert: "நிபுணர் ஆலோசனை",
    admin: "நிர்வாக பார்வை",
    healthy: "ஆரோக்கியம்",
    mild: "லேசான பாதிப்பு",
    moderate: "மிதமான பாதிப்பு",
    severe: "தீவிர பாதிப்பு",
    growth_stages: {
      Germination: "விதை முளைப்பு",
      Seedling: "நாற்றுப் பருவம்",
      Vegetative: "தழை வளர்ச்சி",
      Budding: "மொட்டுப் பருவம்",
      Flowering: "பூக்கும் பருவம்",
      Fruiting: "காய்க்கும் பருவம்",
      Maturity: "முதிர்ச்சி",
      "Harvest-ready": "அறுவடைக்கு தயார்"
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('agri_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('agri_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const t = (key) => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
