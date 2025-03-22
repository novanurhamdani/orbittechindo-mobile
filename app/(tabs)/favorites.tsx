import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const Favorites = () => {
  return (
    <View className="flex-1 bg-dark-blue">
      <StatusBar style="light" />
      <LinearGradient
        colors={["#03071E", "#370617", "#6A040F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 "
      >
        <Text>Favorites</Text>
      </LinearGradient>
    </View>
  );
};

export default Favorites;
