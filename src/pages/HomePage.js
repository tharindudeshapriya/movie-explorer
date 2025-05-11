import React from 'react';
import { Container, Box } from '@mui/material';
import SearchBar from '../components/movies/SearchBar';
import MovieCarousel from '../components/movies/MovieCarousel';
import tmdbApi from '../services/tmdbApi';

const categories = [
    { title: 'Trending Now', apiMethod: tmdbApi.getTrendingMovies },
    { title: 'In Cinema', apiMethod: tmdbApi.getNowPlayingMovies },
    { title: 'Adventure', genreId: 12 },
    { title: 'Comedy', genreId: 35 },
    { title: 'Sci-Fi', genreId: 878 },
    { title: 'Romance', genreId: 10749 },
    { title: 'Drama', genreId: 18 },
    { title: 'Horror', genreId: 27 }
];

const HomePage = () => (
    <Container maxWidth="xl" disableGutters>
        <Box sx={{ px: '2rem', pt: 3 }}>
            <SearchBar />

            {categories.map((category, index) => (
                <MovieCarousel
                    key={index}
                    title={category.title}
                    genreId={category.genreId}
                    apiMethod={category.apiMethod}
                />
            ))}
        </Box>
    </Container>
);

export default HomePage;
