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
      {label && <Text className="text-[#FAA307] mb-2 font-rubik-medium">{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <>
            <TextInput
              className={`border rounded-lg p-3 ${
                error ? "border-[#D00000]" : "border-[#370617] border-opacity-30"
              } bg-[#03071E] bg-opacity-50 text-white backdrop-blur-md font-rubik`}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor="#6B7280"
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
            {error && (
              <Text className="text-[#D00000] mt-1 font-rubik">{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
}
