import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useFavoritesStore } from "@/store/favoritesStore";
import MovieCard from "@/components/movies/MovieCard";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

const Favorites = () => {
  const { favorites } = useFavoritesStore();
  const [refreshKey, setRefreshKey] = React.useState(0);

  // Force re-render when screen is focused to update favorites list
  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prev) => prev + 1);
    }, [])
  );

  return (
    <View className="flex-1 bg-dark-blue">
      <StatusBar style="light" />
      <LinearGradient
        colors={["#03071E", "#370617", "#6A040F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        {/* Header */}
        <View className="pt-12 px-4 pb-4">
          <Text className="text-xl font-rubik-bold text-yellow">
            My Favorites
          </Text>
        </View>

        {/* Content */}
        <View className="flex-1 px-4 mb-10">
          {favorites.length > 0 ? (
            <FlatList
              key={`favorites-list-${refreshKey}`}
              data={favorites}
              renderItem={({ item }) => <MovieCard item={item} />}
              keyExtractor={(item) => item.imdbID}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              columnWrapperStyle={styles.columnWrapper}
            />
          ) : (
            <View className="flex-1 justify-center items-center p-20">
              <Ionicons name="heart-outline" size={64} color="#F48C0640" />
              <Text className="text-yellow font-rubik-medium text-[16px]  text-center mt-4">
                You haven't added any favorites yet
              </Text>
              <Text className="text-light-orange font-rubik text-center mt-2 opacity-80">
                Tap the heart icon on a movie to add it to your favorites
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
