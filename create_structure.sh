#!/bin/bash

# Base directory
base_dir="src"

# Array of directories to create
directories=(
  "components/auth"
  "components/layout"
  "components/movies"
  "components/user"
  "context"
  "hooks"
  "pages"
  "services"
  "store"
  "utils"
)

# Create directories
for dir in "${directories[@]}"; do
  mkdir -p "$base_dir/$dir"
done

# Array of files to create
files=(
  "components/auth/Login.js"
  "components/auth/Register.js"
  "components/layout/Header.js"
  "components/layout/Footer.js"
  "components/layout/ThemeToggle.js"
  "components/movies/MovieCard.js"
  "components/movies/MovieDetails.js"
  "components/movies/MovieGrid.js"
  "components/movies/SearchBar.js"
  "components/movies/TrendingMovies.js"
  "components/user/FavoriteMovies.js"
  "components/user/UserLists.js"
  "context/AuthContext.js"
  "context/ThemeContext.js"
  "hooks/useLocalStorage.js"
  "pages/HomePage.js"
  "pages/MoviePage.js"
  "pages/SearchResultsPage.js"
  "pages/UserProfilePage.js"
  "services/api.js"
  "services/tmdbApi.js"
  "store/index.js"
  "store/authSlice.js"
  "store/moviesSlice.js"
  "utils/helpers.js"
  "App.js"
  "index.js"
)

# Create files if not present
for file in "${files[@]}"; do
  filepath="$base_dir/$file"
  if [ ! -f "$filepath" ]; then
    touch "$filepath"
  fi
done

# Inform user
echo "Directory structure and files created if they were not present."
