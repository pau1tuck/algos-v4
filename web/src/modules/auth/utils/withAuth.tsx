// src/modules/auth/utils/withAuth.tsx
import type React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAuthState from "@site/src/modules/auth/utils/useAuthState";
import Loading from "@site/src/components/Loading";

const withAuth = <P extends object>(
	WrappedComponent: React.ComponentType<P>,
) => {
	return (props: P) => {
		const history = useHistory();
		const { isLoading, isAuthenticated } = useAuthState();

		useEffect(() => {
			// Redirect to login page if not authenticated
			if (!isLoading && !isAuthenticated) {
				history.push("/login");
			}
		}, [isLoading, isAuthenticated, history]);

		// Show loading state
		if (isLoading) {
			return <Loading />;
		}

		// Render the wrapped component once authenticated
		return isAuthenticated ? <WrappedComponent {...props} /> : null;
	};
};

export default withAuth;
