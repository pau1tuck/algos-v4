// src/theme/Layout/Provider/index.tsx
import React from "react";
import { composeProviders } from "@docusaurus/theme-common";
import {
	ColorModeProvider,
	AnnouncementBarProvider,
	ScrollControllerProvider,
	NavbarProvider,
	PluginHtmlClassNameProvider,
} from "@docusaurus/theme-common/internal";
import { DocsPreferredVersionContextProvider } from "@docusaurus/plugin-content-docs/client";
import type { Props } from "@theme/Layout/Provider";
import { PageProvider } from "@site/src/modules/quiz/utils/PageProvider";

const Provider = composeProviders([
	ColorModeProvider,
	AnnouncementBarProvider,
	ScrollControllerProvider,
	DocsPreferredVersionContextProvider,
	PluginHtmlClassNameProvider,
	NavbarProvider,
	// CUSTOM:
	PageProvider,
]);

export default function LayoutProvider({ children }: Props): JSX.Element {
	return <Provider>{children}</Provider>;
}
