# Movie Mobile App

A React Native mobile application for exploring movies, viewing details, and managing favorites. Built with Expo, TypeScript, and Zustand.

## Features

- **Dark Theme with Glassmorphism UI**: Sleek dark theme with glassmorphism style using a custom color palette
- **Movie Exploration**: Browse trending and popular movies
- **Search Functionality**: Search for movies by title
- **Movie Details**: View comprehensive movie information including:
  - Movie metadata (title, year, runtime, ratings)
  - Plot summary
  - Cast and crew information
  - Genre tags
- **Analytics Visualization**:
  - Ratings comparison chart (IMDb, Rotten Tomatoes, Metacritic)
  - Genre distribution pie chart
- **User Authentication**:
  - Register new accounts
  - Login with existing credentials
  - Profile management
- **Favorites System**:
  - Add/remove movies to favorites
  - View all favorite movies in a dedicated tab
  - Persistent storage of favorites

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Data Visualization**: React Native Chart Kit
- **Storage**: AsyncStorage for persistent data

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Android Studio/Xcode (for emulators) or Expo Go app on a physical device

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/novanurhamdani/orbittechindo-mobile.git
   cd orbittechindo-mobile
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npx expo start
   ```

4. Run the app:
   - Press `a` to run on Android emulator
   - Press `i` to run on iOS simulator
   - Scan the QR code with Expo Go app on your physical device
