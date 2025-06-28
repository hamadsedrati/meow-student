import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { User, Star, Clock, CreditCard, Shield, Phone, CreditCard as Edit3, ChevronRight, Award, MapPin } from 'lucide-react-native';

interface ProfileOptionProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
}

function ProfileOption({ icon, title, subtitle, onPress, showChevron = true }: ProfileOptionProps) {
  const { language, isRTL } = useLanguage();
  
  return (
    <TouchableOpacity style={styles.profileOption} onPress={onPress}>
      <View style={[styles.optionContent, isRTL && styles.optionContentRTL]}>
        <View style={styles.optionIcon}>
          {icon}
        </View>
        <View style={styles.optionText}>
          <Text style={[
            styles.optionTitle,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.medium,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[
              styles.optionSubtitle,
              { 
                fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {showChevron && (
        <ChevronRight 
          color={Colors.textLight} 
          size={20} 
          style={[isRTL && { transform: [{ scaleX: -1 }] }]}
        />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { t, language, isRTL } = useLanguage();

  const profileStats = [
    {
      icon: <Clock color={Colors.primary} size={20} />,
      value: '24',
      label: language === 'ar' ? 'رحلة' : 'Rides',
    },
    {
      icon: <Star color={Colors.warning} size={20} />,
      value: '4.9',
      label: language === 'ar' ? 'التقييم' : 'Rating',
    },
    {
      icon: <Award color={Colors.success} size={20} />,
      value: '3',
      label: language === 'ar' ? 'شهور' : 'Months',
    },
  ];

  const profileOptions = [
    {
      icon: <User color={Colors.textSecondary} size={20} />,
      title: t('myProfile'),
      subtitle: language === 'ar' ? 'تحديث المعلومات الشخصية' : 'Update personal information',
      onPress: () => {},
    },
    {
      icon: <Clock color={Colors.textSecondary} size={20} />,
      title: t('rideHistory'),
      subtitle: language === 'ar' ? 'عرض تاريخ الرحلات' : 'View ride history',
      onPress: () => {},
    },
    {
      icon: <CreditCard color={Colors.textSecondary} size={20} />,
      title: t('paymentMethods'),
      subtitle: language === 'ar' ? 'إدارة طرق الدفع' : 'Manage payment methods',
      onPress: () => {},
    },
    {
      icon: <Phone color={Colors.textSecondary} size={20} />,
      title: t('emergencyContacts'),
      subtitle: language === 'ar' ? 'إضافة جهات اتصال الطوارئ' : 'Add emergency contacts',
      onPress: () => {},
    },
    {
      icon: <Shield color={Colors.textSecondary} size={20} />,
      title: language === 'ar' ? 'الأمان والخصوصية' : 'Safety & Privacy',
      subtitle: language === 'ar' ? 'إعدادات الأمان' : 'Security settings',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[
            styles.headerTitle,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.bold : Fonts.english.bold,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {t('profile')}
          </Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User color={Colors.primary} size={32} />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Edit3 color={Colors.background} size={12} />
              </TouchableOpacity>
            </View>
            <View style={[styles.profileInfo, isRTL && styles.profileInfoRTL]}>
              <Text style={[
                styles.profileName,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {language === 'ar' ? 'أحمد محمد علي' : 'Ahmed Mohammed Ali'}
              </Text>
              <Text style={[
                styles.profileEmail,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                ahmed.ali@uob.edu.bh
              </Text>
              <View style={styles.studentInfo}>
                <Text style={[
                  styles.studentId,
                  { 
                    fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                    textAlign: isRTL ? 'right' : 'left'
                  }
                ]}>
                  {language === 'ar' ? 'الرقم الجامعي: ' : 'Student ID: '}202012345
                </Text>
                <View style={styles.universityTag}>
                  <MapPin color={Colors.primary} size={12} />
                  <Text style={[
                    styles.universityText,
                    { fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular }
                  ]}>
                    {language === 'ar' ? 'جامعة البحرين' : 'University of Bahrain'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View style={styles.statIcon}>
                  {stat.icon}
                </View>
                <Text style={[
                  styles.statValue,
                  { fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold }
                ]}>
                  {stat.value}
                </Text>
                <Text style={[
                  styles.statLabel,
                  { fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular }
                ]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <ProfileOption
              key={index}
              icon={option.icon}
              title={option.title}
              subtitle={option.subtitle}
              onPress={option.onPress}
            />
          ))}
        </View>

        {/* Verification Status */}
        <View style={styles.verificationCard}>
          <View style={styles.verificationHeader}>
            <Shield color={Colors.success} size={24} />
            <View style={styles.verificationInfo}>
              <Text style={[
                styles.verificationTitle,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {language === 'ar' ? 'الحساب مُتحقق منه' : 'Account Verified'}
              </Text>
              <Text style={[
                styles.verificationDescription,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {language === 'ar' 
                  ? 'تم التحقق من بياناتك الجامعية بنجاح'
                  : 'Your university credentials have been verified'
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    color: Colors.text,
  },
  profileCard: {
    backgroundColor: Colors.background,
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  profileInfo: {
    flex: 1,
  },
  profileInfoRTL: {
    marginRight: 0,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  studentInfo: {
    gap: 8,
  },
  studentId: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  universityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  universityText: {
    fontSize: 12,
    color: Colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  optionsContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionContentRTL: {
    flexDirection: 'row-reverse',
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  verificationCard: {
    backgroundColor: Colors.success + '10',
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.success + '30',
  },
  verificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  verificationInfo: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: 16,
    color: Colors.success,
    marginBottom: 4,
  },
  verificationDescription: {
    fontSize: 13,
    color: Colors.success,
    opacity: 0.8,
    lineHeight: 16,
  },
});