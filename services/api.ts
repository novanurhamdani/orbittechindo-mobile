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
export const searchMovies = async (searchTerm: string, page: number = 1): Promise<SearchResponse> => {
  try {
    const response = await api.get('', {
      params: {
        s: searchTerm || 'movie',
        page: page
      }
    });
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
