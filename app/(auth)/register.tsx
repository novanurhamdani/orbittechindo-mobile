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
import { LinearGradient } from "expo-linear-gradient";

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
    if (loading) return;
    
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
      <LinearGradient
        colors={["#03071E", "#370617", "#6A040F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center p-6">
            <View className="p-6 rounded-2xl bg-dark-blue bg-opacity-40"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 15,
                elevation: 10,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <View className="mb-8 items-center">
                <Text className="text-3xl font-rubik-bold text-yellow mb-2">
                  Movie App
                </Text>
                <Text className="text-lg font-rubik-medium text-light-orange">
                  Create a new account
                </Text>
              </View>

              {error && (
                <View className="bg-red bg-opacity-30 p-3 rounded-lg mb-4">
                  <Text className="text-white font-rubik">{error}</Text>
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
                isPassword={true}
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
                <Text className="text-light-orange font-rubik">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text className="text-yellow font-rubik-semibold">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
