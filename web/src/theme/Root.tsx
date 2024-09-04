import React, { ReactNode } from "react";
// Import React Redux provider and global store
import { Provider } from "react-redux";
import store from "@site/src/redux/store";
// Import Material UI theme provider
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
// Import required fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

interface RootProps {
    children: ReactNode;
}

const Root = ({ children }: RootProps) => {
    return <Provider store={store}>{children}</Provider>;
};

export default Root;
