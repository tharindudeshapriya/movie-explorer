import React, { useContext } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/moviesSlice";

const MovieCard = ({ movie, isDragging }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.movies.favorites);
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    const handleFavoriteToggle = (e) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFavorite(movie.id));
        } else {
            dispatch(addFavorite(movie));
        }
    };

    const handleCardClick = (e) => {
        if (isDragging) {
            e.preventDefault();
            return;
        }
        navigate(`/movie/${movie.id}`);
    };

    return (
        <Card
            sx={{
                maxWidth: 220,
                m: 1,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)", zIndex: 1 },
            }}
            onClick={handleCardClick}
        >
            <CardMedia
                component="img"
                height="320"
                image={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                        : "/no-image.jpg"
                }
                alt={movie.title}
            />
            <CardContent sx={{ p: 1 }}>
                <Typography variant="subtitle1" noWrap>
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"} | ★ {movie.vote_average}
                </Typography>
            </CardContent>
            {user && (
                <CardActions disableSpacing>
                    <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
                        <IconButton
                            onClick={handleFavoriteToggle}
                            sx={{ color: isFavorite ? "red" : "inherit" }}
                        >
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            )}
        </Card>
    );
};

export default MovieCard;
