import { Stack } from 'expo-router';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Savings Tracker' }} />
        <Stack.Screen name="add" options={{ title: 'Add Savings' }} />
        <Stack.Screen name="history" options={{ title: 'Savings History' }} />
      </Stack>
    </ThemeProvider>
  );
}
