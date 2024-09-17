// src/modules/auth/components/Login.tsx
import type React from "react";
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

	// TYPE: data <any>
	const onSubmit = async (data) => {
		try {
			const success = await onLogin(data.email, data.password);
			if (!success) {
				setError("root", {
					type: "manual",
					message: "Invalid email address or password",
				});
			}
			// If successful, navigation should be handled by the parent component
			// TYPE: Error <any>
		} catch (err) {
			setError("root", {
				type: "manual",
				message: "An error occurred. Please try again.",
			});
		}
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
								/>
							)}
						/>
						{errors.root && (
							<Alert severity="error">
								{errors.root.message}
							</Alert>
						)}
						<Button
							type="submit"
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
		</Container>
	);
};

export default Login;
