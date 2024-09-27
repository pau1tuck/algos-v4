// web/src/modules/auth/components/NavbarAuth.tsx
import React from "react";
import useAuthState from "@site/src/modules/auth/utils/useAuthState";
import LoginButton from "./buttons/LoginButton";
import SignUpButton from "./buttons/SignUpButton";
import UserAvatarButton from "@site/src/modules/user/components/UserAvatarButton";
import Loading from "@site/src/components/Loading";
import { Typography, Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material"; // Material UI hooks for media query

const NavbarAuth = () => {
	const { isLoading, isAuthenticated, user } = useAuthState(true);
	const theme = useTheme(); // Get the theme to use breakpoints
	const isMediumOrLarger = useMediaQuery(theme.breakpoints.up("md")); // Check if screen is medium or larger

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			{isAuthenticated ? (
				<>
					{/* Conditionally render the user's full name on medium or larger screens */}
					{isMediumOrLarger && user && (
						<Typography
							variant="body1"
							fontWeight={500}
							sx={{ mr: 0.5, ml: 1 }}
						>
							{user.first_name} {user.last_name}
						</Typography>
					)}

					<UserAvatarButton avatar={user?.avatar} />
				</>
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
