import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { getMovieById } from "../../services/api";
import { MovieDetail } from "../../types/movie";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <View className="h-72">
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
          </View>
        </LinearGradient>
      </View>

      {/* Content */}
      <LinearGradient
        colors={["#03071E", "#370617", "#6A040F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 -mt-10 rounded-t-3xl"
      >
        <ScrollView className="flex-1 pt-6 px-4">
          <Text className="text-2xl font-rubik-bold text-yellow mb-1">
            {movie.Title}
          </Text>

          <View className="flex-row flex-wrap mb-4">
            <Text className="text-light-orange font-rubik mr-2">
              {movie.Year}
            </Text>
            <Text className="text-light-orange font-rubik mr-2">•</Text>
            <Text className="text-light-orange font-rubik mr-2">
              {movie.Runtime}
            </Text>
            <Text className="text-light-orange font-rubik mr-2">•</Text>
            <Text className="text-light-orange font-rubik">{movie.Rated}</Text>
          </View>

          <View className="flex-row items-center mb-4">
            <View className="bg-gold px-2 py-1 rounded mr-3">
              <Text className="text-dark-blue font-rubik-bold">IMDb</Text>
            </View>
            <Text className="text-yellow font-rubik-medium">
              {movie.imdbRating}/10
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-lg font-rubik-medium text-yellow mb-2">
              Overview
            </Text>
            <Text className="text-white font-rubik leading-5">
              {movie.Plot}
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-lg font-rubik-medium text-yellow mb-2">
              Genre
            </Text>
            <View className="flex-row flex-wrap">
              {movie.Genre.split(", ").map((genre, index) => (
                <View
                  key={index}
                  className="bg-dark-blue bg-opacity-40 px-3 py-1 rounded-full mr-2 mb-2"
                >
                  <Text className="text-light-orange font-rubik">{genre}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-lg font-rubik-medium text-yellow mb-2">
              Cast
            </Text>
            <Text className="text-white font-rubik">{movie.Actors}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-lg font-rubik-medium text-yellow mb-2">
              Director
            </Text>
            <Text className="text-white font-rubik">{movie.Director}</Text>
          </View>

          {movie.Awards !== "N/A" && (
            <View className="mb-4">
              <Text className="text-lg font-rubik-medium text-yellow mb-2">
                Awards
              </Text>
              <Text className="text-white font-rubik">{movie.Awards}</Text>
            </View>
          )}

          <View className="h-10" />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
