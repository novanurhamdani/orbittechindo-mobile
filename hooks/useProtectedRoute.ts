import { TOKEN_KEY } from "@/constants/auth";
import { useAuthStore } from "@/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

// This function checks if the user is authenticated
// and redirects to login if not
export function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, token, setToken } = useAuthStore();

  useEffect(() => {
    // Check for token in AsyncStorage on first load
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
      }
    };

    checkToken();
  }, [setToken]);

  useEffect(() => {
    // Skip navigation logic on first render
    if (!segments.length) return;

    const inAuthGroup = segments[0] === "(auth)";

    // Check if the route should be protected
    const isProtectedRoute =
      segments[0] === "(tabs)" ||
      (segments[0] === "movie" && segments.length > 1);

    // If the user is not authenticated and trying to access a protected route,
    // redirect to the login page
    if (!isAuthenticated && !token && isProtectedRoute) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && token && inAuthGroup) {
      // If the user is authenticated and in the auth group,
      // redirect to the home page
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, token, router]);
}
