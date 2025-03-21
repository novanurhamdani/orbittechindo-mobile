import { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../components/ui/SplashScreen";
import { TOKEN_KEY } from "../constants/auth";
import "./global.css";

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
  const [isLoading, setIsLoading] = useState(true);
  const { setToken } = useAuthStore();
  
  useEffect(() => {
    // Check if there's a token in AsyncStorage
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token) {
          setToken(token);
        }
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        // Simulate a splash screen for at least 1.5 seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };
    
    checkToken();
  }, [setToken]);

  useProtectedRoute();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
