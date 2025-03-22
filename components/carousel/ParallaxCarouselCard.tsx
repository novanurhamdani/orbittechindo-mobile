import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { Movie, MovieDetail } from "@/types/movie";
import { useRouter } from "expo-router";

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
    >
      <ImageBackground
        source={{
          uri:
            item.Poster !== "N/A"
              ? item.Poster
              : "https://via.placeholder.com/100x150?text=No+Poster",
        }}
        style={styles.imageBackgroundStyle}
      >
        <View className="ml-3 flex-1 justify-end">
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
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ParallaxCarouselCard;

const styles = StyleSheet.create({
  containerStyle: {
    width: 150,
    height: 221,
  },
  imageBackgroundStyle: {
    resizeMode: "cover",
    borderRadius: 14,
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
});
