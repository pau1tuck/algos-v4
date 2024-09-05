import React from "react";
import Layout from "@theme/Layout";
import Login from "@site/src/modules/auth/components/Login";
import { Box } from "@mui/material";

const LoginPage = () => {
    // Dummy onLogin function
    const dummyOnLogin = async (
        username: string,
        password: string
    ): Promise<boolean> => {
        console.log(
            `Attempting login with username: ${username} and password: ${password}`
        );

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For testing, let's say login is successful if username is "test" and password is "password"
        const isSuccessful = username === "test" && password === "password";

        console.log(isSuccessful ? "Login successful" : "Login failed");
        return isSuccessful;
    };

    const dummyGoogleLogin = () => {
        console.log("Google login clicked");
        // Implement actual Google login logic here
    };

    return (
        <Layout>
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    marginTop: "-50px",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Login
                    onLogin={dummyOnLogin}
                    onGoogleLogin={dummyGoogleLogin}
                />
            </Box>
        </Layout>
    );
};

export default LoginPage;
