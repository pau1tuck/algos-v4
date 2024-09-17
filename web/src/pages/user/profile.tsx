// src/pages/user/profile.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import type { UserData } from "@site/src/modules/user/types/user.type";

const cookies = new Cookies();

const ProfilePage = () => {
	const [userData, setUserData] = useState<UserData | null>(null);

	useEffect(() => {
		const token = cookies.get("token");
		console.log("Token from cookie:", token);

		axios
			.get("http://localhost:8000/api/users/user/", {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((response) => {
				console.log("User data from API:", response.data);
				setUserData(response.data);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	}, []);

	return (
		<div>
			<h1>User Profile</h1>
			<p>First Name: {userData.first_name}</p>
			<p>Last Name: {userData.last_name}</p>
			<p>Email: {userData.email}</p>
		</div>
	);
};

export default ProfilePage;
