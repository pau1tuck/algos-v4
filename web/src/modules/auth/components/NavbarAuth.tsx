// src/modules/auth/components/NavbarAuth.tsx
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@site/src/redux/store";
import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";
import SignUpButton from "./buttons/SignUpButton";

const NavbarAuth = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	);

	console.log("isAuthenticated state:", isAuthenticated); // Log to verify state

	return (
		<div>
			{isAuthenticated ? (
				<LogoutButton />
			) : (
				<>
					<LoginButton />
					<SignUpButton />
				</>
			)}
		</div>
	);
};

export default NavbarAuth;
