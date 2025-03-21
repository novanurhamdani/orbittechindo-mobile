// OMDb API constants
export const OMDB_API_URL = "https://www.omdbapi.com/";
export const OMDB_API_KEY = process.env.EXPO_PUBLIC_OMDB_API_KEY;

// Mock data for featured movies (for carousel)
export const FEATURED_MOVIES = [
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0468569", // The Dark Knight
  "tt0071562", // The Godfather: Part II
  "tt0050083", // 12 Angry Men
];

// Default search term
export const DEFAULT_SEARCH = "Marvel";

// Year range for filter
export const MIN_YEAR = 1900;
export const MAX_YEAR = new Date().getFullYear();
