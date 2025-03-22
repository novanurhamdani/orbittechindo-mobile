import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { BarChart, PieChart } from "react-native-chart-kit";
import { generateGenreData, generateRatingData } from "@/utils/analytic";
import { MovieDetail } from "@/types/movie";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const MovieAnalytic = ({ movie }: { movie: MovieDetail }) => {
  const ratingData = generateRatingData(movie);
  const genreData = generateGenreData(movie);

  return (
    <View className="pt-2">
      {/* Ratings Chart */}
      {ratingData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Ratings Comparison</Text>
          <BarChart
            data={{
              labels: ratingData.map((d) => d.source),
              datasets: [
                {
                  data: ratingData.map((d) => d.value),
                  colors: ratingData.map((d) => () => d.color),
                },
              ],
            }}
            width={width - 40}
            height={220}
            yAxisLabel=""
            yAxisSuffix="%"
            fromZero
            chartConfig={{
              backgroundColor: "#03071E",
              backgroundGradientFrom: "#370617",
              backgroundGradientTo: "#6A040F",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 186, 8, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(244, 140, 6, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              barPercentage: 0.7,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      )}

      {/* Genre Distribution */}
      {genreData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Genre Distribution</Text>
          <PieChart
            data={genreData.map((d) => ({
              name: d.genre,
              population: d.value,
              color: d.color,
              legendFontColor: "#F48C06",
              legendFontSize: 12,
            }))}
            width={width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#03071E",
              backgroundGradientFrom: "#370617",
              backgroundGradientTo: "#6A040F",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 186, 8, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(244, 140, 6, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={true}
            center={[width / 4, 0]}
          />
        </View>
      )}

      {/* Movie Metadata */}
      <View style={styles.metadataContainer}>
        <Text style={styles.chartTitle}>Movie Metadata</Text>
        <View style={styles.metadataGrid}>
          <View style={styles.metadataItem}>
            <View style={styles.metadataIconContainer}>
              <Ionicons name="calendar-outline" size={20} color="#F48C06" />
            </View>
            <Text style={styles.metadataLabel}>Year</Text>
            <Text style={styles.metadataValue}>{movie.Year}</Text>
          </View>
          <View style={styles.metadataItem}>
            <View style={styles.metadataIconContainer}>
              <Ionicons name="time-outline" size={20} color="#F48C06" />
            </View>
            <Text style={styles.metadataLabel}>Runtime</Text>
            <Text style={styles.metadataValue}>{movie.Runtime}</Text>
          </View>
          <View style={styles.metadataItem}>
            <View style={styles.metadataIconContainer}>
              <Ionicons name="star-outline" size={20} color="#F48C06" />
            </View>
            <Text style={styles.metadataLabel}>IMDb Rating</Text>
            <Text style={styles.metadataValue}>{movie.imdbRating}/10</Text>
          </View>
          <View style={styles.metadataItem}>
            <View style={styles.metadataIconContainer}>
              <Ionicons name="people-outline" size={20} color="#F48C06" />
            </View>
            <Text style={styles.metadataLabel}>Votes</Text>
            <Text style={styles.metadataValue}>
              {movie.imdbVotes !== "N/A"
                ? parseInt(movie.imdbVotes.replace(/,/g, "")).toLocaleString()
                : "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MovieAnalytic;

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 24,
    backgroundColor: "rgba(3, 7, 30, 0.6)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  chartTitle: {
    color: "#FFBA08",
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    marginBottom: 12,
  },
  metadataContainer: {
    backgroundColor: "rgba(3, 7, 30, 0.6)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  metadataGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  metadataItem: {
    width: "50%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  metadataIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(232, 93, 4, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  metadataLabel: {
    color: "#F48C06",
    fontFamily: "Rubik-Medium",
    fontSize: 12,
    marginBottom: 2,
  },
  metadataValue: {
    color: "#FFFFFF",
    fontFamily: "Rubik-Bold",
    fontSize: 14,
  },
});
