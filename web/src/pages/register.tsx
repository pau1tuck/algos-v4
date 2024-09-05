import React from "react";
import Layout from "@theme/Layout";
import Register from "@site/src/modules/auth/Register";

const RegisterPage = () => {
    // Dummy onRegister function
    const dummyOnRegister = async (
        email: string,
        password: string,
        country: string,
        city: string,
        firstName: string,
        lastName: string
    ): Promise<boolean> => {
        console.log(
            `Attempting registration with email: ${email}, country: ${country}, city: ${city}, firstName: ${firstName}, lastName: ${lastName}`
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
            <div className="">
                <Register onRegister={dummyOnRegister} />
            </div>
        </Layout>
    );
};

export default RegisterPage;
