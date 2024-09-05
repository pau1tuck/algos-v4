import React, { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
    Divider,
} from "@mui/material";
import GoogleButton from "@site/src/modules/auth/components/GoogleButton";

interface LoginProps {
    onLogin: (email: string, password: string) => Promise<boolean>;
    onGoogleLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoogleLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const success = await onLogin(email, password);
            if (success) {
                // Navigate to user dashboard
            } else {
                setError("Invalid email address or password");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 8,
                }}
            >
                <Typography component="h1" variant="h4" pb={2}>
                    Log In
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
                        autoComplete="current-password"
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
                    <Divider sx={{ my: 2 }}>or</Divider>
                    <GoogleButton onClick={onGoogleLogin} />
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
