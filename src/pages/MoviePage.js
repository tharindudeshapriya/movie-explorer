import React from "react";
import { Container, Box } from "@mui/material";
import MovieDetails from "../components/movies/MovieDetails";

const MoviePage = () => (
    <Container maxWidth="xl" sx={{ px: '2rem' }}>
        <Box mt={3}>
            <MovieDetails />
        </Box>
    </Container>
);

export default MoviePage;
