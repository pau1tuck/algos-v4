// src/pages/user/profile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Layout from "@theme/Layout";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@site/src/redux/store";

const cookies = new Cookies();

const ProfilePage = () => {
	const [userName, setUserName] = useState<string>("");
	const history = useHistory();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	);
	const user = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		// Check if the user is not authenticated and redirect if needed
		if (!isAuthenticated) {
			history.push("/");
			return;
		}

		// If user data is already in Redux state, use it to set userName
		if (user) {
			setUserName(`${user.first_name} ${user.last_name}`);
		} else {
			// Fallback: fetch user data using the token directly from the cookie
			const token = cookies.get("token");
			if (!token) {
				history.push("/");
				return;
			}

			console.log("Retrieved token from cookies:", token);

			axios
				.get("http://localhost:8000/api/users/me", {
					headers: {
						Authorization: `Token ${token}`,
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
					history.push("/");
				});
		}
	}, [isAuthenticated, user, history]);

	return (
		<Layout>
			<div>Welcome, {userName}.</div>
		</Layout>
	);
};

export default ProfilePage;
