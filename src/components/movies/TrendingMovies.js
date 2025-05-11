import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import tmdbApi from "../../services/tmdbApi";
import MovieGrid from "./MovieGrid";

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const data = await tmdbApi.getTrendingMovies();
                setMovies(data.results);
            } catch (err) {
                setMovies([]);
            }
            setLoading(false);
        };
        fetchTrending();
    }, []);

    return (
        <Box my={4}>
            <Typography variant="h5" mb={2}>
                Trending Movies
            </Typography>
            {loading ? <CircularProgress /> : <MovieGrid movies={movies} />}
        </Box>
    );
};

export default TrendingMovies;
