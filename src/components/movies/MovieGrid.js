import React from 'react';
import { Grid, Box } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="stretch"
            sx={{ maxWidth: 1600, width: "100%" }}
        >
            {movies.map((movie) => (
                <Grid item key={movie.id}>
                    <MovieCard movie={movie} />
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default MovieGrid;
