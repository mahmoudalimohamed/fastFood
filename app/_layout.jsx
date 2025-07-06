import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import useCustomFonts from "../hooks/useCustomFonts";

export default function RootLayout() {
  const { fontsLoaded, error } = useCustomFonts();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null; // or a loading screen component
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, padding: 2 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
