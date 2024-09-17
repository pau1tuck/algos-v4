import React from "react";
import Layout from "@theme/Layout";
import Login from "@site/src/modules/auth/components/Login";
import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "@site/src/redux/store"; // Adjust path as needed
import { loginUser } from "@site/src/redux/slices/authSlice";

const LoginPage = () => {
	const history = useHistory();
	const dispatch = useAppDispatch(); // Use custom hook

	const handleLogin = async (
		email: string,
		password: string,
	): Promise<boolean> => {
		const resultAction = await dispatch(loginUser({ email, password }));

		if (loginUser.fulfilled.match(resultAction)) {
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
