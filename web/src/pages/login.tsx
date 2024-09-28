//web/src/pages/login.tsx
import React from "react";
import Layout from "@theme/Layout";
import Login from "@site/src/modules/auth/components/Login";
import { Box } from "@mui/material";
import { useHistory } from "@docusaurus/router"; // Use Docusaurus router
import { useAppDispatch } from "@site/src/redux/utils/useAppDispatch";
import { loginUser } from "@site/src/redux/thunks/authThunk";
import useIsAuthenticated from "@site/src/modules/auth/utils/useIsAuthenticated";
import Loading from "@site/src/components/Loading"; // Assuming you have a Loading component

const LoginPage = () => {
	const history = useHistory();
	const dispatch = useAppDispatch(); // Use custom hook

	// Use the hook to check if the user is already authenticated
	const { isLoading } = useIsAuthenticated();

	// Handle the login process
	const handleLogin = async (
		email: string,
		password: string,
	): Promise<boolean> => {
		console.log("Dispatching loginUser thunk with:", { email, password }); // Log dispatch
		const resultAction = await dispatch(loginUser({ email, password }));

		if (loginUser.fulfilled.match(resultAction)) {
			console.log("Login successful, redirecting to profile"); // Log redirection
			history.push("/user/profile");
			return true;
		}

		console.error("Login failed", resultAction.payload);
		return false;
	};

	const dummyGoogleLogin = () => {
		console.log("Google login clicked");
		// Implement actual Google login logic here
	};

	// Show a loading state while checking authentication
	if (isLoading) {
		return <Loading />; // Render your loading spinner or a placeholder component
	}

	// Render the login page only after authentication check is complete
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
				<Login onLogin={handleLogin} onGoogleLogin={dummyGoogleLogin} />
			</Box>
		</Layout>
	);
};

export default LoginPage;
