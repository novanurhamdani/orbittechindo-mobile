import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen() {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#03071E", "#370617", "#6A040F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 justify-center items-center gradient-primary"
      >
        <View
          className="p-8 rounded-2xl glass"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.5,
            shadowRadius: 15,
            elevation: 10,
          }}
        >
          <Text className="text-4xl font-rubik-bold text-yellow mb-2">
            Movie App
          </Text>
          <Text className="text-lg font-rubik text-light-orange mb-6 text-center">
            Explore your favorite movies
          </Text>
          <ActivityIndicator size="large" color="#E85D04" />
        </View>
      </LinearGradient>
    </View>
  );
}
