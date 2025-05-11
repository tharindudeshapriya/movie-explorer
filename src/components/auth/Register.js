import React, { useState, useContext } from "react";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "", confirm: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) {
            setError("Passwords do not match");
            return;
        }
        try {
            await register(form.username, form.password);
            navigate("/login");
        } catch (err) {
            setError("Registration failed. Try a different username.");
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Paper elevation={3} sx={{ p: 4, width: 350 }}>
                <Typography variant="h5" mb={2} align="center">
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirm"
                        type="password"
                        value={form.confirm}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {error && (
                        <Typography color="error" variant="body2" mb={1}>
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                    <Button
                        color="secondary"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => navigate("/login")}
                    >
                        Already have an account? Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
