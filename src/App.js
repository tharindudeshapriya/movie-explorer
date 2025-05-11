import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./context/AuthContext";
import { ThemeModeProvider } from "./context/ThemeContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import UserProfilePage from "./pages/UserProfilePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { CssBaseline, Box } from "@mui/material";

function App() {
    return (
        <Provider store={store}>
            <ThemeModeProvider>
                <AuthProvider>
                    <CssBaseline />
                    <Router>
                        <Header />
                        <Box minHeight="80vh">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/movie/:id" element={<MoviePage />} />
                                <Route path="/search" element={<SearchResultsPage />} />
                                <Route path="/favorites" element={<UserProfilePage />} />
                                <Route path="/profile" element={<UserProfilePage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="*" element={<HomePage />} />
                            </Routes>
                        </Box>
                        <Footer />
                    </Router>
                </AuthProvider>
            </ThemeModeProvider>
        </Provider>
    );
}

export default App;
