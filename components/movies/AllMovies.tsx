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
import { FilterOptions, Movie } from "@/types/movie";
import { useMovieStore } from "@/store/movieStore";
import MovieCard from "./MovieCard";
import MovieFilter from "./MovieFilter";

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
    filterOptions,
    setFilterOptions,
  } = useMovieStore();

  const fetchMovies = async (currentPage = 1, refresh = false) => {
    if (loading && !refresh) return;

    try {
      setLoading(true);
      if (refresh) {
        setRefreshing(true);
      }

      const response = await searchMovies(
        searchTerm,
        currentPage,
        filterOptions
      );

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
  }, [searchTerm, filterOptions]);

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

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
    setPage(1);
  };

  const renderFooter = () => {
    if (!loading || refreshing) return null;

    return (
      <View className="p-4 flex items-center justify-center mb-4">
        <ActivityIndicator size="large" color="#E85D04" />
        <Text className="text-light-orange font-rubik mt-2">
          Loading more movies...
        </Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading && !refreshing) return null;

    return (
      <View className="p-5 flex items-center justify-center">
        <Text className="text-light-orange font-rubik text-center mb-4">
          {error ? `Error: ${error}` : "No movies found"}
        </Text>
        <TouchableOpacity
          className="bg-orange px-4 py-2 rounded-lg"
          onPress={handleRefresh}
        >
          <Text className="text-white font-rubik">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        {ListHeaderComponent}
        <View className="mb-5 flex flex-row justify-between items-center">
          <Text className="text-xl font-rubik-semibold text-white mb-4">
            Latest Movies
          </Text>
          <MovieFilter
            onApplyFilters={handleApplyFilters}
            currentFilters={filterOptions}
          />
        </View>
      </>
    );
  };

  return (
    <View className="my-4 px-4">
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
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    marginBottom: 50,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
