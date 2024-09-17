// src/pages/login.tsx

import React from "react";
import Layout from "@theme/Layout";
import Login from "@site/src/modules/auth/components/Login";
import { Box } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

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
			const { key } = response.data; // Access the "key" field from the response
			// Store the key in a secure cookie
			cookies.set("token", key, {
				path: "/",
				secure: true,
				sameSite: "strict",
			});
			console.log("Login successful, Key:", key);
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
