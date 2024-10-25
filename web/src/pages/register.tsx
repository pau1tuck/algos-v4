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
import useIsAuthenticated from "@site/src/modules/auth/utils/useIsAuthenticated";
import Loading from "@site/src/components/Loading";
import axios from "axios";
import Link from "@docusaurus/Link";

const RegisterPage = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

	const { isLoading } = useIsAuthenticated();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [loading, setLoading] = useState(false); // Spinner state

	const handleRegister = async (
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		country: string,
	): Promise<boolean> => {
		// Log the data being sent to the backend
		console.log("Data being sent to the backend:", {
			email,
			password1: password,
			first_name: firstName,
			last_name: lastName,
			country,
		});

		try {
			setLoading(true); // Start spinner
			const response = await axios.post(
				"http://localhost:8000/api/users/register/",
				{
					email,
					password1: password,
					first_name: firstName,
					last_name: lastName,
					country,
				},
			);

			if (response.status === 201) {
				console.log("Registration successful:", response.data);
				setErrorMessage(null);
				setSnackbarOpen(false);
				// Redirect after successful registration
				setTimeout(() => {
					// Use Docusaurus's Link for redirection
					window.location.href = "/check"; // or another Docusaurus page
				}, 1000);
				return true;
			}
		} catch (error) {
			setLoading(false); // Stop spinner
			console.log("Backend error response:", error.response);

			if (error.response && error.response.data) {
				const backendErrors = error.response.data;
				let errorMessage = "";

				if (backendErrors.email) {
					errorMessage += `Email: ${backendErrors.email[0]}\n`;
				}

				if (backendErrors.password1) {
					errorMessage += `Password: ${backendErrors.password1[0]}\n`;
				}

				setErrorMessage(errorMessage);
				setSnackbarOpen(true);
			} else {
				setErrorMessage(
					"An unexpected error occurred. Please try again.",
				);
				setSnackbarOpen(true);
			}
			return false;
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	if (isLoading) {
		return <Loading />;
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
						<Register
							onRegister={handleRegister}
							loading={loading}
						/>
					</Box>
				</Stack>
			</Box>

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
