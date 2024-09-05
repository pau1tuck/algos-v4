import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
    MenuItem,
    Divider,
} from "@mui/material";
import GoogleButton from "./GoogleButton";

interface RegisterProps {
    onRegister: (
        firstName: string,
        lastName: string,
        country: string,
        email: string,
        password: string
    ) => Promise<boolean>;
}

const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    country: yup.string().required("Country is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async data => {
        try {
            const success = await onRegister(
                data.firstName,
                data.lastName,
                data.country,
                data.email,
                data.password
            );
            if (success) {
                // Navigate to user dashboard or login page
            } else {
                // Handle registration failure
            }
        } catch (err) {
            // Handle error
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
                    mt: 2,
                }}
            >
                <Typography component="h1" variant="h3" pb={5}>
                    Register
                </Typography>
                <GoogleButton
                    onClick={() => {
                        // Handle Google Sign Up
                    }}
                >
                    Sign up with Google
                </GoogleButton>
                <Divider sx={{ my: 2, width: "100%" }}>or</Divider>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ width: "100%" }}
                >
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        )}
                    />
                    <Controller
                        name="country"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                select
                                id="country"
                                label="Country"
                                error={!!errors.country}
                                helperText={errors.country?.message}
                            >
                                {countries.map(option => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email address"
                                autoComplete="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
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
