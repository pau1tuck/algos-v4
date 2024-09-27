//web/src/pages/register.tsx
import React from "react";
import Layout from "@theme/Layout";
import Register from "@site/src/modules/auth/components/Register";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

const RegisterPage = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

    // Dummy onRegister function
    const dummyOnRegister = async (
        email: string,
        password: string,
        country: string,
        firstName: string,
        lastName: string
    ): Promise<boolean> => {
        console.log(
            `Attempting registration with email: ${email}, country: ${country}, firstName: ${firstName}, lastName: ${lastName}`
        );

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For testing, let's say registration is always successful
        const isSuccessful = true;

        console.log(
            isSuccessful ? "Registration successful" : "Registration failed"
        );
        return isSuccessful;
    };

    return (
        <Layout>
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{ flexGrow: 1 }}
                >
                    {isLargeScreen && (
                        <Box
                            sx={{
                                flex: 1,
                                backgroundImage:
                                    "url(/img/register-background.jpg)",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    )}
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 3,
                        }}
                    >
                        <Register onRegister={dummyOnRegister} />
                    </Box>
                </Stack>
            </Box>
        </Layout>
    );
};

export default RegisterPage;
