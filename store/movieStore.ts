import { create } from 'zustand';
import { FilterOptions, Movie, MovieDetail } from '../types/movie';
import { DEFAULT_SEARCH } from '../constants/api';

interface MovieStore {
  searchTerm: string;
  searchResults: Movie[];
  totalResults: number;
  selectedMovie: MovieDetail | null;
  loading: boolean;
  error: string | null;
  page: number;
  filterOptions: FilterOptions;
  
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: Movie[], totalResults: string | number) => void;
  setSelectedMovie: (movie: MovieDetail | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  setFilterOptions: (options: Partial<FilterOptions>) => void;
  resetFilters: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  searchTerm: DEFAULT_SEARCH,
  searchResults: [],
  totalResults: 0,
  selectedMovie: null,
  loading: false,
  error: null,
  page: 1,
  filterOptions: {
    type: "All",
    year: "All",
  },
  
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setSearchResults: (results: Movie[], totalResults: string | number) => 
    set({ 
      searchResults: results, 
      totalResults: typeof totalResults === 'string' ? parseInt(totalResults) || 0 : totalResults 
    }),
  setSelectedMovie: (movie: MovieDetail | null) => set({ selectedMovie: movie }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setPage: (page: number) => set({ page }),
  setFilterOptions: (options: Partial<FilterOptions>) => 
    set((state) => ({ 
      filterOptions: { ...state.filterOptions, ...options } 
    })),
  resetFilters: () => set({ 
    filterOptions: {
      type: "All",
      year: "All",
    }
  }),
}));
