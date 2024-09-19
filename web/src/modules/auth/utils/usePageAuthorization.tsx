//web/src/modules/auth/utils/usePageAuthorization.tsx
import useAuthState from "@site/src/modules/auth/utils/useAuthState";
import { useEffect, useState } from "react";
import { UserRole } from "@site/src/modules/quiz/utils/PageContext";

const usePageAuthorization = (requiredRole: UserRole) => {
	const { isAuthenticated, user } = useAuthState();
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			// Check if the user has the required role
			const userRole = user?.role || UserRole.Guest;
			const hasAccess =
				userRole === requiredRole || userRole === UserRole.Admin;
			setIsAuthorized(hasAccess);
		} else {
			setIsAuthorized(false);
		}
	}, [isAuthenticated, user, requiredRole]);

	return isAuthorized;
};

export default usePageAuthorization;
