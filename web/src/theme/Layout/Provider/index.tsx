// src/theme/Layout/Provider/index.tsx
import React from 'react';

import { DocsPreferredVersionContextProvider } from '@docusaurus/plugin-content-docs/client';
import { composeProviders } from '@docusaurus/theme-common';
import {
    AnnouncementBarProvider, ColorModeProvider, NavbarProvider, PluginHtmlClassNameProvider,
    ScrollControllerProvider
} from '@docusaurus/theme-common/internal';
import { PageProvider } from '@site/src/modules/quiz/utils/PageProvider';

import type { Props } from "@theme/Layout/Provider";
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
