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
        setError("Invalid email or password");
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
        <View className="flex-1 justify-center p-6 bg-white">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-center text-blue-600 mb-2">
              Movie App
            </Text>
            <Text className="text-lg text-center text-gray-600">
              Sign in to your account
            </Text>
          </View>

          {error && (
            <View className="bg-red-100 p-3 rounded-lg mb-4">
              <Text className="text-red-600">{error}</Text>
            </View>
          )}

          <Input
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />

          <Input
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password?.message}
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
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text className="text-blue-600 font-semibold">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
