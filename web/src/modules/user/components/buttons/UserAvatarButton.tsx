// src/modules/auth/components/buttons/UserAvatarButton.tsx
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { logout } from "@site/src/redux/slices/authSlice";

interface UserAvatarButtonProps {
	user: {
		first_name: string;
		// Include other user properties if necessary
	};
}

const UserAvatarButton: React.FC<UserAvatarButtonProps> = ({ user }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const dispatch = useDispatch();

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
	};

	return (
		<>
			<Avatar onClick={handleMenuOpen}>
				{user.first_name.charAt(0)}
			</Avatar>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</>
	);
};

export default UserAvatarButton;
