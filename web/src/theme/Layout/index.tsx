import clsx from 'clsx';
// src/theme/Layout/index.tsx
import React from 'react';

import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { PageMetadata, SkipToContentFallbackId, ThemeClassNames } from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import Scorebar from '@site/src/modules/scorebar/components/Scorebar'; // Import the Scorebar component
import AnnouncementBar from '@theme/AnnouncementBar';
import ErrorPageContent from '@theme/ErrorPageContent';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import Navbar from '@theme/Navbar';
import SkipToContent from '@theme/SkipToContent';

import styles from './styles.module.css';

import type { Props } from "@theme/Layout";
export default function Layout(props: Props): JSX.Element {
	const {
		children,
		noFooter,
		wrapperClassName,
		// Not really layout-related, but kept for convenience/retro-compatibility
		title,
		description,
	} = props;

	useKeyboardNavigation();

	return (
		<LayoutProvider>
			<PageMetadata title={title} description={description} />

			<SkipToContent />

			<AnnouncementBar />

			<Navbar />

			<Scorebar />

			<div
				id={SkipToContentFallbackId}
				className={clsx(
					ThemeClassNames.wrapper.main,
					styles.mainWrapper,
					wrapperClassName,
				)}
			>
				<ErrorBoundary
					fallback={(params) => <ErrorPageContent {...params} />}
				>
					{children}
				</ErrorBoundary>
			</div>

			{!noFooter && <Footer />}
		</LayoutProvider>
	);
}
