import React from "react";
import Layout from "@theme/Layout";
import Login from "@site/src/modules/auth/Login";

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

    return (
        <Layout>
            <div className="">
                <div>Hello, Bitch!</div>
                <Login onLogin={dummyOnLogin} />
            </div>
        </Layout>
    );
};

export default LoginPage;
