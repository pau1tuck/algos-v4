// src/modules/quiz/components/PageInitializer.tsx
import type React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DifficultyLevel, QuestionStatus } from "@site/src/modules/quiz/types/question.types";
import type { PageType } from "@site/src/modules/quiz/types/page.types";
import type { UserRole } from "@site/src/modules/user/types/user.type";
import { PageProvider } from "@site/src/modules/quiz/utils/PageProvider";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";
import SubmitButton from "@site/src/modules/quiz/components/SubmitButton";
import usePageAuthorization from "@site/src/modules/auth/utils/usePageAuthorization";
import { useHistory } from "react-router-dom";

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
	const { calculatePageScore, questions } = usePageContext();
	const dispatch = useDispatch();
	const history = useHistory();

	// Check if the user is authorized to access this page
	const isAuthorized = usePageAuthorization(pageData.role as UserRole, pageData.requiresAuth);

	useEffect(() => {
		if (!isAuthorized && pageData.requiresAuth) {
			history.push("/login"); // Redirect to login if auth is required and user is not authorized
			return;
		}

		if (!pageData) return;

		const pageProgress = {
			page_id: Number(pageData.page_id),
			module: pageData.module,
			difficulty: pageData.difficulty,
			completed: questions.every(
				(q) => q.status === QuestionStatus.Complete,
			),
			score: calculatePageScore(),
			lastAccessed: new Date().toISOString(),
			questions: questions.map((q) => ({
				id: q.id,
				type: q.type,
				order: q.order,
				difficulty: q.difficulty,
				value: q.value,
				status: q.status,
				correct: q.correct,
			})),
		};

		console.log("Dispatching page progress to Redux:", pageProgress);
		dispatch(updatePageProgress(pageProgress));
	}, [history, isAuthorized, pageData, questions, calculatePageScore, dispatch,]);

	if (pageData.requiresAuth && !isAuthorized) {
		return <div>Loading...</div>; // Show a loading or unauthorized message
	}

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
			<SubmitButton />
		</PageProvider>
	);
};

export default PageInitializer;