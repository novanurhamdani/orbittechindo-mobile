import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <LinearGradient
        colors={["#03071E", "#370617", "#6A040F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 "
      >
        <Text className="text-2xl font-bold text-blue-600 mb-4">Profile</Text>
        {user && (
          <Text className="text-lg text-gray-600 mb-8">Hello, {user.name}</Text>
        )}

        <TouchableOpacity
          className="bg-blue-600 py-3 px-6 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Profile;
