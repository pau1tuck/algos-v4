// web/src/modules/quiz/components/PageInitializer.tsx
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import usePageAuthorization from '@site/src/modules/auth/utils/usePageAuthorization';
import SubmitButton from '@site/src/modules/quiz/components/SubmitButton';
import { PageProvider } from '@site/src/modules/quiz/utils/PageProvider';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';

import type { DifficultyLevel } from "@site/src/modules/quiz/types/question.types";
import type { PageType } from "@site/src/modules/quiz/types/page.types";
import type { UserRole } from "@site/src/modules/user/types/user.type";

interface PageInitializerProps {
	pageData: {
		trackId: number; // Add trackId to the pageData interface
		page_id: number;
		title: string;
		section: string;
		module: string;
		topic: string;
		order: number;
		type: PageType;
		requiresAuth: boolean;
		role: UserRole;
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

	// Check if the user is authorized to access the page
	const isAuthorized = usePageAuthorization(
		pageData.role as UserRole,
		pageData.requiresAuth,
	);

	// Redirect to login if authorization fails
	useEffect(() => {
		if (!isAuthorized && pageData.requiresAuth) {
			history.push("/login");
			return;
		}
	}, [history, isAuthorized, pageData.requiresAuth]);

	if (pageData.requiresAuth && !isAuthorized) {
		return <div>Loading...</div>;
	}

	return (
		<PageProvider pageData={pageData}>
			{children}
			<div className="page-actions">
				<SubmitButton /> {/* SubmitButton handles progress dispatch */}
				<button className="reset-button" onClick={resetPage}>
					Reset Page
				</button>
			</div>
		</PageProvider>
	);
};

export default PageInitializer;
