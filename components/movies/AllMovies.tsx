import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { searchMovies } from "@/services/api";
import { Movie } from "@/types/movie";
import { useMovieStore } from "@/store/movieStore";
import MovieCard from "./MovieCard";

export default function AllMovies({
  ListHeaderComponent,
}: {
  ListHeaderComponent?: React.ReactElement;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const {
    searchTerm,
    page,
    setPage,
    searchResults,
    totalResults,
    setSearchResults,
  } = useMovieStore();

  const fetchMovies = async (currentPage = 1, refresh = false) => {
    if (loading && !refresh) return;

    try {
      setLoading(true);
      if (refresh) {
        setRefreshing(true);
      }

      const response = await searchMovies(searchTerm, currentPage);

      if (response.Response === "True") {
        if (refresh) {
          setSearchResults(response.Search, response.totalResults);
        } else {
          setSearchResults(
            currentPage === 1
              ? response.Search
              : [...searchResults, ...response.Search],
            response.totalResults
          );
        }
        setError(null);
      } else {
        setError("Failed to fetch movies");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("An error occurred while fetching movies");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies(1, true);
  }, [searchTerm]);

  const handleLoadMore = () => {
    if (loading) return;
    if (searchResults.length < totalResults) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    fetchMovies(1, true);
  };

  const renderFooter = () => {
    if (!loading || refreshing) return null;

    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color="#E85D04" />
        <Text style={styles.loadingText}>Loading more movies...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading && !refreshing) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error ? `Error: ${error}` : "No movies found"}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <MovieCard item={item as Movie} />}
        keyExtractor={(item) => item.imdbID}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 20,
    marginBottom: 50,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  footerContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#F48C06",
    fontFamily: "Rubik-Regular",
    marginTop: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#F48C06",
    fontFamily: "Rubik-Medium",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#E85D04",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-Medium",
  },
});
