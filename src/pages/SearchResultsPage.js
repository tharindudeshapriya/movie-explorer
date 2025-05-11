import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import tmdbApi from "../services/tmdbApi";
import MovieGrid from "../components/movies/MovieGrid";
import SearchBar from "../components/movies/SearchBar";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const hasEssentialDetails = (movie) =>
    !!movie.poster_path && !!movie.overview && movie.overview.trim().length > 0;

const SearchResultsPage = () => {
    const query = useQuery().get("query") || "";
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) return;
        setMovies([]);
        setPage(1);
        fetchMovies(1, true);
        // eslint-disable-next-line
    }, [query]);

    const fetchMovies = async (pageNum = 1, reset = false) => {
        setLoading(true);
        setError("");
        try {
            const data = await tmdbApi.searchMovies(query, pageNum);
            // Filter out movies missing poster or overview
            const filtered = data.results.filter(hasEssentialDetails);
            setMovies((prev) => (reset ? filtered : [...prev, ...filtered]));
            setTotalPages(data.total_pages);
        } catch {
            setError("Failed to fetch movies. Please try again.");
        }
        setLoading(false);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(nextPage);
    };

    return (
        <Container maxWidth="xl" sx={{ px: '2rem' }}>
            <Box mt={3}>
                <SearchBar initialValue={query} />
                <Typography variant="h5" mb={2}>
                    Search Results for "{query}"
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <MovieGrid movies={movies} />
                {loading && <Box textAlign="center" mt={2}><CircularProgress /></Box>}
                {!loading && movies.length > 0 && page < totalPages && (
                    <Grid container justifyContent="center" mt={3}>
                        <Button variant="contained" onClick={handleLoadMore}>
                            Load More
                        </Button>
                    </Grid>
                )}
                {!loading && !movies.length && (
                    <Typography color="text.secondary" mt={2}>
                        No movies found.
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default SearchResultsPage;
