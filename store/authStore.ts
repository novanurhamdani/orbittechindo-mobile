import { create } from 'zustand';
import { AuthState, LoginCredentials, RegisterData, User } from '../types/user';
import { login, logout, register } from '../utils/auth';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (credentials: LoginCredentials) => {
    try {
      const result = await login(credentials);
      if (result) {
        const { user, token } = result;
        set({ user, token, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  register: async (data: RegisterData) => {
    try {
      const { user, token } = await register(data);
      set({ user, token, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      await logout();
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  setUser: (user: User | null) => set({ user }),
  setToken: (token: string | null) => set({ token, isAuthenticated: !!token }),
}));
