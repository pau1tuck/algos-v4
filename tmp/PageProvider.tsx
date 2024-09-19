// src/modules/quiz/utils/PageProvider.tsx
import React, { useReducer, useCallback } from "react";
import {
	DifficultyLevel,
	PageContext,
	PageContextProps,
	QuestionStatusProps,
	QuestionStatus,
	PageType, // Import PageType
	UserRole, // Import UserRole
} from "./PageContext";

/* LearningObjectives: Store the learning objectives for the page.
Tags: Reflect tags associated with the page for filtering or categorization.
Difficulty: Capture and use this in user progress to tailor difficulty-related achievements.
PageScore and Points: Reflect the points and score directly tied to this page in UserProgress. */

// Action types
const REGISTER_QUESTION = "REGISTER_QUESTION";
const UPDATE_QUESTION_STATUS = "UPDATE_QUESTION_STATUS";
const RESET_PAGE = "RESET_PAGE";

type PageState = {
	questions: QuestionStatusProps[];
};

type PageAction =
	| { type: "REGISTER_QUESTION"; payload: QuestionStatusProps }
	| {
			type: "UPDATE_QUESTION_STATUS";
			payload: { id: number; updates: Partial<QuestionStatusProps> };
	  }
	| { type: "RESET_PAGE" };

// Reducer function to handle page state changes
const pageReducer = (state: PageState, action: PageAction): PageState => {
	switch (action.type) {
		case REGISTER_QUESTION:
			return {
				...state,
				questions: [...state.questions, action.payload],
			};
		case UPDATE_QUESTION_STATUS:
			return {
				...state,
				questions: state.questions.map((question) =>
					question.id === action.payload.id
						? { ...question, ...action.payload.updates }
						: question,
				),
			};
		case RESET_PAGE:
			return {
				...state,
				questions: state.questions.map((question) => ({
					...question,
					status: QuestionStatus.NotStarted,
					correct: false,
				})),
			};
		default:
			return state;
	}
};

export const PageProvider: React.FC<{
	pageData?: Partial<PageContextProps>; // pageData can be partial and optional
	children: React.ReactNode;
}> = ({ children, pageData = {} }) => {
	// Provide a default empty object for pageData
	// Define default values for missing properties
	const {
		page_id = 0, // Default page_id to 0
		title = "",
		module = "",
		section = "",
		topic = "",
		order = 0,
		type = PageType.Quiz,
		// authCheck = true,
		// role = [],
		role = UserRole.Guest,
		prerequisites = [],
		difficulty = DifficultyLevel.Junior,
		pageScore = 0,
		points = 0,
		estimatedTime = "Unknown",
		completed = QuestionStatus.NotStarted,
		tags = [],
		relatedPages = [],
		resources = [],
		lastAccessed = null,
		learningObjectives = [],
		coursePathProgress = 0,
		questions = [],
	} = pageData;

	const [state, dispatch] = useReducer(pageReducer, {
		questions, // Initialize questions array
	});

	// Register a question with the page context
	const registerQuestion = useCallback((question: QuestionStatusProps) => {
		dispatch({ type: REGISTER_QUESTION, payload: question });
	}, []);

	// Update a specific question's status
	const updateQuestionStatus = useCallback(
		(id: number, updates: Partial<QuestionStatusProps>) => {
			dispatch({
				type: UPDATE_QUESTION_STATUS,
				payload: { id, updates },
			});
		},
		[],
	);

	// Calculate the total score based on correct answers
	const calculatePageScore = useCallback(() => {
		return state.questions.reduce((totalScore, question) => {
			return question.correct ? totalScore + question.value : totalScore;
		}, 0);
	}, [state.questions]);

	// Reset the page state
	const resetPage = useCallback(() => {
		dispatch({ type: RESET_PAGE });
	}, []);

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
				pageScore,
				points,
				estimatedTime,
				completed,
				tags,
				relatedPages,
				resources,
				lastAccessed,
				learningObjectives,
				coursePathProgress,
				questions: state.questions,
				registerQuestion,
				updateQuestionStatus,
				calculatePageScore,
				resetPage,
			}}
		>
			{children}
		</PageContext.Provider>
	);
};
