import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FEATURED_MOVIES } from "@/constants/api";
import { getMovieById } from "@/services/api";
import { MovieDetail } from "@/types/movie";
import AnimationParallax from "@/components/carousel/AnimationParallax";

export default function FeaturedMovie() {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const moviePromises = FEATURED_MOVIES.map((id) => getMovieById(id));
        const moviesData = await Promise.all(moviePromises);
        setMovies(moviesData);
      } catch (err) {
        console.error("Error fetching featured movies:", err);
        setError("Failed to load featured movies");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  if (loading) {
    return (
      <View className="h-72 justify-center items-center bg-dark-blue bg-opacity-30 rounded-xl mx-4 my-2">
        <ActivityIndicator size="large" color="#E85D04" />
        <Text className="text-light-orange font-rubik mt-2">
          Loading featured movies...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="h-72 justify-center items-center bg-dark-blue bg-opacity-30 rounded-xl mx-4 my-2">
        <Text className="text-red font-rubik-medium mb-2">⚠️ {error}</Text>
        <TouchableOpacity
          className="bg-orange-red px-4 py-2 rounded-lg"
          onPress={() => {
            setMovies([]);
            setLoading(true);
            // Retry loading
            const fetchFeaturedMovies = async () => {
              try {
                const moviePromises = FEATURED_MOVIES.map((id) =>
                  getMovieById(id)
                );
                const moviesData = await Promise.all(moviePromises);
                setMovies(moviesData);
                setError(null);
              } catch (err) {
                setError("Failed to load featured movies");
              } finally {
                setLoading(false);
              }
            };
            fetchFeaturedMovies();
          }}
        >
          <Text className="text-white font-rubik">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="my-2">
      <Text className="text-xl font-rubik-semibold text-yellow mt-6 mb-2">
        Featured Movies
      </Text>

      <AnimationParallax movies={movies} />
    </View>
  );
}
