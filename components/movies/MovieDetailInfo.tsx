import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MovieDetail } from "@/types/movie";

const MovieDetailInfo = ({ movie }: { movie: MovieDetail }) => {
  return (
    <>
      {/* Title */}
      <Text className="text-2xl font-rubik-bold text-yellow mb-1">
        {movie.Title}
      </Text>

      {/* Detail Movie */}
      <View className="flex-row flex-wrap mb-4">
        <Text className="text-light-orange font-rubik mr-2">{movie.Year}</Text>
        <Text className="text-light-orange font-rubik mr-2">•</Text>
        <Text className="text-light-orange font-rubik mr-2">
          {movie.Runtime}
        </Text>
        <Text className="text-light-orange font-rubik mr-2">•</Text>
        <Text className="text-light-orange font-rubik">{movie.Rated}</Text>
      </View>

      {/* Rating Section */}
      <View className="flex-row items-center mb-4">
        <View className="bg-gold px-2 py-1 rounded mr-3">
          <Text className="text-dark-blue font-rubik-bold">IMDb</Text>
        </View>
        <Text className="text-yellow font-rubik-medium">
          {movie.imdbRating}/10
        </Text>
        {movie.imdbVotes !== "N/A" && (
          <Text className="text-light-orange font-rubik ml-2">
            ({parseInt(movie.imdbVotes.replace(/,/g, "")).toLocaleString()}{" "}
            votes)
          </Text>
        )}
      </View>

      {/* Overview */}
      <View className="mb-4">
        <Text className="text-lg font-rubik-medium text-yellow mb-2">
          Overview
        </Text>
        <Text className="text-white font-rubik leading-5">{movie.Plot}</Text>
      </View>

      {/* Genre */}
      <View className="mb-4">
        <Text className="text-lg font-rubik-medium text-yellow mb-2">
          Genre
        </Text>
        <View className="flex-row flex-wrap">
          {movie.Genre.split(", ").map((genre, index) => (
            <View
              key={index}
              className="bg-dark-blue bg-opacity-40 px-3 py-1 rounded-full mr-2 mb-2 border border-orange-red border-opacity-30"
            >
              <Text className="text-light-orange font-rubik">{genre}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Cast */}
      <View className="mb-4">
        <Text className="text-lg font-rubik-medium text-yellow mb-2">Cast</Text>
        <View className="bg-dark-blue bg-opacity-40 p-3 rounded-lg border border-orange-red border-opacity-20">
          <Text className="text-white font-rubik">{movie.Actors}</Text>
        </View>
      </View>

      {/* Director */}
      <View className="mb-4">
        <Text className="text-lg font-rubik-medium text-yellow mb-2">
          Director
        </Text>
        <View className="bg-dark-blue bg-opacity-40 p-3 rounded-lg border border-orange-red border-opacity-20">
          <Text className="text-white font-rubik">{movie.Director}</Text>
        </View>
      </View>

      {/* Writer */}
      {movie.Writer !== "N/A" && (
        <View className="mb-4">
          <Text className="text-lg font-rubik-medium text-yellow mb-2">
            Writer
          </Text>
          <View className="bg-dark-blue bg-opacity-40 p-3 rounded-lg border border-orange-red border-opacity-20">
            <Text className="text-white font-rubik">{movie.Writer}</Text>
          </View>
        </View>
      )}

      {/* Awards */}
      {movie.Awards !== "N/A" && (
        <View className="mb-4">
          <Text className="text-lg font-rubik-medium text-yellow mb-2">
            Awards
          </Text>
          <View className="bg-dark-blue bg-opacity-40 p-3 rounded-lg border border-orange-red border-opacity-20">
            <Text className="text-white font-rubik">{movie.Awards}</Text>
          </View>
        </View>
      )}

      {/* Additional Info */}
      <View style={styles.additionalInfoContainer}>
        {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Box Office</Text>
            <Text style={styles.infoValue}>{movie.BoxOffice}</Text>
          </View>
        )}
        {movie.Production && movie.Production !== "N/A" && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Production</Text>
            <Text style={styles.infoValue}>{movie.Production}</Text>
          </View>
        )}
        {movie.Country && movie.Country !== "N/A" && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Country</Text>
            <Text style={styles.infoValue}>{movie.Country}</Text>
          </View>
        )}
        {movie.Language && movie.Language !== "N/A" && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Language</Text>
            <Text style={styles.infoValue}>{movie.Language}</Text>
          </View>
        )}
        {movie.Released && movie.Released !== "N/A" && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Released</Text>
            <Text style={styles.infoValue}>{movie.Released}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default MovieDetailInfo;

const styles = StyleSheet.create({
  additionalInfoContainer: {
    backgroundColor: "rgba(3, 7, 30, 0.6)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    color: "#F48C06",
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    color: "#FFFFFF",
    fontFamily: "Rubik-Regular",
    fontSize: 14,
  },
});
