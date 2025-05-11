import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";

const Footer = () => (
    <Box component="footer" py={2} textAlign="center" bgcolor="background.paper">
        <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Movie Explorer | Powered by{" "}
            <MuiLink href="https://www.themoviedb.org/" target="_blank" rel="noopener" underline="hover">
                TMDb
            </MuiLink>
        </Typography>
    </Box>
);

export default Footer;
