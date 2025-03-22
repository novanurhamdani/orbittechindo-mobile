import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { searchMovies } from "@/services/api";
import { Movie } from "@/types/movie";
import MovieCard from "@/components/movies/MovieCard";
import Pagination from "@/components/pagination/Pagination";

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (page = 1) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentPage(page);

    try {
      const response = await searchMovies(searchTerm, page);
      if (response.Response === "True") {
        setResults(response.Search);
        setTotalResults(parseInt(response.totalResults));
        setTotalPages(Math.ceil(parseInt(response.totalResults) / 10));
      } else {
        setError("No results found");
        setResults([]);
        setTotalResults(0);
        setTotalPages(0);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred during search");
      setResults([]);
      setTotalResults(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSearchTerm("");
      setResults([]);
      setError(null);
      setCurrentPage(1);
      setTotalResults(0);
      setTotalPages(0);
    }, [])
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
              onSubmitEditing={() => handleSearch(1)}
              autoFocus
            />
            <TouchableOpacity
              className="bg-orange px-4 rounded-r-lg justify-center"
              onPress={() => handleSearch(1)}
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
                onPress={() => handleSearch(1)}
              >
                <Text className="text-white font-rubik">Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : results.length > 0 ? (
            <>
              {/* Results count */}
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsCount}>
                  {totalResults} results found
                </Text>
                <Text style={styles.pageIndicator}>
                  Page {currentPage} of {totalPages}
                </Text>
              </View>

              <FlatList
                data={results}
                renderItem={({ item }) => <MovieCard item={item as Movie} />}
                keyExtractor={(item) => item.imdbID}
                numColumns={2}
                key={`flatlist-columns-${2}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={styles.columnWrapper}
                ListFooterComponent={() => (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onSearch={handleSearch}
                  />
                )}
              />
            </>
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

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    marginBottom: 50,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resultsCount: {
    color: "#FFBA08",
    fontFamily: "Rubik-Medium",
    fontSize: 14,
  },
  pageIndicator: {
    color: "#F48C06",
    fontFamily: "Rubik-Regular",
    fontSize: 12,
  },
});
