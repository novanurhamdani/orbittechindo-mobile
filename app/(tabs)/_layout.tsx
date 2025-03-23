import React, { useEffect } from "react";
import { SplashScreen, Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import icons from "@/constants/icons";
import { useFonts } from "expo-font";

const IconTab = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center justify-center">
      <Image
        source={icon}
        tintColor={focused ? "#e85d04" : "#ffffff"}
        resizeMode="contain"
        className="size-6"
      />

      <Text
        className={`${
          focused ? "text-orange font-bold" : "text-white"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("@/assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Bold": require("@/assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Medium": require("@/assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Light": require("@/assets/fonts/Rubik-Light.ttf"),
    "Rubik-SemiBold": require("@/assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-ExtraBold": require("@/assets/fonts/Rubik-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#03071e",
          position: "absolute",
          borderTopWidth: 0,
          paddingTop: 5,
          minHeight: 60,
          marginTop: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <IconTab focused={focused} title="Home" icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <IconTab focused={focused} title="Search" icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <IconTab focused={focused} title="Favorites" icon={icons.heart} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <IconTab focused={focused} title="Profile" icon={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
