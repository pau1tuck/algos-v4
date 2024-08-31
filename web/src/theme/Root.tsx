import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@site/src/redux/store"; // Adjust the path to your store

interface RootProps {
    children: ReactNode;
}

const Root = ({ children }: RootProps) => {
    return <Provider store={store}>{children}</Provider>;
};

export default Root;
