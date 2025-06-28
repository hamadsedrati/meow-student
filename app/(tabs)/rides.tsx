import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { 
  Car, 
  Clock, 
  MapPin, 
  Star,
  Filter,
  Calendar,
  ChevronRight
} from 'lucide-react-native';

interface RideCardProps {
  ride: {
    id: string;
    type: 'completed' | 'upcoming' | 'cancelled';
    service: string;
    from: string;
    to: string;
    date: string;
    time: string;
    driver: string;
    rating?: number;
    fare: string;
    status: string;
  };
}

function RideCard({ ride }: RideCardProps) {
  const { language, isRTL } = useLanguage();

  const getStatusColor = () => {
    switch (ride.type) {
      case 'completed': return Colors.success;
      case 'upcoming': return Colors.primary;
      case 'cancelled': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <View style={[styles.rideHeaderLeft, isRTL && styles.rideHeaderLeftRTL]}>
          <View style={[styles.serviceIndicator, { backgroundColor: getStatusColor() }]}>
            <Car color={Colors.background} size={16} />
          </View>
          <View>
            <Text style={[
              styles.rideService,
              { 
                fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {ride.service}
            </Text>
            <Text style={[
              styles.rideDateTime,
              { 
                fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {ride.date} • {ride.time}
            </Text>
          </View>
        </View>
        <View style={styles.rideHeaderRight}>
          <Text style={[
            styles.rideFare,
            { fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold }
          ]}>
            {ride.fare}
          </Text>
          <Text style={[
            styles.rideStatus,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
              color: getStatusColor()
            }
          ]}>
            {ride.status}
          </Text>
        </View>
      </View>

      <View style={styles.rideRoute}>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: Colors.primary }]} />
          <Text style={[
            styles.routeText,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {ride.from}
          </Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: Colors.secondary }]} />
          <Text style={[
            styles.routeText,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {ride.to}
          </Text>
        </View>
      </View>

      <View style={styles.rideFooter}>
        <Text style={[
          styles.driverName,
          { 
            fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          {language === 'ar' ? 'السائق: ' : 'Driver: '}{ride.driver}
        </Text>
        {ride.rating && (
          <View style={styles.rating}>
            <Star color={Colors.warning} size={16} fill={Colors.warning} />
            <Text style={[
              styles.ratingText,
              { fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular }
            ]}>
              {ride.rating}
            </Text>
          </View>
        )}
        <ChevronRight 
          color={Colors.textLight} 
          size={16} 
          style={[isRTL && { transform: [{ scaleX: -1 }] }]}
        />
      </View>
    </TouchableOpacity>
  );
}

export default function RidesScreen() {
  const { t, language, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');

  const rides = [
    {
      id: '1',
      type: 'completed' as const,
      service: language === 'ar' ? 'خدمة وصالة' : 'Wassalah Service',
      from: language === 'ar' ? 'جامعة البحرين' : 'University of Bahrain',
      to: language === 'ar' ? 'مجمع السيف' : 'Seef Mall',
      date: '2024-01-15',
      time: '14:30',
      driver: language === 'ar' ? 'فاطمة أحمد' : 'Fatima Ahmed',
      rating: 4.8,
      fare: '2.5 BD',
      status: language === 'ar' ? 'مكتملة' : 'Completed',
    },
    {
      id: '2',
      type: 'upcoming' as const,
      service: language === 'ar' ? 'خدمة الباص' : 'Minibus Service',
      from: language === 'ar' ? 'البيت' : 'Home',
      to: language === 'ar' ? 'جامعة البحرين' : 'University of Bahrain',
      date: '2024-01-16',
      time: '08:00',
      driver: language === 'ar' ? 'محمد علي' : 'Mohammed Ali',
      fare: '1.8 BD',
      status: language === 'ar' ? 'قادمة' : 'Upcoming',
    },
    {
      id: '3',
      type: 'completed' as const,
      service: language === 'ar' ? 'مشاركة السيارة' : 'Student Carpooling',
      from: language === 'ar' ? 'البوليتكنك البحرين' : 'Bahrain Polytechnic',
      to: language === 'ar' ? 'مدينة عيسى' : 'Isa Town',
      date: '2024-01-14',
      time: '16:45',
      driver: language === 'ar' ? 'سارة خالد' : 'Sara Khalid',
      rating: 4.9,
      fare: '3.0 BD',
      status: language === 'ar' ? 'مكتملة' : 'Completed',
    },
  ];

  const filteredRides = rides.filter(ride => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return ride.type === 'upcoming';
    if (activeTab === 'completed') return ride.type === 'completed';
    return true;
  });

  const tabs = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'All' },
    { id: 'upcoming', label: language === 'ar' ? 'القادمة' : 'Upcoming' },
    { id: 'completed', label: language === 'ar' ? 'المكتملة' : 'Completed' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[
          styles.headerTitle,
          { 
            fontFamily: language === 'ar' ? Fonts.arabic.bold : Fonts.english.bold,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          {t('rides')}
        </Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={Colors.textSecondary} size={20} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id as any)}
            >
              <Text style={[
                styles.tabText,
                { fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.medium },
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Rides List */}
      <ScrollView style={styles.ridesContainer} showsVerticalScrollIndicator={false}>
        {filteredRides.length > 0 ? (
          filteredRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Car color={Colors.textLight} size={48} />
            <Text style={[
              styles.emptyStateTitle,
              { 
                fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
                textAlign: 'center'
              }
            ]}>
              {language === 'ar' ? 'لا توجد رحلات' : 'No rides found'}
            </Text>
            <Text style={[
              styles.emptyStateDescription,
              { 
                fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                textAlign: 'center'
              }
            ]}>
              {language === 'ar' 
                ? 'ابدأ رحلتك الأولى من الصفحة الرئيسية'
                : 'Start your first ride from the home screen'
              }
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    color: Colors.text,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  tabsContainer: {
    paddingBottom: 16,
  },
  tabsContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.background,
  },
  ridesContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  rideCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rideHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rideHeaderLeftRTL: {
    flexDirection: 'row-reverse',
  },
  serviceIndicator: {
    borderRadius: 8,
    padding: 8,
  },
  rideService: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  rideDateTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  rideHeaderRight: {
    alignItems: 'flex-end',
  },
  rideFare: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  rideStatus: {
    fontSize: 12,
  },
  rideRoute: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: Colors.borderLight,
    marginLeft: 3,
    marginBottom: 8,
  },
  routeText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  rideFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverName: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    paddingHorizontal: 40,
  },
});