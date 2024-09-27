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
	Alert,
} from "@mui/material";

interface ResetPasswordProps {
	onResetPassword: (password: string, token: string) => Promise<boolean>;
	token: string;
}

const schema = yup.object().shape({
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required"),
});

const ResetPassword: React.FC<ResetPasswordProps> = ({
	onResetPassword,
	token,
}) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: {
		password: string;
		confirmPassword: string;
	}) => {
		try {
			const success = await onResetPassword(data.password, token);
			if (!success) {
				setError("root", {
					type: "manual",
					message: "Failed to reset password. Please try again.",
				});
			}
			// If successful, show a success message or redirect
		} catch (err) {
			setError("root", {
				type: "manual",
				message: "An error occurred. Please try again.",
			});
		}
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 8,
					mb: 8,
				}}
			>
				<Typography component="h1" variant="h3" pb={3}>
					Reset Password
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 1, width: "100%" }}
				>
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
								label="New Password"
								type="password"
								id="password"
								autoComplete="new-password"
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						)}
					/>
					<Controller
						name="confirmPassword"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								margin="normal"
								required
								fullWidth
								name="confirmPassword"
								label="Confirm New Password"
								type="password"
								id="confirmPassword"
								autoComplete="new-password"
								error={!!errors.confirmPassword}
								helperText={errors.confirmPassword?.message}
							/>
						)}
					/>
					{errors.root && (
						<Alert severity="error">{errors.root.message}</Alert>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Reset Password
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default ResetPassword;
