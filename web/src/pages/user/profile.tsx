// src/pages/user/profile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Layout from "@theme/Layout";
import { useHistory } from "react-router-dom"; // Import useHistory
import useAuthChecker from "@site/src/modules/auth/utils/useAuthChecker";

const cookies = new Cookies();

const ProfilePage = () => {
	const [userName, setUserName] = useState<string>("");
	const history = useHistory(); // Initialize useHistory
	useAuthChecker(); // Ensure user is authenticated

	useEffect(() => {
		const token = cookies.get("token");
		console.log("Retrieved token from cookies:", token); // Log the token to ensure it's being retrieved

		if (!token) {
			// If there's no token, redirect to the home page
			history.push("/");
			return;
		}

		axios
			.get("http://localhost:8000/api/users/me", {
				headers: {
					Authorization: `Token ${token}`, // Use 'Token' prefix for dj_rest_auth (No JWT prefix)
				},
			})
			.then((response) => {
				console.log("Response data:", response.data);
				setUserName(
					`${response.data.first_name} ${response.data.last_name}`,
				);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error.response); // Log the response object
				console.log("Error response status:", error.response.status); // Log status code
				console.log("Error response data:", error.response.data); // Log error details
				// Redirect to the home page if an error occurs
				history.push("/");
			});
	}, [history]);

	return (
		<Layout>
			<div>Welcome, {userName}.</div>
		</Layout>
	);
};

export default ProfilePage;
