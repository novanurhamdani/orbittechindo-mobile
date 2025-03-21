import React from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  error?: string;
}

export default function Input<T extends FieldValues>({
  name,
  control,
  label,
  error,
  ...rest
}: InputProps<T>) {
  return (
    <View className="mb-4">
      {label && <Text className="text-gray-700 mb-2">{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <>
            <TextInput
              className={`border rounded-lg p-3 bg-gray-50 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...rest}
            />
            {error && (
              <Text className="text-red-500 mt-1">{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
}
