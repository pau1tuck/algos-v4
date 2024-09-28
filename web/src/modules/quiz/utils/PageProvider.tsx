// web/src/modules/quiz/utils/PageProvider.tsx

import React, { useReducer, useCallback, useEffect } from "react";
import { UserRole } from "@site/src/modules/user/types/user.type";
import { PageType } from "@site/src/modules/quiz/types/page.types";
import {
	PageContext,
	PageContextProps,
} from "@site/src/modules/quiz/utils/PageContext";
import {
	DifficultyLevel,
	QuestionProps,
	QuestionStatus,
} from "@site/src/modules/quiz/types/question.types";

// Action types
const REGISTER_QUESTION = "REGISTER_QUESTION";
const UPDATE_QUESTION_STATUS = "UPDATE_QUESTION_STATUS";
const RESET_PAGE = "RESET_PAGE";
const TOGGLE_RESET_FLAG = "TOGGLE_RESET_FLAG";

// Helper to clear localStorage for each question on the page
const clearLocalStorageForQuestions = (questions: QuestionProps[]) => {
	questions.forEach((question) => {
		const localStorageKey = `TFQuestion_${question.id}`;
		localStorage.removeItem(localStorageKey);
		console.log(`Cleared localStorage for: ${localStorageKey}`);
	});
};

type PageState = {
	questions: QuestionProps[];
	resetFlag: boolean;
};

type PageAction =
	| { type: "REGISTER_QUESTION"; payload: QuestionProps }
	| {
			type: "UPDATE_QUESTION_STATUS";
			payload: { id: number; updates: Partial<QuestionProps> };
	  }
	| { type: "RESET_PAGE" }
	| { type: "TOGGLE_RESET_FLAG" };

const pageReducer = (state: PageState, action: PageAction): PageState => {
	switch (action.type) {
		case REGISTER_QUESTION:
			// Prevent duplicate registrations of the same question
			const questionAlreadyRegistered = state.questions.some(
				(q) => q.id === action.payload.id,
			);
			if (questionAlreadyRegistered) {
				console.log(
					`Provider: Question with id ${action.payload.id} is already registered.`,
				);
				return state;
			}

			const updatedQuestions = [...state.questions, action.payload];
			console.log("Provider: Registered Question:", action.payload);
			return {
				...state,
				questions: updatedQuestions,
			};

		case UPDATE_QUESTION_STATUS:
			const updatedStatusQuestions = state.questions.map((question) =>
				question.id === action.payload.id
					? { ...question, ...action.payload.updates }
					: question,
			);
			console.log(
				"Provider: Updated Question Status:",
				updatedStatusQuestions,
			);
			return {
				...state,
				questions: updatedStatusQuestions,
			};

		case RESET_PAGE:
			// Clear localStorage for all questions on the page
			clearLocalStorageForQuestions(state.questions);

			return {
				...state,
				questions: state.questions.map((question) => ({
					...question,
					status: QuestionStatus.NotStarted,
					correct: false,
				})),
			};

		case TOGGLE_RESET_FLAG:
			return {
				...state,
				resetFlag: !state.resetFlag,
			};

		default:
			return state;
	}
};

export const PageProvider: React.FC<{
	pageData?: Partial<PageContextProps>;
	children: React.ReactNode;
}> = ({ children, pageData = {} }) => {
	const {
		page_id = 0,
		title = "",
		module = "",
		section = "",
		topic = "",
		order = 0,
		type = PageType.Quiz,
		role = UserRole.Guest,
		prerequisites = [],
		difficulty = DifficultyLevel.Junior,
		points = 0, // Points are passed directly from the PageContext
		completed = QuestionStatus.NotStarted,
		tags = [],
		lastAccessed = null,
		coursePathProgress = 0,
		questions = [],
		requiresAuth = false, // Add requiresAuth here
	} = pageData;

	// Initialize state without loading from localStorage
	const [state, dispatch] = useReducer(pageReducer, {
		questions,
		resetFlag: false,
	});

	const registerQuestion = useCallback(
		(question: QuestionProps) => {
			// Prevent duplicate registrations of the same question
			if (state.questions.some((q) => q.id === question.id)) {
				console.log(
					`Provider: Question with id ${question.id} is already registered.`,
				);
				return;
			}

			dispatch({ type: REGISTER_QUESTION, payload: question });
			console.log("Provider: Registered Question:", question);
		},
		[state.questions, dispatch],
	);

	const updateQuestionStatus = useCallback(
		(id: number, updates: Partial<QuestionProps>) => {
			dispatch({
				type: "UPDATE_QUESTION_STATUS",
				payload: { id, updates },
			});
		},
		[],
	);

	// Calculate the total points for the page based on completed questions
	const calculatePageScore = useCallback(() => {
		const totalScore = state.questions.reduce((totalScore, question) => {
			return question.correct ? totalScore + question.points : totalScore;
		}, 0);
		return totalScore;
	}, [state.questions]);

	const resetPage = useCallback(() => {
		dispatch({ type: "RESET_PAGE" });
		dispatch({ type: "TOGGLE_RESET_FLAG" });
	}, []);

	// Log page state whenever it changes
	useEffect(() => {
		console.log("Provider: Page State Updated:", state);
	}, [state]);

	return (
		<PageContext.Provider
			value={{
				page_id,
				title,
				section,
				module,
				topic,
				order,
				type,
				role,
				prerequisites,
				difficulty,
				points,
				completed,
				tags,
				lastAccessed,
				coursePathProgress,
				questions: state.questions,
				resetFlag: state.resetFlag,
				registerQuestion,
				updateQuestionStatus,
				calculatePageScore,
				resetPage,
				requiresAuth,
			}}
		>
			{children}
		</PageContext.Provider>
	);
};
