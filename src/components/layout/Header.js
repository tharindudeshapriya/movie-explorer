import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <AppBar position="sticky" color="default" elevation={2}>
            <Toolbar>
                <MovieIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}
                >
                    Movie Explorer
                </Typography>
                <Box sx={{ display: { xs: "none", sm: "block" }, mr: 2 }}>
                    <Button component={Link} to="/" color="inherit">
                        Home
                    </Button>
                    {user && (
                        <Button component={Link} to="/favorites" color="inherit">
                            Favorites
                        </Button>
                    )}
                </Box>
                <ThemeToggle />
                {user ? (
                    <>
                        <Typography variant="body1" sx={{ mx: 2 }}>
                            {user.username}
                        </Typography>
                        <Button color="secondary" variant="outlined" onClick={logout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button color="primary" variant="outlined" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
