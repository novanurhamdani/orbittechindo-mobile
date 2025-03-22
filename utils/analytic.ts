import { MovieDetail } from "@/types/movie";

const getColorForSource = (source: string) => {
  switch (source) {
    case "IMDb":
      return "#F5C518";
    case "Rotten Tomatoes":
      return "#FA320A";
    case "Metacritic":
      return "#0DB4E7";
    default:
      return "#E85D04";
  }
};

// Generate chart data
export const generateRatingData = (movie: MovieDetail) => {
  if (!movie) return [];

  // Parse ratings from different sources
  const ratingsData =
    movie.Ratings?.map((rating) => {
      let value = 0;
      let source = rating.Source;

      if (rating.Source === "Internet Movie Database") {
        source = "IMDb";
        value = parseFloat(rating.Value.split("/")[0]) * 10;
      } else if (rating.Source === "Rotten Tomatoes") {
        value = parseInt(rating.Value.replace("%", ""));
      } else if (rating.Source === "Metacritic") {
        value = parseInt(rating.Value.split("/")[0]);
      }

      return {
        source,
        value,
        color: getColorForSource(source),
      };
    }) || [];

  // Add IMDb rating if not already included
  if (
    !ratingsData.some((r) => r.source === "IMDb") &&
    movie.imdbRating !== "N/A"
  ) {
    ratingsData.push({
      source: "IMDb",
      value: parseFloat(movie.imdbRating) * 10,
      color: "#F5C518",
    });
  }

  return ratingsData;
};

export const generateGenreData = (movie: MovieDetail) => {
  if (!movie || movie.Genre === "N/A") return [];

  const genres = movie.Genre.split(", ");
  const genreColors = [
    "#E85D04",
    "#F48C06",
    "#FAA307",
    "#FFBA08",
    "#DC2F02",
    "#9D0208",
    "#6A040F",
    "#370617",
  ];

  return genres.map((genre, index) => ({
    genre,
    value: 1,
    color: genreColors[index % genreColors.length],
  }));
};
