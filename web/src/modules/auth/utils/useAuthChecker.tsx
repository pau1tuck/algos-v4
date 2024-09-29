// src/modules/auth/utils/useAuthChecker.tsx

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { logout, setUser } from '@site/src/redux/slices/authSlice';
import { RootState } from '@site/src/redux/store';
import { fetchUserProgress } from '@site/src/redux/thunks/userProgressThunk';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch'; // Import useAppDispatch

const useAuthChecker = (requiresAuth: boolean) => {
	const dispatch = useAppDispatch(); // Use the typed dispatch
	const [isLoading, setIsLoading] = useState(true);
	const [checkedAuth, setCheckedAuth] = useState(false);

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	); // Auth status from Redux
	const user = useSelector((state: RootState) => state.auth.user); // Get user from Redux

	useEffect(() => {
		const checkAuth = async () => {
			// If no auth is required or user already checked, stop loading
			if (!requiresAuth || checkedAuth || isAuthenticated) {
				setIsLoading(false);
				setCheckedAuth(true);
				return;
			}

			try {
				// Check for token in cookies
				const token = document.cookie
					.split("; ")
					.find((row) => row.startsWith("token="))
					?.split("=")[1];

				if (!token) {
					console.log("No token found, user is not authenticated");
					setIsLoading(false);
					setCheckedAuth(true);
					return;
				}

				console.log("Retrieved token from cookies:", token);

				// If user is not in Redux, fetch user data from the backend
				if (!user) {
					const response = await axios.get(
						"http://localhost:8000/api/users/profile/",
						{
							headers: {
								Authorization: `Token ${token}`,
							},
						},
					);

					console.log("User info response:", response.data);

					// If token is valid, dispatch the user data to Redux
					if (response.status === 200) {
						dispatch(setUser(response.data));

						// Fetch user progress after setting the user
						dispatch(fetchUserProgress());
					}
				}
			} catch (error) {
				console.error("Error validating token:", error);
				dispatch(logout()); // Logout and clear Redux state on error
			} finally {
				setIsLoading(false);
				setCheckedAuth(true);
			}
		};

		checkAuth();
	}, [dispatch, checkedAuth, requiresAuth, isAuthenticated, user]);

	return isLoading;
};

export default useAuthChecker;
