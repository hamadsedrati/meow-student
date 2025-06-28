import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Car, Shield, Users, Globe } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

function WelcomeContent() {
  const { t, language, toggleLanguage, isRTL } = useLanguage();

  const handleGetStarted = () => {
    router.push('/(auth)/signin');
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
          <Globe color={Colors.background} size={24} />
          <Text style={[styles.languageText, { fontFamily: Fonts.english.medium }]}>
            {language === 'en' ? 'العربية' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.logoBackground}>
          <Car color={Colors.primary} size={48} />
        </View>
        <Text style={[
          styles.appName, 
          { 
            fontFamily: language === 'ar' ? Fonts.arabic.bold : Fonts.english.bold,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          {language === 'ar' ? 'وصلني' : 'Waselni'}
        </Text>
        <Text style={[
          styles.tagline,
          {
            fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          {language === 'ar' 
            ? 'تطبيق المواصلات الآمن لطلاب الجامعات في البحرين'
            : 'Safe Transportation for Bahraini University Students'
          }
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <View style={styles.featureRow}>
          <View style={styles.feature}>
            <Shield color={Colors.background} size={32} />
            <Text style={[
              styles.featureText,
              { fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular }
            ]}>
              {language === 'ar' ? 'آمن ومضمون' : 'Safe & Secure'}
            </Text>
          </View>
          <View style={styles.feature}>
            <Users color={Colors.background} size={32} />
            <Text style={[
              styles.featureText,
              { fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular }
            ]}>
              {language === 'ar' ? 'للطلاب فقط' : 'Students Only'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={[
            styles.getStartedText,
            { fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold }
          ]}>
            {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default function Welcome() {
  return (
    <LanguageProvider>
      <WelcomeContent />
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  languageText: {
    color: Colors.background,
    fontSize: 14,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  logoBackground: {
    backgroundColor: Colors.background,
    borderRadius: 60,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  appName: {
    fontSize: 48,
    color: Colors.background,
    marginBottom: 16,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: Colors.background,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginBottom: 60,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  feature: {
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    color: Colors.background,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  getStartedButton: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  getStartedText: {
    color: Colors.primary,
    fontSize: 18,
  },
});