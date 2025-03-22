import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Share,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { getMovieById } from "../../services/api";
import { MovieDetail } from "../../types/movie";
import { useFavoritesStore } from "@/store/favoritesStore";
import MovieDetailInfo from "@/components/movies/MovieDetailInfo";
import MovieAnalytic from "@/components/movies/MovieAnalytic";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "charts">("info");
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const isMovieFavorite = id ? isFavorite(id) : false;

  const toggleFavorite = () => {
    if (!movie) return;

    if (isMovieFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type || "movie",
        Poster: movie.Poster,
      });
    }
  };

  const shareMovie = async () => {
    if (!movie) return;

    try {
      await Share.share({
        message: `Check out this movie: ${movie.Title} (${movie.Year}) - IMDb Rating: ${movie.imdbRating}/10`,
        title: movie.Title,
      });
    } catch (error) {
      console.error("Error sharing movie:", error);
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const movieData = await getMovieById(id);
        if (movieData.Response === "True") {
          setMovie(movieData);
        } else {
          setError("Failed to load movie details");
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-dark-blue">
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#E85D04" />
        <Text className="text-light-orange font-rubik mt-2">
          Loading movie details...
        </Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 justify-center items-center bg-dark-blue">
        <StatusBar style="light" />
        <Text className="text-red font-rubik-medium mb-2">
          ⚠️ {error || "Movie not found"}
        </Text>
        <TouchableOpacity
          className="bg-orange-red px-4 py-2 rounded-lg mt-2"
          onPress={() => router.back()}
        >
          <Text className="text-white font-rubik">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-dark-blue">
      <StatusBar style="light" />

      {/* Movie Poster Header */}
      <View className="h-80">
        <Image
          source={{
            uri:
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/500x750?text=No+Poster",
          }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(3, 7, 30, 0.8)", "#03071E"]}
          style={[StyleSheet.absoluteFillObject, { height: "100%" }]}
        >
          <View className="flex-row justify-between items-start p-4 pt-12">
            <TouchableOpacity
              className="p-2 bg-dark-blue bg-opacity-50 rounded-full"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#F48C06" />
            </TouchableOpacity>
            <View className="flex-row">
              <TouchableOpacity
                className="p-2 bg-dark-blue bg-opacity-50 rounded-full mr-2"
                onPress={toggleFavorite}
              >
                <Ionicons
                  name={isMovieFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isMovieFavorite ? "#D00000" : "#F48C06"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2 bg-dark-blue bg-opacity-50 rounded-full"
                onPress={shareMovie}
              >
                <Ionicons name="share-outline" size={24} color="#F48C06" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Content */}
      <LinearGradient
        colors={["#03071E", "#370617", "#6A040F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 -mt-12 rounded-t-3xl"
      >
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "info" && styles.activeTab]}
            onPress={() => setActiveTab("info")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "info" && styles.activeTabText,
              ]}
            >
              Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "charts" && styles.activeTab]}
            onPress={() => setActiveTab("charts")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "charts" && styles.activeTabText,
              ]}
            >
              Analytics
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 pt-4 px-4">
          {activeTab === "info" ? (
            // Info Tab Content
            <MovieDetailInfo movie={movie} />
          ) : (
            // Charts Tab Content
            <MovieAnalytic movie={movie} />
          )}

          <View className="h-20" />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    marginTop: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#E85D04",
  },
  tabText: {
    color: "#F48C06",
    fontFamily: "Rubik-Medium",
    fontSize: 16,
  },
  activeTabText: {
    color: "#FFBA08",
  },
});
