import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { RegisterFormData, registerSchema } from "@/types/user";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);

    try {
      const success = await register({
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      });

      if (success) {
        router.replace("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center p-6 bg-white">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-center text-blue-600 mb-2">
              Movie App
            </Text>
            <Text className="text-lg text-center text-gray-600">
              Create a new account
            </Text>
          </View>

          {error && (
            <View className="bg-red-100 p-3 rounded-lg mb-4">
              <Text className="text-red-600">{error}</Text>
            </View>
          )}

          <Input
            name="name"
            control={control}
            label="Full Name"
            placeholder="Enter your full name"
            autoCapitalize="words"
          />

          <Input
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            name="password"
            control={control}
            label="Password"
            placeholder="Create a password"
            secureTextEntry
          />

          <Input
            name="phoneNumber"
            control={control}
            label="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <Button
            title="Register"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            fullWidth
            className="mt-2"
          />

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text className="text-blue-600 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
