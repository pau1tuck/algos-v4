//web/modules/auth/utils/useIsAuthenticated.ts
import { useEffect, useState } from "react";
import { useHistory } from "@docusaurus/router"; // Docusaurus navigation
import { useSelector } from "react-redux";
import type { RootState } from "@site/src/redux/store"; // Import RootState from your Redux store

const useIsAuthenticated = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is authenticated via Redux
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Check for the token key in the cookie
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
            history.push("/user/profile");
        } else {
            // Mark loading as complete once the check is done
            setIsLoading(false);
        }
    }, [isAuthenticated, history]);

    return { isLoading }; // Return the loading state
};

export default useIsAuthenticated;