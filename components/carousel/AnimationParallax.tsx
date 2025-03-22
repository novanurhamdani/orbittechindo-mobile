import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import { MovieDetail } from "@/types/movie";
import ParallaxCarouselCard from "./ParallaxCarouselCard";

const AnimationParallax = ({ movies }: { movies: MovieDetail[] }) => {
  return (
    <View style={styles.parallaxCarouselView}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <ParallaxCarouselCard item={item} />}
        keyExtractor={(item) => item.imdbID}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default AnimationParallax;

const styles = StyleSheet.create({
  parallaxCarouselView: {
    paddingVertical: 20,
  },
});
