import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { OMDB_API_KEY, OMDB_API_URL } from "../constants/api";
import { MovieDetail, SearchResponse } from "../types/movie";
import { getToken } from "../utils/auth";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: OMDB_API_URL,
  params: {
    apikey: OMDB_API_KEY,
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle token expiration or other auth errors here
    if (error.response?.status === 401) {
      // Handle unauthorized error
      console.log("Unauthorized access");
    }

    return Promise.reject(error);
  }
);

// API functions
export const searchMovies = async (
  searchTerm: string, 
  page: number = 1,
  filters?: { type?: string; year?: string }
): Promise<SearchResponse> => {
  try {
    const params: Record<string, string | number> = {
      s: searchTerm || 'movie',
      page: page
    };

    // Add type filter if provided and not "All"
    if (filters?.type && filters.type !== "All") {
      params.type = filters.type;
    }

    // Add year filter if provided and not "All"
    if (filters?.year && filters.year !== "All") {
      params.y = filters.year;
    }

    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieById = async (id: string): Promise<MovieDetail> => {
  const response = await api.get("", { params: { i: id, plot: "full" } });
  return response.data;
};

export default api;
