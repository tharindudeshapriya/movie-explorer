import React, { useState, useMemo } from "react";
import { TextField, Autocomplete, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import tmdbApi from "../../services/tmdbApi";
import debounce from "lodash.debounce";

const MIN_QUERY_LENGTH = 2;

const SearchBar = ({ initialValue = "" }) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Debounced fetch
    const fetchSuggestions = useMemo(
        () =>
            debounce(async (query) => {
                if (query.length < MIN_QUERY_LENGTH) {
                    setOptions([]);
                    setLoading(false);
                    return;
                }
                setLoading(true);
                try {
                    const data = await tmdbApi.searchMovies(query, 1);
                    setOptions(data.results.slice(0, 7));
                } catch {
                    setOptions([]);
                }
                setLoading(false);
            }, 300),
        []
    );

    // Handle input change
    const handleInputChange = (event, value) => {
        setInputValue(value);
        fetchSuggestions(value);
    };

    // Handle selection
    const handleChange = (event, value) => {
        if (value && value.id) {
            navigate(`/movie/${value.id}`);
        }
    };

    // Handle enter key
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputValue.trim()) {
            navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
        }
    };

    return (
        <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => (typeof option === "string" ? option : option.title)}
            filterOptions={(x) => x} // Disable built-in filtering
            loading={loading}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleChange}
            renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id}>
                    {option.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w45${option.poster_path}`}
                            alt={option.title}
                            style={{ marginRight: 8, width: 30, borderRadius: 2 }}
                        />
                    )}
                    {option.title} ({option.release_date ? option.release_date.slice(0, 4) : "N/A"})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search for movies"
                    variant="outlined"
                    fullWidth
                    size="small"
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={18} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            sx={{ mb: 3 }}
        />
    );
};

export default SearchBar;
