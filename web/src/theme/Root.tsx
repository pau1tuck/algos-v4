// Import required fonts
import '@fontsource/quicksand/500.css';
import '@fontsource/lora/400.css';
import '@fontsource/lora/600.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/ubuntu-mono/400.css';
import '@fontsource/ubuntu-mono/700.css';

// src/theme/Root.tsx
import React from 'react';
// Import React Redux provider and global store
import { Provider } from 'react-redux';

// Import Material UI theme provider
import { ThemeProvider } from '@mui/material/styles';
// Import authentication checker hook
import useAuthChecker from '@site/src/modules/auth/utils/useAuthChecker';
import store from '@site/src/redux/store';

import theme from './theme';

import type { ReactNode } from "react";
interface RootProps {
	children: ReactNode;
}

const AuthCheckerWrapper = ({ children }: { children: ReactNode }) => {
	useAuthChecker(true); // Check authentication on app load
	return <>{children}</>;
};

const Root = ({ children }: RootProps) => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<AuthCheckerWrapper>{children}</AuthCheckerWrapper>
			</ThemeProvider>
		</Provider>
	);
};

export default Root;
