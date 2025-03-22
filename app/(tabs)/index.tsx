import React from "react";
import { Image, ScrollView, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import images from "@/constants/images";
import FeaturedMovie from "@/components/movies/FeaturedMovie";

export default function Index() {
  return (
    <View className="flex-1 bg-dark-blue">
      <StatusBar style="light" />
      <LinearGradient
        colors={["#03071E", "#370617", "#6A040F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 "
      >
        <ScrollView
          className="pt-12 px-4 pb-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >
          <View className="flex flex-row items-center justify-center">
            <Image source={images.logo} className="w-14 h-14" />
            <Text className="text-orange text-3xl font-semibold">MovieNov</Text>
          </View>

          <FeaturedMovie />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
