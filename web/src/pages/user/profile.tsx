// src/pages/user/profile.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Layout from "@theme/Layout";

const cookies = new Cookies();

const ProfilePage = () => {
	const [userName, setUserName] = useState<string>("");

	useEffect(() => {
		const token = cookies.get("token");
		console.log("Retrieved token from cookies:", token); // Log the token to ensure it's being retrieved

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
			});
	}, []);

	return (
		<Layout>
			<div>Welcome, {userName}.</div>{" "}
		</Layout>
	);
};

export default ProfilePage;
