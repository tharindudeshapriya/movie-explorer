import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MovieCard from './MovieCard';
import tmdbApi from '../../services/tmdbApi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieCarousel = ({ title, genreId, apiMethod }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const sliderRef = React.useRef();
    const [isDragging, setIsDragging] = React.useState(false);

    React.useEffect(() => {
        const fetchMovies = async () => {
            try {
                let data;
                if (apiMethod) {
                    data = await apiMethod();
                } else {
                    data = await tmdbApi.discoverMovies({ with_genres: genreId });
                }
                setMovies(data.results || data);
            } catch (err) {
                setMovies([]);
            }
            setLoading(false);
        };
        fetchMovies();
    }, [genreId, apiMethod]);

    // Responsive carousel settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        arrows: false,
        swipeThreshold: 20,
        touchThreshold: 20,
        beforeChange: () => setIsDragging(true),
        afterChange: () => setTimeout(() => setIsDragging(false), 0),
        responsive: [
            {
                breakpoint: 1536,
                settings: { slidesToShow: 5, slidesToScroll: 1 }
            },
            {
                breakpoint: 1280,
                settings: { slidesToShow: 4, slidesToScroll: 1 }
            },
            {
                breakpoint: 960,
                settings: { slidesToShow: 3, slidesToScroll: 1 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2, slidesToScroll: 1 }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '20px'
                }
            }
        ]
    };

    // Auto-scroll with random timing and direction
    React.useEffect(() => {
        if (!sliderRef.current) return;
        let isMounted = true;
        let timer;

        const autoScroll = () => {
            if (!isMounted) return;
            const direction = Math.random() < 0.5 ? 'prev' : 'next';
            if (sliderRef.current) {
                if (direction === 'prev') {
                    sliderRef.current.slickPrev();
                } else {
                    sliderRef.current.slickNext();
                }
            }
            const randomDelay = Math.floor(Math.random() * 4000) + 3000; // 3-7 seconds
            timer = setTimeout(autoScroll, randomDelay);
        };

        const initialDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
        timer = setTimeout(autoScroll, initialDelay);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, []);

    return (
        <Box sx={{
            mb: 6,
            position: 'relative',
            px: { xs: 1, sm: 2 } // Responsive padding
        }}>
            <Typography variant="h5" mb={2} sx={{ px: { xs: 1, sm: 2 } }}>
                {title}
            </Typography>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
            }}>
                {/* Left Arrow */}
                {!isMobile && (
                    <IconButton
                        sx={{
                            position: 'relative',
                            left: 0,
                            zIndex: 2,
                            bgcolor: 'rgba(0,0,0,0.85)',
                            color: '#fff',
                            width: { xs: 32, sm: 48 },
                            height: { xs: 80, sm: 120 },
                            borderRadius: 2,
                            mr: 2,
                            '&:hover': { bgcolor: 'rgba(0,0,0,1)' }
                        }}
                        onClick={() => sliderRef.current?.slickPrev()}
                    >
                        <ChevronLeftIcon fontSize={isMobile ? 'medium' : 'large'} />
                    </IconButton>
                )}

                {/* Carousel */}
                <Box sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    width: '100%'
                }}>
                    <Slider
                        ref={sliderRef}
                        {...settings}
                    >
                        {movies.map((movie) => (
                            <Box key={movie.id} sx={{ px: { xs: 0.5, sm: 1 } }}>
                                <MovieCard movie={movie} isDragging={isDragging} />
                            </Box>
                        ))}
                    </Slider>
                </Box>

                {/* Right Arrow */}
                {!isMobile && (
                    <IconButton
                        sx={{
                            position: 'relative',
                            right: 0,
                            zIndex: 2,
                            bgcolor: 'rgba(0,0,0,0.85)',
                            color: '#fff',
                            width: { xs: 32, sm: 48 },
                            height: { xs: 80, sm: 120 },
                            borderRadius: 2,
                            ml: 2,
                            '&:hover': { bgcolor: 'rgba(0,0,0,1)' }
                        }}
                        onClick={() => sliderRef.current?.slickNext()}
                    >
                        <ChevronRightIcon fontSize={isMobile ? 'medium' : 'large'} />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default MovieCarousel;
