import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    Button,
    CircularProgress,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
    Chip,
} from "@mui/material";
import tmdbApi from "../services/tmdbApi";
import MovieGrid from "../components/movies/MovieGrid";
import SearchBar from "../components/movies/SearchBar";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const hasEssentialDetails = (movie) =>
    !!movie.poster_path && !!movie.overview && movie.overview.trim().length > 0;

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = useQuery().get("query") || "";
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Filter states
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [minRating, setMinRating] = useState(0);

    // Fetch genres on mount
    useEffect(() => {
        tmdbApi.getGenres().then(setGenres);
    }, []);

    // Reset scroll position on new search
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [query]);

    // Fetch movies when query changes
    useEffect(() => {
        if (!query) return;
        const fetchInitial = async () => {
            setAllMovies([]);
            setFilteredMovies([]);
            setSelectedGenres([]);
            setStartYear("");
            setEndYear("");
            setMinRating(0);
            setPage(1);
            await fetchMovies(1, true);
        };
        fetchInitial();
        // eslint-disable-next-line
    }, [query]);

    const fetchMovies = async (pageNum = 1, reset = false) => {
        setLoading(true);
        setError("");
        try {
            const data = await tmdbApi.searchMovies(query, pageNum);
            const filtered = data.results.filter(hasEssentialDetails);
            setAllMovies((prev) => (reset ? filtered : [...prev, ...filtered]));
            setTotalPages(data.total_pages);
        } catch {
            setError("Failed to fetch movies. Please try again.");
        }
        setLoading(false);
    };

    // Generate years list from allMovies
    const years = Array.from(
        new Set(allMovies.map((m) => m.release_date?.slice(0, 4)).filter(Boolean))
    ).sort((a, b) => b - a);

    // Apply filters
    useEffect(() => {
        let movies = allMovies;

        // Genre filter (OR logic)
        if (selectedGenres.length > 0) {
            movies = movies.filter((m) =>
                m.genre_ids?.some((genreId) => selectedGenres.includes(genreId))
            );
        }

        // Year range filter
        if (startYear || endYear) {
            const start = startYear || "1900";
            const end = endYear || "2100";
            movies = movies.filter((m) => {
                const year = m.release_date?.slice(0, 4);
                return year && year >= start && year <= end;
            });
        }

        // Rating filter
        if (minRating) {
            movies = movies.filter((m) => m.vote_average >= minRating);
        }

        setFilteredMovies(movies);
    }, [allMovies, selectedGenres, startYear, endYear, minRating]);

    const handleGenreToggle = (genreId) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((id) => id !== genreId)
                : [...prev, genreId]
        );
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(nextPage);
    };

    // Ensure search bar stays in sync with URL query
    useEffect(() => {
        // This effect is just to force rerender if the query changes via navigation
        // The SearchBar will pick up the new query via its initialValue prop
    }, [location.search]);

    return (
        <Container maxWidth="xl" sx={{ px: "2rem" }}>
            <Box mt={3}>
                <SearchBar initialValue={query} />

                {/* Filters Section */}
                <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                        Filters
                    </Typography>

                    {/* Genre Toggles */}
                    <Box mb={2}>
                        <Typography variant="body2" gutterBottom>
                            Genres:
                        </Typography>
                        <ToggleButtonGroup sx={{ flexWrap: "wrap", gap: 1 }}>
                            {genres.map((g) => (
                                <ToggleButton
                                    key={g.id}
                                    value={g.id}
                                    selected={selectedGenres.includes(g.id)}
                                    onChange={() => handleGenreToggle(g.id)}
                                    size="small"
                                    sx={{
                                        borderRadius: 4,
                                        border: "1px solid rgba(0, 0, 0, 0.12)",
                                        "&.Mui-selected": {
                                            backgroundColor: "primary.main",
                                            color: "white",
                                        },
                                    }}
                                >
                                    {g.name}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Box>

                    {/* Year Range */}
                    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Start Year</InputLabel>
                            <Select
                                value={startYear}
                                label="Start Year"
                                onChange={(e) => setStartYear(e.target.value)}
                            >
                                <MenuItem value="">Any</MenuItem>
                                {years.map((year) => (
                                    <MenuItem value={year} key={`start-${year}`}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>End Year</InputLabel>
                            <Select
                                value={endYear}
                                label="End Year"
                                onChange={(e) => setEndYear(e.target.value)}
                            >
                                <MenuItem value="">Any</MenuItem>
                                {years.map((year) => (
                                    <MenuItem value={year} key={`end-${year}`}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Rating Filter */}
                    <Box width={300} mb={2}>
                        <Typography variant="body2" gutterBottom>
                            Minimum Rating: {minRating}
                        </Typography>
                        <Slider
                            value={minRating}
                            min={0}
                            max={10}
                            step={0.5}
                            onChange={(_, val) => setMinRating(val)}
                            valueLabelDisplay="auto"
                        />
                    </Box>

                    {/* Active Filters */}
                    <Box display="flex" gap={1} flexWrap="wrap">
                        {selectedGenres.map((genreId) => (
                            <Chip
                                key={genreId}
                                label={genres.find((g) => g.id === genreId)?.name}
                                onDelete={() => handleGenreToggle(genreId)}
                                sx={{ borderRadius: 2 }}
                            />
                        ))}
                        {(startYear || endYear) && (
                            <Chip
                                label={`Years: ${startYear || "..."} - ${endYear || "..."}`}
                                onDelete={() => {
                                    setStartYear("");
                                    setEndYear("");
                                }}
                                sx={{ borderRadius: 2 }}
                            />
                        )}
                        {minRating > 0 && (
                            <Chip
                                label={`Rating ≥ ${minRating}`}
                                onDelete={() => setMinRating(0)}
                                sx={{ borderRadius: 2 }}
                            />
                        )}
                    </Box>
                </Box>

                {/* Results Section */}
                <Typography variant="h5" mb={2}>
                    Search Results for "{query}"
                </Typography>

                {error && <Typography color="error">{error}</Typography>}

                <MovieGrid movies={filteredMovies} />

                {loading && (
                    <Box textAlign="center" mt={2}>
                        <CircularProgress />
                    </Box>
                )}

                {!loading && filteredMovies.length > 0 && page < totalPages && (
                    <Grid container justifyContent="center" mt={3}>
                        <Button variant="contained" onClick={handleLoadMore}>
                            Load More
                        </Button>
                    </Grid>
                )}

                {!loading && !filteredMovies.length && (
                    <Typography color="text.secondary" mt={2}>
                        No movies found matching your criteria.
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default SearchResultsPage;
