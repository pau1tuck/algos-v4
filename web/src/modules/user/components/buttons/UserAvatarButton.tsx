//web/src/modules/user/components/buttons/UserAvatarButton.tsx
import React, { useState } from "react";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@site/src/redux/slices/authSlice";
import Link from "@docusaurus/Link"; // Import Docusaurus Link
import { useHistory } from "@docusaurus/router"; // Use Docusaurus router for navigation
import type { RootState } from "@site/src/redux/store"; // Import RootState to type the selector

const UserAvatarButton: React.FC = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const dispatch = useDispatch();
	const history = useHistory(); // Use Docusaurus history for navigation

	// Fetch user data from Redux
	const user = useSelector((state: RootState) => state.auth.user);

	// Open the menu
	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	// Close the menu
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(logout());
		handleMenuClose();
		history.push("/"); // Use Docusaurus history for navigation
	};

	if (!user) {
		return null; // Render nothing if the user is not authenticated
	}

	return (
		<Box ml={1}>
			<Box sx={{ cursor: "pointer" }}>
				<Avatar onClick={handleMenuOpen} src={user.avatar || ""}>
					{user.avatar ? null : user.first_name.charAt(0)}{" "}
					{/* Fallback to initial if no avatar */}
				</Avatar>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/user/profile"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						Profile
					</Link>
				</MenuItem>
				{/* Logout functionality */}
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</Box>
	);
};

export default UserAvatarButton;
