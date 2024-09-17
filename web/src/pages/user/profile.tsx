// src/pages/user/profile.tsx

import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProfilePage = () => {
	useEffect(() => {
		const token = cookies.get("token");
		console.log("Retrieved token from cookies:", token); // Log the token to ensure it's being retrieved

		axios
			.get("http://localhost:8000/api/users/user/", {
				headers: {
					Authorization: `Token ${token}`, // Use 'Token' prefix for dj_rest_auth (No JWT prefix)
				},
			})
			.then((response) => {
				console.log("Response data:", response.data);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error.response); // Log the response object
				console.log("Error response status:", error.response.status); // Log status code
				console.log("Error response data:", error.response.data); // Log error details
			});
	}, []);

	return <div />;
};

export default ProfilePage;
