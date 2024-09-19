//web/src/modules/auth/utils/usePageAuthorization.tsx
import useAuthState from "@site/src/modules/auth/utils/useAuthState";
import { useEffect, useState } from "react";
import { UserRole } from "@site/src/modules/quiz/utils/PageContext";

const usePageAuthorization = (requiredRole: UserRole, requiresAuth: boolean) => {
	const { isLoading, isAuthenticated, user } = useAuthState(requiresAuth);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		if (!requiresAuth) {
			// If the page doesn't require auth, authorize the user immediately
			setIsAuthorized(true);
			return;
		}

		if (!isLoading) {
			if (isAuthenticated) {
				// Check if the user has the required role
				const userRole = user?.role || UserRole.Guest;
				const hasAccess =
					userRole === requiredRole || userRole === UserRole.Admin;
				setIsAuthorized(hasAccess);
			} else {
				setIsAuthorized(false);
			}
		}
	}, [isLoading, isAuthenticated, user, requiredRole, requiresAuth]);

	return isAuthorized;
};

export default usePageAuthorization;