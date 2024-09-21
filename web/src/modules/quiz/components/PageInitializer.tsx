//web/src/modules/quiz/components/PageInitializer.tsx

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PageProvider } from "@site/src/modules/quiz/utils/PageProvider";
import SubmitButton from "@site/src/modules/quiz/components/SubmitButton";
import usePageAuthorization from "@site/src/modules/auth/utils/usePageAuthorization";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import type { DifficultyLevel } from "@site/src/modules/quiz/types/question.types";
import type { PageType } from "@site/src/modules/quiz/types/page.types";
import type { UserRole } from "@site/src/modules/user/types/user.type";

interface PageInitializerProps {
	pageData: {
		page_id: number;
		title: string;
		section: string;
		module: string;
		topic: string;
		order: number;
		type: string;
		requiresAuth: boolean;
		role: string;
		prerequisites: number[];
		difficulty: DifficultyLevel;
		pageScore: number;
		points: number;
		tags?: string[];
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
		pageData.requiresAuth
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

	// Log pageData for debugging
	console.log("Initialized pageData:", pageData);

	return (
		<PageProvider
			pageData={{
				...pageData,
				type: pageData.type as PageType,
				role: pageData.role as UserRole,
				difficulty: pageData.difficulty as DifficultyLevel,
			}}
		>
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