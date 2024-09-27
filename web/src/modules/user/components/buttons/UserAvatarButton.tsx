//web/src/modules/user/components/buttons/UserAvatarButton.tsx
import React, { useState } from "react";
import {
	Avatar,
	Box,
	Menu,
	MenuItem,
	Typography,
	Divider,
} from "@mui/material";
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

	// Full URL for avatar
	const mediaBaseUrl = "http://localhost:8000"; // Backend URL for media files
	const avatarUrl = user?.avatar ? `${mediaBaseUrl}${user.avatar}` : "";

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
				<Avatar onClick={handleMenuOpen} src={avatarUrl}>
					{!user.avatar ? user.first_name.charAt(0) : null}
					{/* Fallback to initial if no avatar */}
				</Avatar>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				{/* User's full name at the top */}
				<Box sx={{ px: 2, py: 1 }}>
					<Typography variant="subtitle1">
						{user.first_name} {user.last_name}
					</Typography>
				</Box>
				<Divider />

				{/* Profile link */}
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
