//web/pages/register.tsx
import React from 'react';
import Layout from '@theme/Layout';
import Register from '@site/src/modules/auth/components/Register';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import useIsAuthenticated from '@site/src/modules/auth/utils/useIsAuthenticated'; // Import the new hook

const RegisterPage = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    useIsAuthenticated(); // If the user is already authenticated, redirect to the profile page

    const handleRegister = async (
        email: string,
        password: string, // Only send one password
        country: string,
        firstName: string,
        lastName: string
    ): Promise<boolean> => {
        try {
            const response = await axios.post("/api/auth/registration/", {
                email,
                password1: password,
                first_name: firstName,
                last_name: lastName,
                country,
            });

            if (response.status === 201) {
                console.log("Registration successful.");
                return true;
            }
        } catch (error) {
            console.error("Registration failed.", error);
            return false;
        }
        return false;
    };

    return (
        <Layout>
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Stack direction={{ xs: 'column', md: 'row' }} sx={{ flexGrow: 1 }}>
                    {isLargeScreen && (
                        <Box
                            sx={{
                                flex: 1,
                                backgroundImage: 'url(/img/register-background.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    )}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 3,
                        }}
                    >
                        <Register onRegister={handleRegister} />
                    </Box>
                </Stack>
            </Box>
        </Layout>
    );
};

export default RegisterPage;