import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { 
  MapPin, 
  Search, 
  Bus, 
  Car, 
  Users, 
  Shield, 
  Clock,
  Bell,
  Globe,
  ChevronRight
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onPress: () => void;
}

function ServiceCard({ title, description, icon, color, onPress }: ServiceCardProps) {
  const { language, isRTL } = useLanguage();
  
  return (
    <TouchableOpacity style={[styles.serviceCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.serviceIconContainer}>
        <View style={[styles.serviceIcon, { backgroundColor: color + '20' }]}>
          {icon}
        </View>
      </View>
      <View style={[styles.serviceContent, isRTL && styles.serviceContentRTL]}>
        <Text style={[
          styles.serviceTitle,
          { 
            fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          {title}
        </Text>
        <Text style={[
          styles.serviceDescription,
          { 
            fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          {description}
        </Text>
      </View>
      <ChevronRight 
        color={Colors.textLight} 
        size={20} 
        style={[isRTL && { transform: [{ scaleX: -1 }] }]}
      />
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServicePress = (serviceType: string) => {
    setSelectedService(serviceType);
    // Navigate to booking screen with service type
  };

  const handleLocationPress = () => {
    // Open location picker
  };

  const services = [
    {
      id: 'minibus',
      title: t('minibusService'),
      description: t('minibusDescription'),
      icon: <Bus color={Colors.maleService} size={24} />,
      color: Colors.maleService,
    },
    {
      id: 'wassalah',
      title: t('wassalahService'),
      description: t('wassalahDescription'),
      icon: <Car color={Colors.femaleService} size={24} />,
      color: Colors.femaleService,
    },
    {
      id: 'carpooling',
      title: t('carpooling'),
      description: t('carpoolingDescription'),
      icon: <Users color={Colors.primary} size={24} />,
      color: Colors.primary,
    },
  ];

  const quickLocations = [
    { id: 'uob', name: t('universityOfBahrain'), distance: '2.5 km' },
    { id: 'polytechnic', name: t('bahrainPolytechnic'), distance: '3.1 km' },
    { id: 'ama', name: t('amaInternational'), distance: '4.2 km' },
    { id: 'gulf', name: t('gulfUniversity'), distance: '5.8 km' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerContent, isRTL && styles.headerContentRTL]}>
            <View>
              <Text style={[
                styles.greeting,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {language === 'ar' ? 'أهلاً وسهلاً' : 'Good morning'}
              </Text>
              <Text style={[
                styles.userName,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed'}
              </Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Bell color={Colors.textSecondary} size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleLanguage} style={styles.headerButton}>
                <Globe color={Colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Location Selector */}
        <View style={styles.locationSection}>
          <Text style={[
            styles.sectionTitle,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {t('whereToGo')}
          </Text>
          
          <TouchableOpacity style={styles.locationCard} onPress={handleLocationPress}>
            <View style={styles.locationInput}>
              <MapPin color={Colors.primary} size={20} />
              <Text style={[
                styles.locationPlaceholder,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {t('pickupLocation')}
              </Text>
            </View>
            <Search color={Colors.textLight} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.locationCard} onPress={handleLocationPress}>
            <View style={styles.locationInput}>
              <MapPin color={Colors.secondary} size={20} />
              <Text style={[
                styles.locationPlaceholder,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {t('destination')}
              </Text>
            </View>
            <Search color={Colors.textLight} size={20} />
          </TouchableOpacity>
        </View>

        {/* Services */}
        <View style={styles.servicesSection}>
          <Text style={[
            styles.sectionTitle,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {language === 'ar' ? 'خدمات النقل' : 'Transportation Services'}
          </Text>
          
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              color={service.color}
              onPress={() => handleServicePress(service.id)}
            />
          ))}
        </View>

        {/* Quick Locations */}
        <View style={styles.quickLocationsSection}>
          <Text style={[
            styles.sectionTitle,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {language === 'ar' ? 'الجامعات القريبة' : 'Nearby Universities'}
          </Text>
          
          {quickLocations.map((location) => (
            <TouchableOpacity key={location.id} style={styles.quickLocationCard}>
              <View style={[styles.quickLocationContent, isRTL && styles.quickLocationContentRTL]}>
                <View style={styles.locationIconContainer}>
                  <MapPin color={Colors.primary} size={16} />
                </View>
                <View style={styles.locationInfo}>
                  <Text style={[
                    styles.locationName,
                    { 
                      fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.medium,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {location.name}
                  </Text>
                  <Text style={[
                    styles.locationDistance,
                    { 
                      fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {location.distance}
                  </Text>
                </View>
              </View>
              <ChevronRight 
                color={Colors.textLight} 
                size={16} 
                style={[isRTL && { transform: [{ scaleX: -1 }] }]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Safety Notice */}
        <View style={styles.safetySection}>
          <View style={styles.safetyCard}>
            <Shield color={Colors.primary} size={24} />
            <View style={styles.safetyContent}>
              <Text style={[
                styles.safetyTitle,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {language === 'ar' ? 'رحلة آمنة' : 'Safe Journey'}
              </Text>
              <Text style={[
                styles.safetyDescription,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {language === 'ar' 
                  ? 'جميع السائقين معتمدون ومتحققون'
                  : 'All drivers are verified and background checked'
                }
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContentRTL: {
    flexDirection: 'row-reverse',
  },
  greeting: {
    color: Colors.background,
    fontSize: 14,
    opacity: 0.9,
  },
  userName: {
    color: Colors.background,
    fontSize: 20,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  locationSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  locationCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  locationPlaceholder: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  servicesSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  serviceCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderLeftWidth: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceIconContainer: {
    marginRight: 12,
  },
  serviceContentRTL: {
    marginRight: 0,
    marginLeft: 12,
  },
  serviceIcon: {
    borderRadius: 8,
    padding: 8,
  },
  serviceContent: {
    flex: 1,
    marginRight: 12,
  },
  serviceTitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  quickLocationsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  quickLocationCard: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  quickLocationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quickLocationContentRTL: {
    flexDirection: 'row-reverse',
  },
  locationIconContainer: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
    padding: 6,
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 2,
  },
  locationDistance: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  safetySection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  safetyCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  safetyContent: {
    flex: 1,
  },
  safetyTitle: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
  },
  safetyDescription: {
    fontSize: 14,
    color: Colors.primary,
    opacity: 0.8,
    lineHeight: 18,
  },
});