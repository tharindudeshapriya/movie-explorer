import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
    const { mode, toggleTheme } = useContext(ThemeContext);

    return (
        <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export default ThemeToggle;
