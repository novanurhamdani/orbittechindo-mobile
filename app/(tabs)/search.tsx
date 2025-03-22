import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useFocusEffect, useRouter, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { searchMovies } from "@/services/api";
import { FilterOptions, Movie } from "@/types/movie";
import MovieCard from "@/components/movies/MovieCard";
import Pagination from "@/components/pagination/Pagination";
import MovieFilter from "@/components/movies/MovieFilter";

const Search = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({
    type: "All",
    year: "All",
  });
  
  // Track if we're navigating to a movie detail page
  const navigatingToDetail = useRef(false);
  const previousRouteRef = useRef("");

  // Common function to process search results
  const processSearchResults = (response: any, setLoadingState = true) => {
    if (response.Response === "True") {
      setResults(response.Search);
      setTotalResults(parseInt(response.totalResults));
      setTotalPages(Math.ceil(parseInt(response.totalResults) / 10));
      setError(null);
    } else {
      setError("No results found");
      setResults([]);
      setTotalResults(0);
      setTotalPages(0);
    }
    
    if (setLoadingState) {
      setLoading(false);
    }
  };

  // Common function to handle search errors
  const handleSearchError = (err: any, setLoadingState = true) => {
    console.error("Search error:", err);
    setError("An error occurred during search");
    setResults([]);
    setTotalResults(0);
    setTotalPages(0);
    
    if (setLoadingState) {
      setLoading(false);
    }
  };

  const handleSearch = async (page = 1) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentPage(page);

    try {
      const response = await searchMovies(searchTerm, page, filters);
      processSearchResults(response);
    } catch (err) {
      handleSearchError(err);
    }
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    // Update the filters state
    setFilters(newFilters);

    // Immediately trigger a search if there's a search term
    if (searchTerm.trim()) {
      // Reset to page 1 when applying new filters
      setCurrentPage(1);
      setLoading(true);

      // Use the new filters directly instead of waiting for state update
      searchMovies(searchTerm, 1, newFilters)
        .then((response) => {
          processSearchResults(response, false);
        })
        .catch((err) => {
          handleSearchError(err, false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // Track navigation to movie detail
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      // Check if we're navigating to a movie detail page
      // Use optional chaining and type assertion to safely access nested properties
      const action = e.data.action as any;
      const routes = action?.payload?.routes;
      const currentRoute = routes && routes[0] ? routes[0].name : '';
      
      if (currentRoute.includes('movie/[id]')) {
        navigatingToDetail.current = true;
      } else {
        navigatingToDetail.current = false;
      }
      
      previousRouteRef.current = currentRoute;
    });

    return unsubscribe;
  }, [navigation]);

  // Reset search state when focusing the screen, but only if not returning from movie detail
  useFocusEffect(
    useCallback(() => {
      // If we're returning from a movie detail page, don't reset the search
      if (previousRouteRef.current.includes('movie/[id]')) {
        // Just update the previous route
        previousRouteRef.current = "";
        return;
      }
      
      // Otherwise, reset everything
      setSearchTerm("");
      setResults([]);
      setError(null);
      setCurrentPage(1);
      setTotalResults(0);
      setTotalPages(0);
      setFilters({
        type: "All",
        year: "All",
      });
    }, [])
  );

  useEffect(() => {
    if (searchTerm.trim() && filters) {
      handleSearch(1);
    }
  }, [filters]);

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
            <TouchableOpacity 
              className="mr-3" 
              onPress={() => {
                navigatingToDetail.current = false;
                router.back();
              }}
            >
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

          {/* Filter */}
          <View style={styles.filterContainer}>
            <MovieFilter
              onApplyFilters={handleApplyFilters}
              currentFilters={filters}
            />
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
                renderItem={({ item }) => (
                  <MovieCard 
                    item={item as Movie}
                    onNavigate={() => {
                      // Set flag that we're going to movie detail
                      navigatingToDetail.current = true;
                      previousRouteRef.current = "movie/[id]";
                    }}
                  />
                )}
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
  filterContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
