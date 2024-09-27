//web/src/pages/user/profile.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@site/src/redux/store"; // Adjust this to your store setup
import axios from "axios";
import Cookies from "universal-cookie";
import {
	Avatar,
	Typography,
	CircularProgress,
	Box,
	Container,
	TextField,
	Button,
	Paper,
} from "@mui/material";
import Layout from "@theme/Layout";
import { setUser } from "@site/src/redux/slices/authSlice"; // Action to update user profile
import withAuth from "@site/src/modules/auth/utils/withAuth"; // Import the HOC

const cookies = new Cookies();

interface UserProfile {
	first_name: string;
	last_name: string;
	avatar: string | null;
	country: string;
}

const ProfilePage: React.FC = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.auth); // Get user profile from Redux
	const [userProfile, setUserProfile] = useState<UserProfile | null>(
		user || null,
	); // Initially use Redux state
	const [loading, setLoading] = useState<boolean>(!userProfile); // If no Redux data, show loader
	const [error, setError] = useState<string | null>(null);
	const [editing, setEditing] = useState<boolean>(false);
	const [updatedProfile, setUpdatedProfile] = useState<UserProfile | null>(
		userProfile,
	);

	// Fetch profile from backend if not available in Redux
	useEffect(() => {
		if (!userProfile) {
			const token = cookies.get("token");

			axios
				.get("http://localhost:8000/api/users/profile/", {
					headers: {
						Authorization: `Token ${token}`,
					},
				})
				.then((response) => {
					setUserProfile(response.data);
					setUpdatedProfile(response.data);
					setLoading(false);

					// Dispatch the profile data to Redux
					dispatch(setUser(response.data)); // Update Redux store with new profile data
				})
				.catch((error) => {
					console.error("Error fetching user data:", error.response);
					setError("Failed to load user profile.");
					setLoading(false);
				});
		}
	}, [userProfile, dispatch]);

	// Save changes to profile
	const handleSave = () => {
		const token = cookies.get("token");
		if (!token) return;

		axios
			.put("http://localhost:8000/api/users/profile/", updatedProfile, {
				headers: { Authorization: `Token ${token}` },
			})
			.then((response) => {
				setUserProfile(response.data); // Update local state with new data
				dispatch(setUser(response.data)); // Update Redux store with new data
				setEditing(false);
			})
			.catch((err) => console.error("Failed to save changes", err));
	};

	if (loading) {
		return (
			<Layout>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="50vh"
				>
					<CircularProgress />
				</Box>
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="50vh"
				>
					<Typography variant="h6" color="error">
						{error}
					</Typography>
				</Box>
			</Layout>
		);
	}

	// Full URL for avatar
	const mediaBaseUrl = "http://localhost:8000"; // Backend URL for media files
	const avatarUrl = userProfile?.avatar
		? `${mediaBaseUrl}${userProfile.avatar}`
		: "";

	return (
		<Layout>
			<Container
				maxWidth="sm"
				sx={{
					minHeight: "300px",
					display: "flex",
					justifyContent: "center",
					marginTop: 10,
					marginBottom: 10,
				}}
			>
				<Paper elevation={3} sx={{ p: 4, width: "100%" }}>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						{/* Avatar */}
						<Avatar
							src={avatarUrl}
							alt={`${userProfile?.first_name} ${userProfile?.last_name}`}
							sx={{
								width: 128,
								height: 128,
								fontSize: 40,
								mb: 3,
							}}
						>
							{userProfile?.first_name.charAt(0)}
						</Avatar>

						{/* User info - Editable */}
						{editing ? (
							<>
								<TextField
									fullWidth
									label="First Name"
									value={updatedProfile?.first_name || ""}
									onChange={(e) =>
										setUpdatedProfile({
											...updatedProfile,
											first_name: e.target.value,
										})
									}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Last Name"
									value={updatedProfile?.last_name || ""}
									onChange={(e) =>
										setUpdatedProfile({
											...updatedProfile,
											last_name: e.target.value,
										})
									}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Country"
									value={updatedProfile?.country || ""}
									onChange={(e) =>
										setUpdatedProfile({
											...updatedProfile,
											country: e.target.value,
										})
									}
									margin="normal"
								/>
							</>
						) : (
							<>
								<Typography
									variant="h4"
									component="h1"
									gutterBottom
								>
									{userProfile?.first_name}{" "}
									{userProfile?.last_name}
								</Typography>
								<Typography variant="body1" gutterBottom>
									{userProfile?.country}
								</Typography>
							</>
						)}

						{/* Save button */}
						{editing && (
							<Button
								variant="contained"
								color="primary"
								fullWidth
								sx={{ mt: 3 }}
								onClick={handleSave}
							>
								Save Changes
							</Button>
						)}

						{/* Edit button */}
						{!editing && (
							<Button
								variant="outlined"
								fullWidth
								sx={{ mt: 3 }}
								onClick={() => setEditing(true)}
							>
								Edit Profile
							</Button>
						)}
					</Box>
				</Paper>
			</Container>
		</Layout>
	);
};

export default withAuth(ProfilePage);
