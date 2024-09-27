//web/src/pages/forgot.tsx

import React from "react";
import Layout from "@theme/Layout";
import ForgotPassword from "@site/src/modules/auth/components/ForgotPassword";
import useIsAuthenticated from "@site/src/modules/auth/utils/useIsAuthenticated";
import Loading from "@site/src/components/Loading"; // Assuming you have a Loading component

const ForgotPasswordPage = () => {
	// Call the hook to redirect logged-in users
	const { isLoading } = useIsAuthenticated();

	// Dummy onForgotPassword function
	const dummyOnForgotPassword = async (email: string): Promise<boolean> => {
		console.log(`Attempting to send password reset email to: ${email}`);

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// For testing, let's say the password reset email is always sent successfully
		const isSuccessful = true;

		console.log(
			isSuccessful
				? "Password reset email sent successfully"
				: "Failed to send password reset email",
		);
		return isSuccessful;
	};

	// Show a loading state while checking authentication
	if (isLoading) {
		return <Loading />; // Render your loading spinner or a placeholder component
	}

	return (
		<Layout>
			<div className="">
				<ForgotPassword onForgotPassword={dummyOnForgotPassword} />
			</div>
		</Layout>
	);
};

export default ForgotPasswordPage;
