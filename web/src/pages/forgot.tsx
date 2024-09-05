import React from "react";
import Layout from "@theme/Layout";
import ForgotPassword from "@site/src/modules/auth/components/ForgotPassword";

const ForgotPasswordPage = () => {
    // Dummy onForgotPassword function
    const dummyOnForgotPassword = async (email: string): Promise<boolean> => {
        console.log(`Attempting to send password reset email to: ${email}`);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For testing, let's say the password reset email is always sent successfully
        const isSuccessful = true;

        console.log(
            isSuccessful
                ? "Password reset email sent successfully"
                : "Failed to send password reset email"
        );
        return isSuccessful;
    };

    return (
        <Layout>
            <div className="">
                <ForgotPassword onForgotPassword={dummyOnForgotPassword} />
            </div>
        </Layout>
    );
};

export default ForgotPasswordPage;
