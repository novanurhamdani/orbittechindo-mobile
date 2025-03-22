import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Movie } from "@/types/movie";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFavoritesStore } from "@/store/favoritesStore";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.44;

type MovieCardProps = {
  item: Movie;
  onNavigate?: () => void;
};

const MovieCard = ({ item, onNavigate }: MovieCardProps) => {
  const router = useRouter();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const isMovieFavorite = isFavorite(item.imdbID);

  const handleMoviePress = (movie: Movie) => {
    // Call the onNavigate callback if provided
    if (onNavigate) {
      onNavigate();
    }
    router.push(`/movie/${movie.imdbID}`);
  };

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    if (isMovieFavorite) {
      removeFavorite(item.imdbID);
    } else {
      addFavorite(item);
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleMoviePress(item)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={["#370617", "#6A040F", "#9D0208"]}
        style={styles.cardGradient}
      >
        <Image
          source={{
            uri:
              item.Poster !== "N/A"
                ? item.Poster
                : "https://via.placeholder.com/300x445?text=No+Poster",
          }}
          style={styles.poster}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isMovieFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isMovieFavorite ? "#D00000" : "#FFBA08"}
          />
        </TouchableOpacity>
        <LinearGradient
          colors={["transparent", "rgba(3, 7, 30, 0.7)", "rgba(3, 7, 30, 0.9)"]}
          style={styles.overlay}
        >
          <View style={styles.cardContent}>
            <Text style={styles.title} numberOfLines={2}>
              {item.Title}
            </Text>

            <View style={styles.yearContainer}>
              <Text style={styles.type}>{item.Year}</Text>
            </View>
          </View>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: 220,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    marginBottom: 4,
  },
  yearContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  type: {
    color: "#F48C06",
    fontSize: 12,
    fontFamily: "Rubik-Regular",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(3, 7, 30, 0.6)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
});
