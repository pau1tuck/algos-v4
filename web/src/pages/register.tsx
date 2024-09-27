//web/pages/register.tsx
import React, { useState } from "react";
import Layout from "@theme/Layout";
import Register from "@site/src/modules/auth/components/Register";
import {
	Box,
	Stack,
	useMediaQuery,
	useTheme,
	Snackbar,
	Alert,
} from "@mui/material";
import useIsAuthenticated from "@site/src/modules/auth/utils/useIsAuthenticated"; // Import the new hook
import Loading from "@site/src/components/Loading"; // Assuming you have a Loading component
import axios from "axios"; // Import axios for handling the registration API call

const RegisterPage = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

	// Call the hook to redirect logged-in users
	const { isLoading } = useIsAuthenticated();

	// State to store error messages for display in Snackbar
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false); // Control Snackbar visibility

	const handleRegister = async (
		email: string,
		password: string,
		country: string,
		firstName: string,
		lastName: string,
	): Promise<boolean> => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/users/register/",
				{
					email,
					password1: password, // Send only password1
					first_name: firstName,
					last_name: lastName,
					country,
				},
			);

			if (response.status === 201) {
				console.log("Registration successful.");
				setErrorMessage(null); // Clear any previous error message
				setSnackbarOpen(false); // Close Snackbar if successful
				return true;
			}
		} catch (error) {
			if (error.response && error.response.data) {
				const backendErrors = error.response.data;
				let errorMessage = "";

				// Handle email errors
				if (backendErrors.email) {
					errorMessage += `Email: ${backendErrors.email[0]}\n`;
				}

				// Handle password errors
				if (backendErrors.password1) {
					errorMessage += `Password: ${backendErrors.password1[0]}\n`;
				}

				// Set the error message to be displayed in the Snackbar
				setErrorMessage(errorMessage);
				setSnackbarOpen(true); // Show Snackbar with error
			} else {
				setErrorMessage(
					"An unexpected error occurred. Please try again.",
				);
				setSnackbarOpen(true); // Show Snackbar with generic error
			}
			return false;
		}
	};

	// Close Snackbar handler
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	// Show a loading state while checking authentication
	if (isLoading) {
		return <Loading />; // Render your loading spinner or a placeholder component
	}

	return (
		<Layout>
			<Box
				sx={{
					flexGrow: 1,
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Stack
					direction={{ xs: "column", md: "row" }}
					sx={{ flexGrow: 1 }}
				>
					{isLargeScreen && (
						<Box
							sx={{
								flex: 1,
								backgroundImage:
									"url(/img/register-background.jpg)",
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						/>
					)}
					<Box
						sx={{
							flex: 1,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							p: 3,
						}}
					>
						<Register onRegister={handleRegister} />
					</Box>
				</Stack>
			</Box>

			{/* Display a Snackbar with error messages */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity="error">
					{errorMessage}
				</Alert>
			</Snackbar>
		</Layout>
	);
};

export default RegisterPage;
