import React from "react";
import type { ReactNode } from "react";
// Import React Redux provider and global store
import { Provider } from "react-redux";
import store from "@site/src/redux/store";
// Import Material UI theme provider
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
// Import required fonts
import "@fontsource/quicksand/500.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/600.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/ubuntu-mono/400.css";
import "@fontsource/ubuntu-mono/700.css";

interface RootProps {
	children: ReactNode;
}

const Root = ({ children }: RootProps) => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</Provider>
	);
};

export default Root;
