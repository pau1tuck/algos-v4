// src/modules/auth/components/buttons/LogoutButton.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "@site/src/redux/slices/authSlice";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleLogout = () => {
		dispatch(logout());
		history.push("/"); // Redirect to the home page
	};

	return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;
