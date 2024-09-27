//web/src/modules/auth/components/Register.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	TextField,
	Button,
	Container,
	Typography,
	Box,
	MenuItem,
	Divider,
	Link as MuiLink,
	CircularProgress,
} from "@mui/material";
import GoogleButton from "./GoogleButton";
import Link from "@docusaurus/Link";

interface RegisterProps {
	onRegister: (
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		country: string,
	) => Promise<boolean>;
	loading: boolean;
}

const schema = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	lastName: yup.string().required("Last name is required"),
	country: yup.string().required("Country is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/\d/, "Password must contain at least one number")
		.matches(
			/[!@#$%^&*(),.?":{}|<>]/,
			"Password must contain at least one special character",
		),
});

const Register: React.FC<RegisterProps> = ({ onRegister, loading }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		await onRegister(
			data.email,
			data.password,
			data.firstName,
			data.lastName,
			data.country,
		);
	};

	const countries = [
		{ value: "us", label: "United States" },
		{ value: "uk", label: "United Kingdom" },
		{ value: "ca", label: "Canada" },
		// Add more countries as needed
	];

	return (
		<Container maxWidth="xs" sx={{ mb: 10 }}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 2,
				}}
			>
				<Typography component="h1" variant="h3" pb={2}>
					Sign up
				</Typography>
				<Typography variant="body2" pb={3}>
					Already registered?{" "}
					<MuiLink component={Link} to="/login">
						Log in
					</MuiLink>
				</Typography>
				<GoogleButton onClick={() => {}}>
					Sign up with Google
				</GoogleButton>
				<Divider sx={{ my: 2, width: "100%" }}>or</Divider>

				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{ width: "100%" }}
				>
					<Controller
						name="firstName"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								margin="normal"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								error={!!errors.firstName}
								helperText={errors.firstName?.message}
							/>
						)}
					/>
					<Controller
						name="lastName"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								margin="normal"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								error={!!errors.lastName}
								helperText={errors.lastName?.message}
							/>
						)}
					/>
					<Controller
						name="country"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								margin="normal"
								required
								fullWidth
								select
								id="country"
								label="Country"
								error={!!errors.country}
								helperText={errors.country?.message}
							>
								{countries.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
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
								autoComplete="new-password"
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						)}
					/>
					<Button
						type="submit"
						size="large"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={loading} // Disable the button when loading
					>
						{loading ? <CircularProgress size={24} /> : "SUBMIT"}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Register;
