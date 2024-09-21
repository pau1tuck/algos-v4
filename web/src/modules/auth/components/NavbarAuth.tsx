// src/modules/auth/components/NavbarAuth.tsx
import React from "react";
import useAuthState from "@site/src/modules/auth/utils/useAuthState";
import LoginButton from "./buttons/LoginButton";
import SignUpButton from "./buttons/SignUpButton";
import UserAvatarButton from "@site/src/modules/user/components/buttons/UserAvatarButton";
import Loading from "@site/src/components/Loading";

const NavbarAuth = () => {
	const { isLoading, isAuthenticated, user } = useAuthState(true);

	if (isLoading) {
		return <Loading />;
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
