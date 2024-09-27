import React, { useState } from "react";
import { Avatar, Box, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "@site/src/redux/slices/authSlice";
import Link from "@docusaurus/Link"; // Import Docusaurus Link
import { useHistory } from "@docusaurus/router"; // Use Docusaurus router for navigation
import PersonIcon from "@mui/icons-material/Person"; // Profile icon
import SettingsIcon from "@mui/icons-material/Settings"; // Settings icon
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon

interface UserAvatarButtonProps {
	avatar: string | null;
}

const UserAvatarButton: React.FC<UserAvatarButtonProps> = ({ avatar }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const dispatch = useDispatch();
	const history = useHistory(); // Use Docusaurus history for navigation

	// Full URL for avatar
	const mediaBaseUrl = "http://localhost:8000"; // Backend URL for media files
	const avatarUrl = avatar ? `${mediaBaseUrl}${avatar}` : "";

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

	return (
		<Box ml={1}>
			<Box sx={{ cursor: "pointer" }}>
				<Avatar onClick={handleMenuOpen} src={avatarUrl}>
					{!avatar ? "U" : null}
				</Avatar>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				sx={{ "& .MuiPaper-root": { width: 175 } }}
			>
				{/* Profile link */}
				<MenuItem onClick={handleMenuClose}>
					<ListItemIcon>
						<PersonIcon />
					</ListItemIcon>
					<Link
						to="/user/profile"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						Profile
					</Link>
				</MenuItem>

				{/* Settings link */}
				<MenuItem onClick={handleMenuClose}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<Link
						to="/"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						Settings
					</Link>
				</MenuItem>

				{/* Logout functionality */}
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	);
};

export default UserAvatarButton;
