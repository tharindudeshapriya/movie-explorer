import React, { useContext } from "react";
import { Container, Box, Typography } from "@mui/material";
import FavoriteMovies from "../components/user/FavoriteMovies";
import { AuthContext } from "../context/AuthContext";

const UserProfilePage = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <Container maxWidth="sm">
                <Box mt={4} textAlign="center">
                    <Typography variant="h6">Please login to view your profile.</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box mt={3}>
                <Typography variant="h4" mb={3}>
                    {user.username}'s Profile
                </Typography>
                <FavoriteMovies />

            </Box>
        </Container>
    );
};

export default UserProfilePage;
