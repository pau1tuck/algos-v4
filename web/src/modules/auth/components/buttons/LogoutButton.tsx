// src/modules/auth/components/buttons/LogoutButton.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "@site/src/redux/slices/authSlice";

const LogoutButton = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;
