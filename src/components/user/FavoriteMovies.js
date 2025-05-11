import React from "react";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import MovieGrid from "../movies/MovieGrid";

const FavoriteMovies = () => {
    const favorites = useSelector((state) => state.movies.favorites);

    return (
        <Box mt={3}>
            <Typography variant="h5" mb={2}>
                Your Favorite Movies
            </Typography>
            {favorites.length === 0 ? (
                <Typography color="text.secondary">No favorite movies yet.</Typography>
            ) : (
                <MovieGrid movies={favorites} />
            )}
        </Box>
    );
};

export default FavoriteMovies;
