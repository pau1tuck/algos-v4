// src/pages/login.tsx

import React from "react";
import Layout from "@theme/Layout";
import Login from "@site/src/modules/auth/components/Login";
import { Box } from "@mui/material";
import axios from "axios";

const LoginPage = () => {
	const dummyOnLogin = async (
		email: string,
		password: string,
	): Promise<boolean> => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/users/login/",
				{
					email,
					password,
				},
			);
			const { key, user } = response.data; // Access the "key" and "user" fields from the response
			// Store the key and user data in local storage or state
			localStorage.setItem("token", key);
			localStorage.setItem("user", JSON.stringify(user));
			console.log("Login successful, Key:", key, "User:", user);
			return true;
		} catch (error) {
			console.error("Login failed", error);
			return false;
		}
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
