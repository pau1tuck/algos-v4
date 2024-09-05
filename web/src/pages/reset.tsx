import React from "react";
import Layout from "@theme/Layout";
import ResetPassword from "@site/src/modules/auth/components/ResetPassword";
import { useLocation } from "@docusaurus/router";
import { Container, Typography, Box, Button } from "@mui/material";
import Link from "@docusaurus/Link";

const ResetPasswordPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    // Dummy onResetPassword function
    const dummyOnResetPassword = async (
        password: string,
        token: string
    ): Promise<boolean> => {
        console.log(`Attempting to reset password with token: ${token}`);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For testing, let's say the password reset is always successful
        const isSuccessful = true;

        console.log(
            isSuccessful ? "Password reset successful" : "Password reset failed"
        );
        return isSuccessful;
    };

    if (!token) {
        return (
            <Layout>
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: 8,
                        }}
                    >
                        <Typography component="h1" variant="h3" pb={3}>
                            404 Not Found
                        </Typography>
                        <Typography variant="body1" pb={3} textAlign="center">
                            Your password reset link is invalid or has expired.
                            Please request a new one.
                        </Typography>
                        <Button
                            component={Link}
                            to="/forgot"
                            variant="contained"
                            color="secondary"
                        >
                            Reset Password
                        </Button>
                    </Box>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <ResetPassword
                onResetPassword={dummyOnResetPassword}
                token={token}
            />
        </Layout>
    );
};

export default ResetPasswordPage;
