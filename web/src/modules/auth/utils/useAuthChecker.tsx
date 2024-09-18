// src/modules/auth/utils/useAuthChecker.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, logout } from "@site/src/redux/slices/authSlice";
import type { RootState } from "@site/src/redux/store";

const useAuthChecker = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				// Retrieve token from cookies
				const token = document.cookie
					.split("; ")
					.find((row) => row.startsWith("token="))
					?.split("=")[1];

				if (!token) {
					console.log("No token found, user is not authenticated");
					return;
				}

				console.log("Retrieved token from cookies:", token);

				// Call the user info endpoint to validate the token
				const response = await axios.get(
					"http://localhost:8000/api/users/me",
					{
						headers: {
							// biome-ignore lint: style/useNamingConvention: dj_rest_auth requires this naming
							Authorization: `Token ${token}`,
						},
					},
				);

				console.log("User info response:", response.data);

				// If successful, update the Redux state directly
				if (response.status === 200) {
					dispatch(setUser(response.data));
				}
			} catch (error) {
				console.error("Error validating token:", error);
				// If there's an error, make sure we clear the auth state
				dispatch(logout());
			}
		};

		// Always run checkAuth to set the state correctly on initial load
		checkAuth();
	}, [dispatch, isAuthenticated]);
};

export default useAuthChecker;
