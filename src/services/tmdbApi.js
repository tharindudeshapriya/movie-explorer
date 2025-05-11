import axios from "axios";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = {
    getTrendingMovies: async () => {
        const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
            params: { api_key: TMDB_API_KEY },
        });
        return res.data;
    },
    searchMovies: async (query, page = 1) => {
        const res = await axios.get(`${BASE_URL}/search/movie`, {
            params: { api_key: TMDB_API_KEY, query, page },
        });
        return res.data;
    },
    getMovieDetails: async (movieId) => {
        const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
                append_to_response: "videos,credits",
            },
        });
        return res.data;
    },
    getGenres: async () => {
        const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
            params: { api_key: TMDB_API_KEY },
        });
        return res.data.genres;
    },
    discoverMovies: async (params) => {
        const res = await axios.get(`${BASE_URL}/discover/movie`, {
            params: { api_key: TMDB_API_KEY, ...params }
        });
        return res.data;
    },


    getYearRange: () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);
    },
    getNowPlayingMovies: async () => {
        const res = await axios.get(`${BASE_URL}/movie/now_playing`, {
            params: { api_key: TMDB_API_KEY }
        });
        return res.data;
    }


};

export default tmdbApi;
