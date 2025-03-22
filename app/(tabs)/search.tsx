import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { searchMovies } from "@/services/api";
import { Movie } from "@/types/movie";

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchMovies(searchTerm);
      if (response.Response === "True") {
        setResults(response.Search);
      } else {
        setError("No results found");
        setResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred during search");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = async (movie: Movie) => {
    router.push({
      pathname: "/movie/[id]",
      params: { id: movie.imdbID },
    } as any);
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      className="flex-row bg-dark-blue bg-opacity-40 rounded-lg p-2 mb-3"
      onPress={() => handleMoviePress(item)}
    >
      <Image
        source={{
          uri:
            item.Poster !== "N/A"
              ? item.Poster
              : "https://via.placeholder.com/100x150?text=No+Poster",
        }}
        className="w-20 h-28 rounded-md"
        resizeMode="cover"
      />
      <View className="ml-3 flex-1 justify-center">
        <Text
          className="text-yellow font-rubik-medium text-base"
          numberOfLines={2}
        >
          {item.Title}
        </Text>
        <Text className="text-light-orange font-rubik text-sm">
          {item.Year} • {item.Type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-dark-blue mb-10">
      <StatusBar style="light" />
      <LinearGradient
        colors={["#03071E", "#370617", "#6A040F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        {/* Header */}
        <View className="pt-12 px-4 pb-4">
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-3" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#F48C06" />
            </TouchableOpacity>
            <Text className="text-xl font-rubik-bold text-yellow">
              Search Movies
            </Text>
          </View>

          {/* Search Input */}
          <View className="flex-row mt-4">
            <TextInput
              className="flex-1 bg-dark-blue bg-opacity-40 text-white font-rubik px-4 py-2 rounded-l-lg"
              placeholder="Search for movies..."
              placeholderTextColor="#F48C0680"
              value={searchTerm}
              onChangeText={setSearchTerm}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
              autoFocus
            />
            <TouchableOpacity
              className="bg-orange px-4 rounded-r-lg justify-center"
              onPress={handleSearch}
            >
              <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Results */}
        <View className="flex-1 px-4 mb-4">
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#E85D04" />
              <Text className="text-light-orange font-rubik mt-2">
                Searching...
              </Text>
            </View>
          ) : error ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-red font-rubik-medium mb-2">
                ⚠️ {error}
              </Text>
              <TouchableOpacity
                className="bg-orange-red px-4 py-2 rounded-lg mt-2"
                onPress={handleSearch}
              >
                <Text className="text-white font-rubik">Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : results.length > 0 ? (
            <FlatList
              data={results}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.imdbID}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Ionicons name="search-outline" size={64} color="#F48C0640" />
              <Text className="text-light-orange font-rubik mt-2">
                Search for movies, TV shows, and more
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Search;
