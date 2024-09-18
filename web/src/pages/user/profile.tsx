// src/pages/user/profile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Layout from "@theme/Layout";
import withAuth from "@site/src/modules/auth/utils/withAuth"; // Import the HOC

const cookies = new Cookies();

const ProfilePage = () => {
	const [userName, setUserName] = useState<string>("");

	useEffect(() => {
		// Fallback: fetch user data using the token directly from the cookie
		const token = cookies.get("token");
		if (!token) {
			console.log("No token found, redirecting to login.");
			return;
		}

		console.log("Retrieved token from cookies:", token);

		axios
			.get("http://localhost:8000/api/users/me", {
				headers: {
					Authorization: `Token ${token}`, // LINT: useNamingConvention
				},
			})
			.then((response) => {
				console.log("Response data:", response.data);
				setUserName(
					`${response.data.first_name} ${response.data.last_name}`,
				);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error.response);
			});
	}, []);

	return (
		<Layout>
			<div>Welcome, {userName}.</div>
		</Layout>
	);
};

export default withAuth(ProfilePage);
