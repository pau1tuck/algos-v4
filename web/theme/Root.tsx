import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@site/src/redux/store"; // Adjust the path to your store

const Root = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default Root;
