import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { Movie, MovieDetail } from "../../types/movie";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const ParallaxCarouselCard = ({ item }: { item: MovieDetail }) => {
  const router = useRouter();

  const handleMoviePress = async (movie: Movie) => {
    router.push({
      pathname: "/movie/[id]",
      params: { id: movie.imdbID },
    } as any);
  };

  return (
    <TouchableOpacity
      style={styles.containerStyle}
      onPress={() => handleMoviePress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardContainer}>
        <ImageBackground
          source={{
            uri:
              item.Poster !== "N/A"
                ? item.Poster
                : "https://via.placeholder.com/100x150?text=No+Poster",
          }}
          style={styles.imageBackgroundStyle}
          imageStyle={styles.imageStyle}
        >
          <LinearGradient
            colors={[
              "transparent",
              "rgba(3, 7, 30, 0.7)",
              "rgba(3, 7, 30, 0.9)",
            ]}
            style={styles.gradientOverlay}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.titleText} numberOfLines={2}>
                {item.Title}
              </Text>
              <Text style={styles.subtitleText}>
                {item.Year} • {item.imdbRating}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ParallaxCarouselCard;

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.38;

const styles = StyleSheet.create({
  containerStyle: {
    width: CARD_WIDTH,
    height: 220,
    marginHorizontal: 4,
    marginVertical: 10,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#03071E",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  imageBackgroundStyle: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  contentContainer: {
    padding: 12,
  },
  titleText: {
    color: "#FFBA08",
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    marginBottom: 4,
  },
  subtitleText: {
    color: "#F48C06",
    fontFamily: "Rubik-Regular",
    fontSize: 12,
  },
});
