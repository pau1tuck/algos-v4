//web/src/modules/quiz/utils/PageProvider.tsx

import React, { useReducer, useCallback } from "react";
import { UserRole } from "@site/src/modules/user/types/user.type";
import { PageType } from "@site/src/modules/quiz/types/page.types";
import { PageContext, PageContextProps } from "@site/src/modules/quiz/utils/PageContext";
import { DifficultyLevel, QuestionProps, QuestionStatus } from "@site/src/modules/quiz/types/question.types";

const REGISTER_QUESTION = "REGISTER_QUESTION";
const UPDATE_QUESTION_STATUS = "UPDATE_QUESTION_STATUS";
const RESET_PAGE = "RESET_PAGE";
const TOGGLE_RESET_FLAG = "TOGGLE_RESET_FLAG";

type PageState = {
	questions: QuestionProps[];
	resetFlag: boolean;
};

type PageAction =
	| { type: "REGISTER_QUESTION"; payload: QuestionProps }
	| { type: "UPDATE_QUESTION_STATUS"; payload: { id: number; updates: Partial<QuestionProps> } }
	| { type: "RESET_PAGE" }
	| { type: "TOGGLE_RESET_FLAG" };

const pageReducer = (state: PageState, action: PageAction): PageState => {
	switch (action.type) {
		case REGISTER_QUESTION:
			const updatedQuestions = [...state.questions, action.payload];
			console.log("Registered Question:", action.payload);
			return {
				...state,
				questions: updatedQuestions,
			};
		case UPDATE_QUESTION_STATUS:
			const updatedStatusQuestions = state.questions.map((question) =>
				question.id === action.payload.id ? { ...question, ...action.payload.updates } : question
			);
			console.log("Updated Question Status:", updatedStatusQuestions);
			return {
				...state,
				questions: updatedStatusQuestions,
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
		case TOGGLE_RESET_FLAG:
			return {
				...state,
				resetFlag: !state.resetFlag,
			};
		default:
			return state;
	}
};

export const PageProvider: React.FC<{ pageData?: Partial<PageContextProps>; children: React.ReactNode }> = ({
	children,
	pageData = {},
}) => {
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
		pageScore = 0,
		points = 0,
		completed = QuestionStatus.NotStarted,
		tags = [],
		lastAccessed = null,
		coursePathProgress = 0,
		questions = [],
		requiresAuth = false,  // Add requiresAuth here
	} = pageData;

	const [state, dispatch] = useReducer(pageReducer, { questions, resetFlag: false });

	const registerQuestion = useCallback((question: QuestionProps) => {
		dispatch({ type: REGISTER_QUESTION, payload: question });
	}, []);

	const updateQuestionStatus = useCallback((id: number, updates: Partial<QuestionProps>) => {
		dispatch({
			type: UPDATE_QUESTION_STATUS,
			payload: { id, updates },
		});
	}, []);

	const calculatePageScore = useCallback(() => {
		const totalScore = state.questions.reduce((totalScore, question) => {
			return question.correct ? totalScore + question.value : totalScore;
		}, 0);
		return totalScore;
	}, [state.questions]);

	const resetPage = useCallback(() => {
		dispatch({ type: RESET_PAGE });
		dispatch({ type: TOGGLE_RESET_FLAG });
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