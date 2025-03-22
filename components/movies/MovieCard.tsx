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

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.44;

const MovieCard = ({ item }: { item: Movie }) => {
  const router = useRouter();

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.imdbID}`);
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
    color: "#FFBA08",
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    marginBottom: 4,
  },
  year: {
    color: "#F48C06",
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    marginBottom: 4,
  },
  yearContainer: {
    backgroundColor: "rgba(232, 93, 4, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  type: {
    color: "#FAA307",
    fontFamily: "Rubik-Regular",
    fontSize: 10,
    textTransform: "capitalize",
  },
});
