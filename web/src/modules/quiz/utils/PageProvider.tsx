// web/src/modules/quiz/utils/PageProvider.tsx

import type React from "react";
import { useCallback, useEffect, useReducer, useRef } from 'react';

import { PageType } from '@site/src/modules/quiz/types/page.types';
import { QuestionStatus } from '@site/src/modules/quiz/types/question.types';
import { PageContext } from '@site/src/modules/quiz/utils/PageContext';
import { UserRole } from '@site/src/modules/user/types/user.type';

import type { QuestionProps } from "@site/src/modules/quiz/types/question.types";
import type { PageContextProps } from "@site/src/modules/quiz/utils/PageContext";

// Action types
const REGISTER_QUESTION = "REGISTER_QUESTION";
const UPDATE_QUESTION_STATUS = "UPDATE_QUESTION_STATUS";
const RESET_PAGE = "RESET_PAGE";
const TOGGLE_RESET_FLAG = "TOGGLE_RESET_FLAG";

// PageState now includes canSubmit
type PageState = {
	questions: QuestionProps[];
	resetFlag: boolean;
	canSubmit: boolean; // New property to track if the submit button should be enabled
};

// PageAction updated to reflect the actions
type PageAction =
	| { type: "REGISTER_QUESTION"; payload: QuestionProps }
	| {
			type: "UPDATE_QUESTION_STATUS";
			payload: { id: number; updates: Partial<QuestionProps> };
	  }
	| { type: "RESET_PAGE" }
	| { type: "TOGGLE_RESET_FLAG" };

// Helper function to check if all questions are correct
const areAllQuestionsCorrect = (questions: QuestionProps[]) => {
	return questions.every((question) => question.correct === true);
};

// Reducer handling the state updates
const pageReducer = (state: PageState, action: PageAction): PageState => {
	switch (action.type) {
		case REGISTER_QUESTION: {
			const newQuestion = {
				...action.payload,
				id: Number(action.payload.id),
			};

			const questionAlreadyRegistered = state.questions.some(
				(q) => Number(q.id) === newQuestion.id,
			);

			if (questionAlreadyRegistered) {
				console.log(
					`Provider: Question with id ${newQuestion.id} is already registered.`,
				);
				return state;
			}

			console.log("Provider: Registered Question:", newQuestion);
			return {
				...state,
				questions: [...state.questions, newQuestion],
			};
		}

		case UPDATE_QUESTION_STATUS: {
			const updatedStatusQuestions = state.questions.map((question) =>
				Number(question.id) === Number(action.payload.id)
					? { ...question, ...action.payload.updates }
					: question,
			);

			// Recompute the canSubmit flag by checking if all questions are correct
			const canSubmit = areAllQuestionsCorrect(updatedStatusQuestions);

			console.log(
				"Provider: Updated Question Status:",
				updatedStatusQuestions,
			);
			console.log("Provider: canSubmit flag value:", canSubmit); // Added console log for canSubmit

			return {
				...state,
				questions: updatedStatusQuestions,
				canSubmit, // Update canSubmit in the state
			};
		}

		case RESET_PAGE:
			return {
				...state,
				questions: state.questions.map((question) => ({
					...question,
					status: QuestionStatus.NotStarted,
					correct: false,
				})),
				canSubmit: false, // Reset canSubmit to false on page reset
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
	// Store the initial pageData in a ref
	const initialPageDataRef = useRef(pageData);

	// Use the initial pageData throughout the component's lifecycle
	const validPageData = initialPageDataRef.current;

	console.log("Received pageData in PageProvider:", validPageData);

	const {
		pageId,
		trackId = 1,
		type = PageType.Quiz,
		course = "",
		module = "",
		section = "",
		title = "",
		topic = "",
		description = "",
		tags = [],
		image = "",
		banner = "",
		order = 0,
		coursePathProgress = 0,
		difficulty,
		points = 0, // We'll use this points value directly
		requiresAuth = false,
		roles = [UserRole.Guest],
		prerequisites = [],
		questions = [],
	} = validPageData;

	console.log("Extracted values in PageProvider: ", {
		pageId,
		difficulty,
		questions,
	});

	// Initialize state with canSubmit set to false
	const [state, dispatch] = useReducer(pageReducer, {
		questions,
		resetFlag: false,
		canSubmit: false, // Initialize canSubmit as false
	});

	const registerQuestion = useCallback(
		(question: QuestionProps) => {
			const numericQuestionId = Number(question.id);

			if (
				state.questions.some((q) => Number(q.id) === numericQuestionId)
			) {
				console.log(
					`Provider: Question with id ${numericQuestionId} is already registered.`,
				);
				return;
			}

			dispatch({
				type: REGISTER_QUESTION,
				payload: { ...question, id: numericQuestionId },
			});
			console.log("Provider: Registered Question:", {
				...question,
				id: numericQuestionId,
			});
		},
		[state.questions],
	);

	const updateQuestionStatus = useCallback(
		(id: number, updates: Partial<QuestionProps>) => {
			dispatch({
				type: UPDATE_QUESTION_STATUS,
				payload: { id: Number(id), updates },
			});
		},
		[],
	);

	const resetPage = useCallback(() => {
		dispatch({ type: "RESET_PAGE" });
		dispatch({ type: "TOGGLE_RESET_FLAG" });
		console.log("Provider: ✓ Page Reset");
	}, []);

	useEffect(() => {
		console.log("Provider: Page State Updated:", state);
	}, [state]);

	// Update context value with canSubmit added to state
	const contextValue = {
		pageId,
		trackId,
		course,
		module,
		section,
		title,
		topic,
		description,
		tags,
		image,
		banner,
		order,
		coursePathProgress,
		type,
		difficulty,
		prerequisites,
		points,
		questions: state.questions,
		resetFlag: state.resetFlag,
		canSubmit: state.canSubmit, // Provide canSubmit to context
		requiresAuth,
		roles,
		registerQuestion,
		updateQuestionStatus,
		resetPage,
	};

	return (
		<PageContext.Provider value={contextValue}>
			{children}
		</PageContext.Provider>
	);
};
