//web/pages/register.tsx
import React from "react";
import Layout from "@theme/Layout";
import Register from "@site/src/modules/auth/components/Register";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import useIsAuthenticated from "@site/src/modules/auth/utils/useIsAuthenticated"; // Import the new hook
import Loading from "@site/src/components/Loading"; // Assuming you have a Loading component
import axios from "axios"; // Import axios for handling the registration API call

const RegisterPage = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

	// Call the hook to redirect logged-in users
	const { isLoading } = useIsAuthenticated();

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
				return true;
			}
		} catch (error) {
			console.error("Registration failed.", error);
			return false;
		}
		return false;
	};

	// Show a loading state while checking authentication
	if (isLoading) {
		return <Loading />; // Render your loading spinner or a placeholder component
	}

	// Render the page only after authentication check is complete
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
		</Layout>
	);
};

export default RegisterPage;
