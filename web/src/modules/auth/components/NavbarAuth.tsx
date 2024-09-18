// src/modules/auth/components/NavbarAuth.tsx
import React from "react";
import useAuthState from "@site/src/modules/auth/utils/useAuthState";
import LoginButton from "./buttons/LoginButton";
import SignUpButton from "./buttons/SignUpButton";
import UserAvatarButton from "@site/src/modules/user/components/buttons/UserAvatarButton";

const NavbarAuth = () => {
	const { isLoading, isAuthenticated, user } = useAuthState();

	console.log("isAuthenticated state:", isAuthenticated);
	console.log("User state:", user);

	if (isLoading) {
		return <div>Loading...</div>; // Show loading state
	}

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
