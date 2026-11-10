import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  useFonts,
  Gaegu_300Light,
  Gaegu_400Regular,
  Gaegu_700Bold,
} from "@expo-google-fonts/gaegu";
import { ComandaProvider } from "../contexts/ComandaContext";

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Gaegu_300Light,
    Gaegu_400Regular,
    Gaegu_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ComandaProvider>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              header: () => <Header />,
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ComandaProvider>
      </SafeAreaProvider>
    </SafeAreaView>
  );
}

export default RootLayout;
