// src/modules/auth/components/Register.tsx
import React, { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
    MenuItem,
} from "@mui/material";

interface RegisterProps {
    onRegister: (
        email: string,
        password: string,
        country: string,
        city: string,
        firstName: string,
        lastName: string
    ) => Promise<boolean>;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const success = await onRegister(
                firstName,
                lastName,
                country,
                city,
                email,
                password
            );
            if (success) {
                // Navigate to user dashboard or login page
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    // Placeholder for countries dropdown
    const countries = [
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
        // Add more countries as needed
    ];

    return (
        <Container maxWidth="xs" sx={{ mb: 10 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 8,
                }}
            >
                <Typography component="h1" variant="h4" pb={2}>
                    Register
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 1, width: "100%" }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        select
                        id="country"
                        label="Country"
                        name="country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    >
                        {countries.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
