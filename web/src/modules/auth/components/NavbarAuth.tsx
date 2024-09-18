// src/modules/auth/components/NavbarAuth.tsx
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@site/src/redux/store";
import LoginButton from "./buttons/LoginButton";
import SignUpButton from "./buttons/SignUpButton";
import UserAvatarButton from "@site/src/modules/user/components/buttons/UserAvatarButton";

const NavbarAuth = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	);

	const user = useSelector((state: RootState) => state.auth.user);

	console.log("isAuthenticated state:", isAuthenticated);
	console.log("User state:", user);

	return (
		<div>
			{isAuthenticated ? (
				<UserAvatarButton user={user} />
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
