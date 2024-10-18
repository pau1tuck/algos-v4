import clsx from 'clsx';
import React, { ComponentProps, type } from 'react';

import { useThemeConfig } from '@docusaurus/theme-common';
import { useHideableNavbar, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';

import styles from './styles.module.css';

import type { Props } from "@theme/Navbar/Layout";
function NavbarBackdrop(props: ComponentProps<"div">) {
	return (
		<div
			role="presentation"
			{...props}
			className={clsx("navbar-sidebar__backdrop", props.className)}
		/>
	);
}

export default function NavbarLayout({ children }: Props): JSX.Element {
	const {
		navbar: { hideOnScroll, style },
	} = useThemeConfig();
	const mobileSidebar = useNavbarMobileSidebar();
	const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);
	return (
		<nav
			ref={navbarRef}
			aria-label={translate({
				id: "theme.NavBar.navAriaLabel",
				message: "Main",
				description: "The ARIA label for the main navigation",
			})}
			className={clsx(
				"navbar",
				"navbar--fixed-top",
				hideOnScroll && [
					styles.navbarHideable,
					!isNavbarVisible && styles.navbarHidden,
				],
				{
					"navbar--dark": style === "dark",
					"navbar--primary": style === "primary",
					"navbar-sidebar--show": mobileSidebar.shown,
				},
			)}
			style={{ borderBottom: "1px solid #DADDE2", boxShadow: "none" }}
		>
			{children}
			<NavbarBackdrop onClick={mobileSidebar.toggle} />
			<NavbarMobileSidebar />
		</nav>
	);
}
