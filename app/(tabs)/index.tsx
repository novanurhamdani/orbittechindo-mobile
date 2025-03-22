import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <StatusBar style="dark" />
      <Link href="/movie/avengers">Featured</Link>
      <Text className="text-2xl font-bold text-blue-600 mb-4">
        Welcome to Movie App
      </Text>
      {user && (
        <Text className="text-lg text-gray-600 mb-8">Hello, {user.name}</Text>
      )}

      <TouchableOpacity
        className="bg-blue-600 py-3 px-6 rounded-lg"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
