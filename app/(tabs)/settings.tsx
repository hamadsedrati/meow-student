import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Globe, Bell, Shield, CircleHelp as HelpCircle, Phone, LogOut, ChevronRight, Moon, Volume2, MapPin, Users } from 'lucide-react-native';

interface SettingOptionProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  rightComponent?: React.ReactNode;
}

function SettingOption({ icon, title, subtitle, onPress, showChevron = true, rightComponent }: SettingOptionProps) {
  const { language, isRTL } = useLanguage();
  
  return (
    <TouchableOpacity 
      style={styles.settingOption} 
      onPress={onPress}
      disabled={!onPress}
    >
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
      {rightComponent || (showChevron && onPress && (
        <ChevronRight 
          color={Colors.textLight} 
          size={20} 
          style={[isRTL && { transform: [{ scaleX: -1 }] }]}
        />
      ))}
    </TouchableOpacity>
  );
}

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingSection({ title, children }: SettingSectionProps) {
  const { language, isRTL } = useLanguage();
  
  return (
    <View style={styles.settingSection}>
      <Text style={[
        styles.sectionTitle,
        { 
          fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold,
          textAlign: isRTL ? 'right' : 'left'
        }
      ]}>
        {title}
      </Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      language === 'ar' ? 'تسجيل الخروج' : 'Logout',
      language === 'ar' ? 'هل أنت متأكد من رغبتك في تسجيل الخروج؟' : 'Are you sure you want to logout?',
      [
        {
          text: language === 'ar' ? 'إلغاء' : 'Cancel',
          style: 'cancel',
        },
        {
          text: language === 'ar' ? 'تسجيل الخروج' : 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout
          },
        },
      ]
    );
  };

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
            {t('settings')}
          </Text>
        </View>

        {/* General Settings */}
        <SettingSection title={language === 'ar' ? 'عام' : 'General'}>
          <SettingOption
            icon={<Globe color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'اللغة' : 'Language'}
            subtitle={language === 'ar' ? 'العربية' : 'English'}
            onPress={toggleLanguage}
          />
          <SettingOption
            icon={<Bell color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'الإشعارات' : 'Notifications'}
            subtitle={language === 'ar' ? 'إشعارات الرحلات والتحديثات' : 'Ride and app notifications'}
            showChevron={false}
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: Colors.borderLight, true: Colors.primary + '50' }}
                thumbColor={notifications ? Colors.primary : Colors.textLight}
              />
            }
          />
          <SettingOption
            icon={<Volume2 color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'الصوت' : 'Sound'}
            subtitle={language === 'ar' ? 'أصوات التطبيق والتنبيهات' : 'App sounds and alerts'}
            showChevron={false}
            rightComponent={
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: Colors.borderLight, true: Colors.primary + '50' }}
                thumbColor={soundEnabled ? Colors.primary : Colors.textLight}
              />
            }
          />
          <SettingOption
            icon={<Moon color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'الوضع الليلي' : 'Dark Mode'}
            subtitle={language === 'ar' ? 'تفعيل الوضع الليلي' : 'Enable dark theme'}
            showChevron={false}
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: Colors.borderLight, true: Colors.primary + '50' }}
                thumbColor={darkMode ? Colors.primary : Colors.textLight}
              />
            }
          />
        </SettingSection>

        {/* Privacy & Safety */}
        <SettingSection title={language === 'ar' ? 'الخصوصية والأمان' : 'Privacy & Safety'}>
          <SettingOption
            icon={<MapPin color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'مشاركة الموقع' : 'Location Sharing'}
            subtitle={language === 'ar' ? 'مشاركة الموقع مع جهات الاتصال' : 'Share location with contacts'}
            showChevron={false}
            rightComponent={
              <Switch
                value={locationSharing}
                onValueChange={setLocationSharing}
                trackColor={{ false: Colors.borderLight, true: Colors.primary + '50' }}
                thumbColor={locationSharing ? Colors.primary : Colors.textLight}
              />
            }
          />
          <SettingOption
            icon={<Shield color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'الأمان' : 'Safety'}
            subtitle={language === 'ar' ? 'إعدادات الأمان والطوارئ' : 'Safety and emergency settings'}
            onPress={() => {}}
          />
          <SettingOption
            icon={<Phone color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'جهات اتصال الطوارئ' : 'Emergency Contacts'}
            subtitle={language === 'ar' ? 'إدارة جهات اتصال الطوارئ' : 'Manage emergency contacts'}
            onPress={() => {}}
          />
          <SettingOption
            icon={<Users color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'تفضيلات الرحلة' : 'Ride Preferences'}
            subtitle={language === 'ar' ? 'تفضيلات النوع والخدمة' : 'Gender and service preferences'}
            onPress={() => {}}
          />
        </SettingSection>

        {/* Support */}
        <SettingSection title={language === 'ar' ? 'الدعم' : 'Support'}>
          <SettingOption
            icon={<HelpCircle color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'المساعدة والدعم' : 'Help & Support'}
            subtitle={language === 'ar' ? 'الأسئلة الشائعة والدعم الفني' : 'FAQ and technical support'}
            onPress={() => {}}
          />
          <SettingOption
            icon={<Phone color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            subtitle={language === 'ar' ? 'تواصل مع فريق الدعم' : 'Get in touch with support'}
            onPress={() => {}}
          />
        </SettingSection>

        {/* About */}
        <SettingSection title={language === 'ar' ? 'حول التطبيق' : 'About'}>
          <SettingOption
            icon={<Shield color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            onPress={() => {}}
          />
          <SettingOption
            icon={<HelpCircle color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
            onPress={() => {}}
          />
          <SettingOption
            icon={<Globe color={Colors.textSecondary} size={20} />}
            title={language === 'ar' ? 'إصدار التطبيق' : 'App Version'}
            subtitle="1.0.0"
            showChevron={false}
          />
        </SettingSection>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut color={Colors.error} size={20} />
            <Text style={[
              styles.logoutText,
              { fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold }
            ]}>
              {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[
            styles.appInfoText,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
              textAlign: 'center'
            }
          ]}>
            {language === 'ar' 
              ? 'وصلني - تطبيق المواصلات الآمن لطلاب الجامعات'
              : 'Waselni - Safe Transportation for University Students'
            }
          </Text>
          <Text style={[
            styles.appVersion,
            { 
              fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
              textAlign: 'center'
            }
          ]}>
            {language === 'ar' ? 'الإصدار 1.0.0' : 'Version 1.0.0'}
          </Text>
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
  settingSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionContent: {
    backgroundColor: Colors.background,
    marginHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
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
  logoutSection: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.error + '30',
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.error,
  },
  appInfo: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  appInfoText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 12,
    color: Colors.textLight,
  },
});