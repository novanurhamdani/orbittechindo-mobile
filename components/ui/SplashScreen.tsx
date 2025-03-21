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
        className="flex-1 justify-center items-center"
      >
        <View
          className="p-8 rounded-2xl bg-[#03071E] bg-opacity-30 backdrop-blur-lg"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.5,
            shadowRadius: 15,
            elevation: 10,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Text className="text-4xl font-rubik-bold text-[#FFBA08] mb-2">
            Movie App
          </Text>
          <Text className="text-lg font-rubik text-[#F48C06] mb-6 text-center">
            Explore your favorite movies
          </Text>
          <ActivityIndicator size="large" color="#E85D04" />
        </View>
      </LinearGradient>
    </View>
  );
}
