// src/modules/auth/utils/useAuthChecker.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, logout } from "@site/src/redux/slices/authSlice";

const useAuthChecker = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [checkedAuth, setCheckedAuth] = useState(false); // New state to track if auth has been checked

	useEffect(() => {
		const checkAuth = async () => {
			if (checkedAuth) return; // Avoid repeated checks

			try {
				const token = document.cookie
					.split("; ")
					.find((row) => row.startsWith("token="))
					?.split("=")[1];

				if (!token) {
					console.log("No token found, user is not authenticated");
					setIsLoading(false);
					setCheckedAuth(true); // Mark auth as checked
					return;
				}

				console.log("Retrieved token from cookies:", token);

				const response = await axios.get(
					"http://localhost:8000/api/users/me",
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					},
				);

				console.log("User info response:", response.data);

				if (response.status === 200) {
					dispatch(setUser(response.data));
				}
			} catch (error) {
				console.error("Error validating token:", error);
				dispatch(logout());
			} finally {
				setIsLoading(false);
				setCheckedAuth(true); // Ensure loading state is updated
			}
		};

		checkAuth();
	}, [dispatch, checkedAuth]);

	return isLoading;
};

export default useAuthChecker;