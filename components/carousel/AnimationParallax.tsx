import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import React from "react";
import { MovieDetail } from "@/types/movie";
import ParallaxCarouselCard from "./ParallaxCarouselCard";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.38;
const SPACING = 2;

const AnimationParallax = ({ movies }: { movies: MovieDetail[] }) => {
  return (
    <View style={styles.parallaxCarouselView}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <ParallaxCarouselCard item={item as MovieDetail} />
        )}
        keyExtractor={(item) => (item as MovieDetail).imdbID}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentContainer}
        snapToInterval={CARD_WIDTH + SPACING * 2}
        decelerationRate="fast"
        bounces={false}
        pagingEnabled={false}
        snapToAlignment="start"
        initialNumToRender={3}
        maxToRenderPerBatch={5}
      />
    </View>
  );
};

export default AnimationParallax;

const styles = StyleSheet.create({
  parallaxCarouselView: {
    paddingVertical: 10,
  },
  contentContainer: {
    paddingBottom: 8,
  },
});
