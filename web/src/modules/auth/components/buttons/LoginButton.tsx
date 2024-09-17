// src/modules/auth/components/buttons/LoginButton.tsx
import React from "react";
import Link from "@docusaurus/Link";

const LoginButton = () => {
	return (
		<Link to="/login">
			<button>Login</button>
		</Link>
	);
};

export default LoginButton;
