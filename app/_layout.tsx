import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="birth-chart-insight" options={{ title: 'Birth Chart Insight' }} />
        <Stack.Screen name="tarot-insights" options={{ title: 'Tarot Insights' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
