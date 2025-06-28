import { Stack } from 'expo-router';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function AuthLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
      </Stack>
    </LanguageProvider>
  );
}