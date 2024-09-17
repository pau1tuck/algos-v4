// src/theme/Navbar/Content/index.tsx
import React, { type ReactNode } from "react";
import { useThemeConfig, ErrorCauseBoundary } from "@docusaurus/theme-common";
import {
	splitNavbarItems,
	useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import NavbarItem, { type Props as NavbarItemConfig } from "@theme/NavbarItem";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarSearch from "@theme/Navbar/Search";
import NavbarAuth from "@site/src/modules/auth/components/NavbarAuth"; // Import NavbarAuth

import styles from "./styles.module.css";

function useNavbarItems() {
	// TODO temporary casting until ThemeConfig type is improved
	return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): JSX.Element {
	return (
		<>
			{items.map((item, i) => (
				<ErrorCauseBoundary
					key={i}
					onError={(error) =>
						new Error(
							`A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
							{ cause: error },
						)
					}
				>
					<NavbarItem {...item} />
				</ErrorCauseBoundary>
			))}
		</>
	);
}

function NavbarContentLayout({
	left,
	right,
}: {
	left: ReactNode;
	right: ReactNode;
}) {
	return (
		<div className="navbar__inner">
			<div className="navbar__items">{left}</div>
			<div className="navbar__items navbar__items--right">{right}</div>
		</div>
	);
}

export default function NavbarContent(): JSX.Element {
	const mobileSidebar = useNavbarMobileSidebar();

	const items = useNavbarItems();
	const [leftItems, rightItems] = splitNavbarItems(items);

	const searchBarItem = items.find((item) => item.type === "search");

	return (
		<NavbarContentLayout
			left={
				<>
					{!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
					<NavbarLogo />
					<NavbarItems items={leftItems} />
				</>
			}
			right={
				<>
					<NavbarItems items={rightItems} />
					<NavbarAuth /> {/* NOTE Added custom NavbarAuth here */}
					<NavbarColorModeToggle className={styles.colorModeToggle} />
					{!searchBarItem && (
						<NavbarSearch>
							<SearchBar />
						</NavbarSearch>
					)}
				</>
			}
		/>
	);
}
