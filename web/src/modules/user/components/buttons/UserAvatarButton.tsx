// src/modules/auth/components/buttons/UserAvatarButton.tsx
import type React from "react";
import { useState } from "react";
import { Avatar, Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { logout } from "@site/src/redux/slices/authSlice";
import Link from "@docusaurus/Link"; // Import Docusaurus Link
import { useHistory } from "react-router-dom"; // Import useHistory for navigation

interface UserAvatarButtonProps {
	user: {
		// biome-ignore lint: style/useNamingConvention: Django and dj_rest_auth require this naming
		first_name: string;
		// Include other user properties if necessary
	};
}

const UserAvatarButton: React.FC<UserAvatarButtonProps> = ({ user }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const dispatch = useDispatch();
	const history = useHistory(); // Initialize useHistory

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		console.log(user.first_name);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(logout());
		handleMenuClose();
		history.push("/"); // Redirect to the home page after logging out
	};

	return (
		<>
			<Box sx={{ cursor: "pointer" }}>
				<Avatar onClick={handleMenuOpen}>
					{user.first_name.charAt(0)}
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
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</>
	);
};

export default UserAvatarButton;
