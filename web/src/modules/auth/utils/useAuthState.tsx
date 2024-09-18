// src/modules/auth/utils/useAuthState.tsx
import { useSelector } from "react-redux";
import type { RootState } from "@site/src/redux/store";
import useAuthChecker from "./useAuthChecker";

const useAuthState = () => {
	const isLoading = useAuthChecker();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated,
	);
	const user = useSelector((state: RootState) => state.auth.user);

	return { isLoading, isAuthenticated, user };
};

export default useAuthState;
