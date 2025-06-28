import React, { createContext, useContext, useState, ReactNode } from 'react';
import { I18nManager } from 'react-native';

interface LanguageContextType {
  language: 'en' | 'ar';
  isRTL: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Authentication
    welcome: 'Welcome to Waselni',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    studentEmail: 'University Email',
    studentId: 'Student ID',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    
    // Navigation
    home: 'Home',
    rides: 'Rides',
    profile: 'Profile',
    settings: 'Settings',
    
    // Home Screen
    whereToGo: 'Where are you going?',
    pickupLocation: 'Pickup Location',
    destination: 'Destination',
    currentLocation: 'Current Location',
    
    // Services
    minibusService: 'Minibus Service',
    minibusDescription: 'Shared rides with male drivers',
    wassalahService: 'Wassalah Service',
    wassalahDescription: 'Female drivers for female passengers',
    carpooling: 'Student Carpooling',
    carpoolingDescription: 'Share rides with fellow students',
    
    // Booking
    bookNow: 'Book Now',
    findDriver: 'Finding Driver...',
    driverFound: 'Driver Found!',
    estimatedFare: 'Estimated Fare',
    estimatedTime: 'Estimated Time',
    
    // Safety
    emergency: 'Emergency',
    shareRide: 'Share Ride Details',
    contactEmergency: 'Emergency Contact',
    
    // Profile
    myProfile: 'My Profile',
    rideHistory: 'Ride History',
    paymentMethods: 'Payment Methods',
    emergencyContacts: 'Emergency Contacts',
    
    // Universities
    universityOfBahrain: 'University of Bahrain',
    bahrainPolytechnic: 'Bahrain Polytechnic',
    amaInternational: 'AMA International',
    gulfUniversity: 'Gulf University',
  },
  ar: {
    // Authentication
    welcome: 'أهلاً بك في وصلني',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    studentEmail: 'البريد الجامعي',
    studentId: 'الرقم الجامعي',
    confirmPassword: 'تأكيد كلمة المرور',
    forgotPassword: 'هل نسيت كلمة المرور؟',
    
    // Navigation
    home: 'الرئيسية',
    rides: 'الرحلات',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    
    // Home Screen
    whereToGo: 'إلى أين تريد الذهاب؟',
    pickupLocation: 'نقطة الانطلاق',
    destination: 'الوجهة',
    currentLocation: 'الموقع الحالي',
    
    // Services
    minibusService: 'خدمة الباص',
    minibusDescription: 'رحلات مشتركة مع سائقين',
    wassalahService: 'خدمة وصالة',
    wassalahDescription: 'سائقات للراكبات',
    carpooling: 'مشاركة السيارة',
    carpoolingDescription: 'اركب مع زملاء الجامعة',
    
    // Booking
    bookNow: 'احجز الآن',
    findDriver: 'البحث عن سائق...',
    driverFound: 'تم العثور على سائق!',
    estimatedFare: 'التكلفة المتوقعة',
    estimatedTime: 'الوقت المتوقع',
    
    // Safety
    emergency: 'طوارئ',
    shareRide: 'شارك تفاصيل الرحلة',
    contactEmergency: 'جهة اتصال الطوارئ',
    
    // Profile
    myProfile: 'ملفي الشخصي',
    rideHistory: 'تاريخ الرحلات',
    paymentMethods: 'طرق الدفع',
    emergencyContacts: 'جهات اتصال الطوارئ',
    
    // Universities
    universityOfBahrain: 'جامعة البحرين',
    bahrainPolytechnic: 'البوليتكنك البحرين',
    amaInternational: 'أما الدولية',
    gulfUniversity: 'جامعة الخليج',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const isRTL = language === 'ar';

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    I18nManager.forceRTL(newLanguage === 'ar');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}