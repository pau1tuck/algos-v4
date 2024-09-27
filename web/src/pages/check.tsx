//web/pages/verify-email.tsx
import React from "react";
import Layout from "@theme/Layout";
import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "@docusaurus/Link";

const CheckEmailPage = () => {
	return (
		<Layout>
			<Box
				sx={{
					minHeight: "80vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					px: 3,
				}}
			>
				<Typography variant="h3" gutterBottom>
					Check Your Email.
				</Typography>
				<Typography variant="body1" sx={{ mb: 4 }}>
					We've sent you a verification email. <br />
					Please check your inbox and click the link to verify your
					account.
				</Typography>
			</Box>
		</Layout>
	);
};

export default CheckEmailPage;
