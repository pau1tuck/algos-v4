//web/src/modules/auth/utils/usePageAuthorization.tsx
import { useEffect, useState } from 'react';

import useAuthState from '@site/src/modules/auth/utils/useAuthState';
import { UserRole } from '@site/src/modules/user/types/user.type';

const usePageAuthorization = (
	requiredRoles: UserRole[], // Update to accept an array of roles
	requiresAuth: boolean,
) => {
	const { isLoading, isAuthenticated, user } = useAuthState(requiresAuth);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		if (!requiresAuth) {
			// If the page doesn't require auth, authorize the user immediately
			setIsAuthorized(true);
			return;
		}

		if (!isLoading && isAuthenticated && user) {
			// Check if the user has one of the required roles
			const userRoles = user?.roles || [UserRole.Guest]; // Ensure user roles are handled as an array
			const hasAccess =
				requiredRoles.some((role) => userRoles.includes(role)) ||
				userRoles.includes(UserRole.Admin); // Admins always have access

			setIsAuthorized(hasAccess);
		} else {
			setIsAuthorized(false);
		}
	}, [isLoading, isAuthenticated, user, requiredRoles, requiresAuth]);

	return isAuthorized;
};

export default usePageAuthorization;
