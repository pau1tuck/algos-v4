//web/src/modules/auth/components/Login.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	TextField,
	Button,
	Container,
	Typography,
	Box,
	Alert,
	Divider,
	Link as MuiLink,
	Paper,
	Snackbar,
} from "@mui/material";
import GoogleButton from "@site/src/modules/auth/components/GoogleButton";
import Link from "@docusaurus/Link";

interface LoginProps {
	onLogin: (email: string, password: string) => Promise<boolean>;
	onGoogleLogin: () => void;
}

const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
});

const Login: React.FC<LoginProps> = ({ onLogin, onGoogleLogin }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(schema),
	});

	// State to manage Snackbar visibility and message
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const onSubmit = async (data) => {
		try {
			const success = await onLogin(data.email, data.password);
			if (!success) {
				// If login fails, set an error message
				setErrorMessage("Invalid email address or password");
				setError("root", {
					type: "manual",
					message: "Invalid email address or password",
				});
			}
		} catch (err) {
			// Handle other errors like server issues
			setErrorMessage("An error occurred. Please try again.");
			setError("root", {
				type: "manual",
				message: "An error occurred. Please try again.",
			});
		}
	};

	// Close Snackbar handler
	const handleCloseSnackbar = () => {
		setErrorMessage(null);
	};

	return (
		<Container
			maxWidth="xs"
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Paper elevation={3} sx={{ p: 4, width: "100%" }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h4" pb={2}>
						Log in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						sx={{ mt: 1, width: "100%" }}
					>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...field}
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email address"
									autoComplete="email"
									autoFocus
									error={!!errors.email}
									helperText={errors.email?.message}
								/>
							)}
						/>
						<Controller
							name="password"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...field}
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									error={!!errors.password}
									helperText={errors.password?.message}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleSubmit(onSubmit)();
										}
									}}
								/>
							)}
						/>
						{errors.root && (
							<Alert severity="error">{errors.root.message}</Alert>
						)}
						<Button
							type="submit"
							size="large"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 1 }}
						>
							SUBMIT
						</Button>
						<MuiLink
							component={Link}
							to="/forgot"
							variant="body2"
							sx={{
								display: "block",
								textAlign: "center",
								mt: 2,
							}}
						>
							Forgot password?
						</MuiLink>
						<Divider sx={{ my: 2 }}>or</Divider>
						<GoogleButton onClick={onGoogleLogin} />
					</Box>
				</Box>
			</Paper>
			<Snackbar
				open={!!errorMessage}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity="error">
					{errorMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default Login;