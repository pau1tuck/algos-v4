// web/src/modules/quiz/components/PageInitializer.tsx
import type React from "react";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import usePageAuthorization from '@site/src/modules/auth/utils/usePageAuthorization';
import SubmitButton from '@site/src/modules/quiz/components/SubmitButton';
import { PageProvider } from '@site/src/modules/quiz/utils/PageProvider';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';
import { setCurrentPage } from '@site/src/redux/slices/pageContextSlice';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch';

import type { PageType } from "@site/src/modules/quiz/types/page.types";
import type { DifficultyLevel } from "@site/src/modules/quiz/types/question.types";
import type { UserRole } from "@site/src/modules/user/types/user.type";

interface PageInitializerProps {
	pageData: {
		trackId: number;
		page_id: number;
		title: string;
		section: string;
		module: string;
		topic: string;
		order: number;
		type: PageType;
		requiresAuth: boolean;
		roles: UserRole[];
		prerequisites: number[];
		difficulty: DifficultyLevel;
		points: number;
		tags?: string[];
		coursePathProgress: number;
		lastAccessed: Date | null;
	};
	children: React.ReactNode;
}

const PageInitializer: React.FC<PageInitializerProps> = ({
	pageData,
	children,
}) => {
	const { resetPage } = usePageContext();
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

	return (
		<PageProvider pageData={pageData}>
			{children}
			<div className="page-actions">
				<SubmitButton />
				<button className="reset-button" onClick={resetPage}>
					Reset Page
				</button>
			</div>
		</PageProvider>
	);
};

export default PageInitializer;
