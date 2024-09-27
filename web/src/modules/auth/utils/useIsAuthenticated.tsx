//web/modules/auth/utils/useIsAuthenticated.ts
import { useEffect } from "react";
import { useHistory } from "@docusaurus/router"; // Docusaurus navigation
import { useSelector } from "react-redux";
import type { RootState } from "@site/src/redux/store"; // Import RootState from your Redux store

const useIsAuthenticated = () => {
    const history = useHistory();

    // Check if user is authenticated via Redux
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Check the token in the cookies
    const getTokenFromCookies = () => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        return token;
    };
    // biome-ignore lint: correctness/useExhaustiveDependencies
    useEffect(() => {
        const token = getTokenFromCookies();

        if (token || isAuthenticated) {
            // If a token exists or Redux state confirms authentication, redirect to profile
            history.push("/profile");
        }
    }, [isAuthenticated, history]);
};

export default useIsAuthenticated;