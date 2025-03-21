import { useEffect, useState, useCallback } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../components/ui/SplashScreen";
import { TOKEN_KEY } from "../constants/auth";
import { 
  useFonts, 
  Rubik_300Light, 
  Rubik_400Regular, 
  Rubik_500Medium, 
  Rubik_600SemiBold, 
  Rubik_700Bold,
  Rubik_800ExtraBold 
} from '@expo-google-fonts/rubik';
import * as SplashScreenExpo from 'expo-splash-screen';
import { View } from "react-native";
import "./global.css";

// Prevent the splash screen from auto-hiding
SplashScreenExpo.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

// This function checks if the user is authenticated
// and redirects to login if not
function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, token, setToken } = useAuthStore();

  useEffect(() => {
    // Skip navigation logic on first render
    if (!segments.length) return;
    
    const inAuthGroup = segments[0] === "(auth)";

    // If the user is not authenticated and not in the auth group,
    // redirect to the login page
    if (!isAuthenticated && !token && !inAuthGroup) {
      router.replace("/login");
    } else if (isAuthenticated && token && inAuthGroup) {
      // If the user is authenticated and in the auth group,
      // redirect to the home page
      router.replace("/");
    }
  }, [isAuthenticated, segments, token, router]);
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { setToken } = useAuthStore();
  
  // Load the Rubik fonts
  const [fontsLoaded, fontError] = useFonts({
    'Rubik-Light': Rubik_300Light,
    'Rubik-Regular': Rubik_400Regular,
    'Rubik-Medium': Rubik_500Medium,
    'Rubik-SemiBold': Rubik_600SemiBold,
    'Rubik-Bold': Rubik_700Bold,
    'Rubik-ExtraBold': Rubik_800ExtraBold,
  });

  // Prepare the app
  useEffect(() => {
    async function prepare() {
      try {
        // Check if there's a token in AsyncStorage
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token) {
          setToken(token);
        }
        
        // Simulate a splash screen for at least 1.5 seconds
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (error) {
        console.error("Error preparing app:", error);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, [setToken]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && (fontsLoaded || fontError)) {
      // Hide the splash screen
      await SplashScreenExpo.hideAsync();
    }
  }, [appIsReady, fontsLoaded, fontError]);

  useProtectedRoute();

  if (!appIsReady || !fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Slot />
      </View>
    </QueryClientProvider>
  );
}
