import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '@/types/movie';

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (movie: Movie) => {
        set((state) => {
          // Check if movie already exists in favorites
          if (state.favorites.some((fav) => fav.imdbID === movie.imdbID)) {
            return state;
          }
          return { favorites: [...state.favorites, movie] };
        });
      },
      
      removeFavorite: (id: string) => {
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.imdbID !== id),
        }));
      },
      
      isFavorite: (id: string) => {
        return get().favorites.some((movie) => movie.imdbID === id);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
