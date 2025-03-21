import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-600">
      <Text className="text-3xl font-bold text-white mb-6">Movie App</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
