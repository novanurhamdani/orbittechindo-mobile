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
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-outline" size={64} color="#F48C0640" />
              <Text style={styles.emptyText}>
                You haven't added any favorites yet
              </Text>
              <Text style={styles.emptySubText}>
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    color: "#FFBA08",
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  emptySubText: {
    color: "#F48C06",
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    opacity: 0.8,
  },
});
