// src/modules/auth/components/buttons/SignUpButton.tsx
import React from "react";
import Link from "@docusaurus/Link";

const SignUpButton = () => {
	return (
		<Link to="/register">
			<button>Sign up</button>
		</Link>
	);
};

export default SignUpButton;
