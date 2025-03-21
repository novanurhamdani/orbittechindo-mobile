import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AuthLayout() {
  return (
    <LinearGradient
      colors={['#03071E', '#370617', '#6A040F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <StatusBar style="light" />
      <Slot />
    </LinearGradient>
  );
}
