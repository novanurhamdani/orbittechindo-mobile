import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  title,
  loading = false,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...rest
}: ButtonProps) {
  // Define styles based on variant
  const getBackgroundColor = () => {
    if (loading) return "bg-opacity-70";
    
    switch (variant) {
      case "primary":
        return "bg-blue-600";
      case "secondary":
        return "bg-gray-600";
      case "outline":
        return "bg-transparent";
      default:
        return "bg-blue-600";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "outline":
        return "text-blue-600";
      default:
        return "text-white";
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case "outline":
        return "border border-blue-600";
      default:
        return "";
    }
  };

  return (
    <TouchableOpacity
      className={`rounded-lg py-3 px-4 ${getBackgroundColor()} ${getBorderStyle()} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      <View className="flex-row justify-center items-center">
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === "outline" ? "#2563eb" : "white"}
          />
        ) : (
          <Text
            className={`font-semibold text-center ${getTextColor()}`}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
