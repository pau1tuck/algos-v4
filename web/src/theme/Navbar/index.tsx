// src/theme/Navbar/index.tsx
import React from "react";
import Navbar from "@theme-original/Navbar";
import type NavbarType from "@theme/Navbar";
import type { WrapperProps } from "@docusaurus/types";
import NavbarAuth from "@site/src/modules/auth/components/NavbarAuth"; // Import NavbarAuth

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): JSX.Element {
	return (
		<>
			<Navbar {...props} />
			<NavbarAuth /> {/* Add NavbarAuth component */}
		</>
	);
}
