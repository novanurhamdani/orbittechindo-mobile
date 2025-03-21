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
  onPress,
  ...rest
}: ButtonProps) {
  // Define styles based on variant
  const getBackgroundColor = () => {
    if (loading) return "bg-opacity-70";
    
    switch (variant) {
      case "primary":
        return "bg-orange";
      case "secondary":
        return "bg-dark-purple";
      case "outline":
        return "bg-transparent";
      default:
        return "bg-orange";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "outline":
        return "text-light-orange";
      default:
        return "text-white";
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case "outline":
        return "border border-light-orange";
      default:
        return "";
    }
  };

  // Improved press handler to prevent double press
  const handlePress = (e: any) => {
    if (loading || rest.disabled) return;
    if (onPress) onPress(e);
  };

  return (
    <TouchableOpacity
      className={`rounded-lg py-3 px-4 ${getBackgroundColor()} ${getBorderStyle()} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={loading || rest.disabled}
      onPress={handlePress}
      activeOpacity={0.7}
      {...rest}
      style={[
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        },
        rest.style,
      ]}
    >
      <View className="flex-row justify-center items-center">
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === "outline" ? "#F48C06" : "white"}
          />
        ) : (
          <Text
            className={`font-rubik-semibold text-center ${getTextColor()}`}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
