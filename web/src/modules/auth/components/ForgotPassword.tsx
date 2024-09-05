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
} from "@mui/material";

interface ForgotPasswordProps {
    onForgotPassword: (email: string) => Promise<boolean>;
}

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
    onForgotPassword,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: { email: string }) => {
        try {
            const success = await onForgotPassword(data.email);
            if (!success) {
                setError("root", {
                    type: "manual",
                    message:
                        "Failed to send password reset email. Please try again.",
                });
            }
            // If successful, show a success message or redirect
        } catch (err) {
            setError("root", {
                type: "manual",
                message: "An error occurred. Please try again.",
            });
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
                <Typography component="h1" variant="h3" pb={3}>
                    Reset Password
                </Typography>
                <Typography variant="body1" pb={2}>
                    Enter your email address and we'll send you a link to reset
                    your password.
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1, width: "100%" }}
                >
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
                                autoFocus
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    {errors.root && (
                        <Alert severity="error">{errors.root.message}</Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
