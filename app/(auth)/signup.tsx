import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { ArrowLeft, Eye, EyeOff, Globe } from 'lucide-react-native';

export default function SignUp() {
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.studentId || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid university email');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 2000);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSignIn = () => {
    router.push('/(auth)/signin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleGoBack} 
            style={[styles.backButton, isRTL && styles.backButtonRTL]}
          >
            <ArrowLeft color={Colors.text} size={24} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
            <Globe color={Colors.textSecondary} size={20} />
            <Text style={[styles.languageText, { fontFamily: Fonts.english.medium }]}>
              {language === 'en' ? 'ع' : 'EN'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={[
                styles.title,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.bold : Fonts.english.bold,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {t('signUp')}
              </Text>
              <Text style={[
                styles.subtitle,
                {
                  fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {language === 'ar' 
                  ? 'أنشئ حسابك للبدء في استخدام وصلني'
                  : 'Create your account to start using Waselni'
                }
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { 
                    fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.medium,
                    textAlign: isRTL ? 'right' : 'left'
                  }
                ]}>
                  {t('studentEmail')}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  placeholder={language === 'ar' ? 'student@uob.edu.bh' : 'student@uob.edu.bh'}
                  placeholderTextColor={Colors.textLight}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { 
                    fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.medium,
                    textAlign: isRTL ? 'right' : 'left'
                  }
                ]}>
                  {t('studentId')}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}
                  value={formData.studentId}
                  onChangeText={(value) => handleInputChange('studentId', value)}
                  placeholder={language === 'ar' ? '202012345' : '202012345'}
                  placeholderTextColor={Colors.textLight}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { 
                    fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.medium,
                    textAlign: isRTL ? 'right' : 'left'
                  }
                ]}>
                  {t('password')}
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      { 
                        fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                        textAlign: isRTL ? 'right' : 'left'
                      }
                    ]}
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    placeholder={language === 'ar' ? 'كلمة المرور' : 'Enter password'}
                    placeholderTextColor={Colors.textLight}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff color={Colors.textLight} size={20} />
                    ) : (
                      <Eye color={Colors.textLight} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { 
                    fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.medium,
                    textAlign: isRTL ? 'right' : 'left'
                  }
                ]}>
                  {t('confirmPassword')}
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      { 
                        fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                        textAlign: isRTL ? 'right' : 'left'
                      }
                    ]}
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    placeholder={language === 'ar' ? 'أعد كتابة كلمة المرور' : 'Confirm password'}
                    placeholderTextColor={Colors.textLight}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff color={Colors.textLight} size={20} />
                    ) : (
                      <Eye color={Colors.textLight} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
                onPress={handleSignUp}
                disabled={loading}
              >
                <Text style={[
                  styles.signUpButtonText,
                  { fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold }
                ]}>
                  {loading 
                    ? (language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating Account...')
                    : t('signUp')
                  }
                </Text>
              </TouchableOpacity>

              <View style={styles.signInContainer}>
                <Text style={[
                  styles.signInText,
                  { fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular }
                ]}>
                  {language === 'ar' ? 'لديك حساب بالفعل؟' : "Already have an account?"}
                </Text>
                <TouchableOpacity onPress={handleSignIn}>
                  <Text style={[
                    styles.signInLink,
                    { fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold }
                  ]}>
                    {t('signIn')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonRTL: {
    transform: [{ scaleX: -1 }],
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  languageText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: Colors.background,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 50,
    fontSize: 16,
    backgroundColor: Colors.background,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 14,
    padding: 4,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  signUpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signUpButtonDisabled: {
    backgroundColor: Colors.textLight,
  },
  signUpButtonText: {
    color: Colors.background,
    fontSize: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  signInText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  signInLink: {
    color: Colors.primary,
    fontSize: 14,
  },
});