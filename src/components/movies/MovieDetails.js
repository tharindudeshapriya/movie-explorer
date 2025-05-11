import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Chip,
    Grid,
    Paper,
    CircularProgress,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import tmdbApi from "../../services/tmdbApi";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
    const { id } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const data = await tmdbApi.getMovieDetails(id);
                setMovie(data);
                setCast(data.credits.cast.slice(0, 8));
                const trailerVideo = data.videos.results.find(
                    (vid) => vid.site === "YouTube" && vid.type === "Trailer"
                );
                setTrailer(trailerVideo ? trailerVideo.key : "");
            } catch (err) {
                setMovie(null);
            }
            setLoading(false);
        };
        fetchMovie();
    }, [id]);

    if (loading) return <Box textAlign="center" mt={4}><CircularProgress /></Box>;
    if (!movie) return <Typography color="error">Movie not found.</Typography>;

    return (
        <Paper
            sx={{
                p: { xs: 1, sm: 3 },
                mt: 2,
                mx: "auto",
                maxWidth: 1100,
                boxShadow: 4,
                borderRadius: 3,
                bgcolor: "background.paper",
            }}
        >
            {/* Poster and details side by side */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 3, md: 5 },
                    alignItems: { xs: "center", md: "flex-start" },
                    mb: 4,
                }}
            >
                {/* Poster */}
                <Box
                    sx={{
                        width: { xs: "65vw", sm: 220, md: 280 },
                        maxWidth: 320,
                        minWidth: { xs: 120, sm: 180, md: 220 },
                        flexShrink: 0,
                        mx: { xs: "auto", md: 0 },
                        boxShadow: 2,
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: "#f5f5f5",
                    }}
                >
                    <img
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "/no-image.jpg"
                        }
                        alt={movie.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                        }}
                    />
                </Box>
                {/* Details */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        fontWeight={700}
                        gutterBottom
                        sx={{ wordBreak: "break-word" }}
                    >
                        {movie.title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontWeight: 500, fontSize: { xs: 15, sm: 17 } }}
                    >
                        ⭐ {movie.vote_average} &nbsp; | &nbsp; {movie.runtime} min
                    </Typography>
                    <Box mb={2} flexWrap="wrap">
                        {movie.genres.map((genre) => (
                            <Chip
                                key={genre.id}
                                label={genre.name}
                                sx={{
                                    mr: 1,
                                    mb: 1,
                                    fontSize: { xs: 12, sm: 14 },
                                    bgcolor: theme.palette.mode === "dark" ? "#222" : "#f0f0f0",
                                }}
                            />
                        ))}
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            mt: 2,
                            color: "text.primary",
                            fontSize: { xs: 15, sm: 17 },
                            lineHeight: 1.7,
                            textAlign: "justify",
                        }}
                    >
                        {movie.overview}
                    </Typography>
                </Box>
            </Box>

            {/* Cast section */}
            <Box mt={2}>
                <Typography variant="h6" mb={2} fontWeight={600}>
                    Cast
                </Typography>
                <Grid
                    container
                    spacing={{ xs: 1, sm: 2, md: 3 }}
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    {cast.map((actor) => (
                        <Grid
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            lg={2}
                            key={actor.cast_id}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: 80, sm: 90, md: 100 },
                                    height: { xs: 105, sm: 120, md: 135 },
                                    mb: 1,
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    boxShadow: 1,
                                    bgcolor: "#e0e0e0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    "&:hover": {
                                        transform: "scale(1.07)",
                                        boxShadow: 4,
                                    },
                                }}
                            >
                                <img
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                            : "/no-image.jpg"
                                    }
                                    alt={actor.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    width: { xs: 80, sm: 90, md: 100 },
                                    textAlign: "center",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                                title={actor.name}
                            >
                                {actor.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    width: { xs: 80, sm: 90, md: 100 },
                                    textAlign: "center",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                                title={actor.character}
                            >
                                as {actor.character}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>


            {/* Trailer section */}
            {trailer && (
                <Box mt={6}>
                    <Typography variant="h6" mb={2} fontWeight={600}>
                        Trailer
                    </Typography>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "56.25%", // 16:9 aspect ratio
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: 2,
                        }}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer}?rel=0&autoplay=0`}
                            title="YouTube trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                border: 0,
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default MovieDetails;
