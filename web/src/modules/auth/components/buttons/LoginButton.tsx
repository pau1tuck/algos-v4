// src/modules/auth/components/buttons/LoginButton.tsx
import React from "react";
import Link from "@docusaurus/Link";
import { Button, Typography } from "@mui/material";

const LoginButton = () => {
	return (
		<Link to="/login" style={{ textDecoration: "none" }}>
			<Button variant="text" size="medium" color="primary" sx={{ ml: 2 }}>
				Log in
			</Button>
		</Link>
	);
};

export default LoginButton;
