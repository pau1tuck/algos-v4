//web/src/modules/auth/utils/useAuthChecker.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, logout } from "@site/src/redux/slices/authSlice";

const useAuthChecker = (requiresAuth: boolean) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [checkedAuth, setCheckedAuth] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			if (!requiresAuth || checkedAuth) {
				setIsLoading(false);
				setCheckedAuth(true);
				return;
			}

			try {
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
				setCheckedAuth(true);
			}
		};

		checkAuth();
	}, [dispatch, checkedAuth, requiresAuth]);

	return isLoading;
};

export default useAuthChecker;