// src/modules/auth/components/buttons/SignUpButton.tsx
import React from "react";
import Link from "@docusaurus/Link";
import { Button } from "@mui/material";

const SignUpButton = () => {
	return (
		<Link to="/register" style={{ textDecoration: "none" }}>
			<Button
				variant="contained"
				size="medium"
				color="primary"
				sx={{ ml: 2, mr: 1 }}
			>
				Sign Up
			</Button>
		</Link>
	);
};

export default SignUpButton;
