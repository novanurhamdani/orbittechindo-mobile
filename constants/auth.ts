// Mock user for authentication
export const MOCK_USER = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  phoneNumber: '1234567890',
  password: 'Password123', // In a real app, passwords would never be stored in plain text
};

// Token constants
export const TOKEN_KEY = 'movie_app_token';
export const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
