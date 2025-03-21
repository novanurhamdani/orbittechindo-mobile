import React, { useState } from "react";
import { Text, TextInput, View, TextInputProps, TouchableOpacity } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

interface InputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export default function Input<T extends FieldValues>({
  name,
  control,
  label,
  error,
  isPassword,
  secureTextEntry,
  ...rest
}: InputProps<T>) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View className="mb-4">
      {label && <Text className="text-gold mb-2 font-rubik-medium">{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <>
            <View className="relative">
              <TextInput
                className={`border rounded-lg p-3 ${
                  error ? "border-bright-red" : "border-dark-purple border-opacity-30"
                } bg-dark-blue bg-opacity-50 text-white backdrop-blur-md font-rubik ${
                  isPassword ? "pr-10" : ""
                }`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="#6B7280"
                secureTextEntry={isPassword ? !passwordVisible : secureTextEntry}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3,
                  fontFamily: 'Rubik-Regular',
                }}
                {...rest}
              />
              {isPassword && (
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  className="absolute right-3 top-3"
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="#F48C06"
                  />
                </TouchableOpacity>
              )}
            </View>
            {error && (
              <Text className="text-bright-red mt-1 font-rubik">{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
}
