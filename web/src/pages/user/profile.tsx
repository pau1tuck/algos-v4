//web/src/pages/user/profile.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@site/src/redux/store";
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
	MenuItem,
} from "@mui/material";
import Layout from "@theme/Layout";
import { setUser } from "@site/src/redux/slices/authSlice"; // Action to update user profile
import withAuth from "@site/src/modules/auth/utils/withAuth"; // Import the HOC

const cookies = new Cookies();

interface UserProfile {
	first_name: string;
	last_name: string;
	username: string;
	headline: string;
	custom_headline: string | null;
	email: string;
	city: string;
	country: string;
	avatar: string | null;
}

const ProfilePage: React.FC = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.auth);
	const [userProfile, setUserProfile] = useState<UserProfile | null>(
		user || null,
	);
	const [loading, setLoading] = useState<boolean>(!userProfile);
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
					headers: { Authorization: `Token ${token}` },
				})
				.then((response) => {
					setUserProfile(response.data);
					setUpdatedProfile(response.data);
					setLoading(false);

					dispatch(setUser(response.data)); // Update Redux store
				})
				.catch((error) => {
					setError("Failed to load user profile.");
					setLoading(false);
				});
		}
	}, [userProfile, dispatch]);

	// Save changes
	const handleSave = () => {
		const token = cookies.get("token");
		if (!token) return;

		axios
			.put("http://localhost:8000/api/users/profile/", updatedProfile, {
				headers: { Authorization: `Token ${token}` },
			})
			.then((response) => {
				setUserProfile(response.data);
				dispatch(setUser(response.data));
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
	const mediaBaseUrl = "http://localhost:8000";
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
					flexDirection: "column", // Stacking the papers
					justifyContent: "center",
					alignItems: "center",
					marginTop: 10,
					marginBottom: 10,
					gap: 4, // Adds vertical spacing between Paper components
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

						{/* Editable User Information */}
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
									label="Username (Handle)"
									value={updatedProfile?.username || ""}
									onChange={(e) =>
										setUpdatedProfile({
											...updatedProfile,
											username: e.target.value,
										})
									}
									margin="normal"
									disabled
								/>
								<TextField
									fullWidth
									select
									label="Headline"
									value={updatedProfile?.headline || "Custom"}
									onChange={(e) =>
										setUpdatedProfile({
											...updatedProfile,
											headline: e.target.value,
										})
									}
									margin="normal"
								>
									<MenuItem value="Backend Developer">
										Backend Developer
									</MenuItem>
									<MenuItem value="Frontend Developer">
										Frontend Developer
									</MenuItem>
									<MenuItem value="Full Stack Developer">
										Full Stack Developer
									</MenuItem>
									<MenuItem value="Custom">Custom</MenuItem>
								</TextField>
								{updatedProfile?.headline === "Custom" && (
									<TextField
										fullWidth
										label="Custom Headline"
										value={
											updatedProfile?.custom_headline ||
											""
										}
										onChange={(e) =>
											setUpdatedProfile({
												...updatedProfile,
												custom_headline: e.target.value,
											})
										}
										margin="normal"
									/>
								)}
								<TextField
									fullWidth
									label="Email"
									value={updatedProfile?.email || ""}
									margin="normal"
									disabled
								/>
								<TextField
									fullWidth
									label="Location (City, Country)"
									value={`${updatedProfile?.city || ""}, ${updatedProfile?.country || ""}`}
									onChange={(e) =>
										setUpdatedProfile({
											...updatedProfile,
											city: e.target.value.split(",")[0],
											country:
												e.target.value.split(",")[1],
										})
									}
									margin="normal"
								/>
							</>
						) : (
							<>
								<Typography variant="h4" component="h1" mb={2}>
									{userProfile?.first_name}{" "}
									{userProfile?.last_name}
								</Typography>
								<Typography
									variant="body1"
									fontWeight={500}
									mb={2}
								>
									@{userProfile?.username}
								</Typography>
								<Typography
									variant="body1"
									fontSize="1.2rem"
									fontWeight={600}
									mb={2}
								>
									{userProfile?.headline === "Custom"
										? userProfile?.custom_headline
										: userProfile?.headline}
								</Typography>
								<Typography variant="body1" mb={2}>
									{userProfile?.email}
								</Typography>
								<Typography variant="body1" mb={2}>
									{userProfile?.city &&
										`${userProfile.city},`}{" "}
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

				{/* Second Paper component */}
				<Paper elevation={3} sx={{ p: 4, width: "100%" }}>
					<Typography variant="h6">
						Other information or content
					</Typography>
					{/* Add additional content here */}
				</Paper>
			</Container>
		</Layout>
	);
};

export default withAuth(ProfilePage);
