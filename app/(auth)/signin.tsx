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
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { ArrowLeft, Eye, EyeOff, Globe } from 'lucide-react-native';

export default function SignIn() {
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid university email');
      return;
    }

    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
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

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={[
              styles.title,
              { 
                fontFamily: language === 'ar' ? Fonts.arabic.bold : Fonts.english.bold,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {t('signIn')}
            </Text>
            <Text style={[
              styles.subtitle,
              {
                fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {language === 'ar' 
                ? 'ادخل بياناتك للوصول إلى حسابك'
                : 'Enter your credentials to access your account'
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
                value={email}
                onChangeText={setEmail}
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
                  value={password}
                  onChangeText={setPassword}
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[
                styles.forgotPasswordText,
                { 
                  fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {t('forgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.signInButton, loading && styles.signInButtonDisabled]}
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text style={[
                styles.signInButtonText,
                { fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold }
              ]}>
                {loading 
                  ? (language === 'ar' ? 'جاري التحقق...' : 'Signing In...')
                  : t('signIn')
                }
              </Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={[
                styles.signUpText,
                { fontFamily: language === 'ar' ? Fonts.arabic.regular : Fonts.english.regular }
              ]}>
                {language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}
              </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={[
                  styles.signUpLink,
                  { fontFamily: language === 'ar' ? Fonts.arabic.semiBold : Fonts.english.semiBold }
                ]}>
                  {t('signUp')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
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
    flex: 1,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  signInButton: {
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
  signInButtonDisabled: {
    backgroundColor: Colors.textLight,
  },
  signInButtonText: {
    color: Colors.background,
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  signUpText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  signUpLink: {
    color: Colors.primary,
    fontSize: 14,
  },
});