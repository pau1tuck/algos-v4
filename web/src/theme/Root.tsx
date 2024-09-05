import React, { ReactNode } from "react";
// Import React Redux provider and global store
import { Provider } from "react-redux";
import store from "@site/src/redux/store";
// Import Material UI theme provider
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
// Import required fonts
import "@fontsource/quicksand/500.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/ubuntu-mono/400.css";
import "@fontsource/ubuntu-mono/700.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

interface RootProps {
    children: ReactNode;
}

const Root = ({ children }: RootProps) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    );
};

export default Root;
