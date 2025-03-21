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
import { LoginFormData, loginSchema } from "@/types/user";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const success = await login({
        email: data.email,
        password: data.password,
      });

      if (success) {
        router.replace("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
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
        <View className="flex-1 justify-center p-6">
          <View
            className="p-6 rounded-2xl bg-[#03071E] bg-opacity-40 backdrop-blur-lg"
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
              <Text className="text-3xl font-rubik-bold text-[#FFBA08] mb-2">
                Movie App
              </Text>
              <Text className="text-lg font-rubik-medium text-[#F48C06]">
                Sign in to your account
              </Text>
            </View>

            {error && (
              <View className="bg-[#9D0208] bg-opacity-30 p-3 rounded-lg mb-4">
                <Text className="text-white font-rubik">{error}</Text>
              </View>
            )}

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
              placeholder="Enter your password"
              isPassword={true}
            />

            <Button
              title="Sign In"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              fullWidth
              className="mt-2"
            />

            <View className="flex-row justify-center mt-6">
              <Text className="text-[#F48C06] font-rubik">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text className="text-[#FFBA08] font-rubik-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
