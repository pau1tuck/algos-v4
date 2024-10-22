// web/src/modules/quiz/components/PageInitializer.tsx

import type React from "react";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import usePageAuthorization from '@site/src/modules/auth/utils/usePageAuthorization';
import { PageProvider } from '@site/src/modules/quiz/utils/PageProvider';
import { setCurrentPage } from '@site/src/redux/slices/pageContextSlice';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch';

import type { Page } from "@site/src/modules/quiz/types/page.types";

interface PageInitializerProps {
	pageData: Page;
	children: React.ReactNode;
}

const PageInitializer: React.FC<PageInitializerProps> = ({
	pageData,
	children,
}) => {
	const history = useHistory();
	const dispatch = useAppDispatch();

	// Dispatch active page to Redux on component mount
	useEffect(() => {
		dispatch(setCurrentPage(pageData));
		console.log(
			"PageInitializer: Dispatched active page to Redux:",
			pageData,
		);
	}, [dispatch, pageData]);

	// Check if the user is authorized to access the page
	const isAuthorized = usePageAuthorization(
		pageData.roles,
		pageData.requiresAuth,
	);

	// Redirect to login if unauthorized
	useEffect(() => {
		if (!isAuthorized && pageData.requiresAuth) {
			history.push("/login");
		}
	}, [history, isAuthorized, pageData.requiresAuth]);

	if (pageData.requiresAuth && !isAuthorized) {
		return <div>Loading...</div>;
	}

	return <PageProvider pageData={pageData}>{children}</PageProvider>;
};

export default PageInitializer;
