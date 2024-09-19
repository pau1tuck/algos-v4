// src/modules/quiz/utils/PageProvider.tsx
import type React from "react";
import { useReducer, useCallback } from "react";
import { UserRole } from "@site/src/modules/user/types/user.type";
import { PageType } from "@site/src/modules/quiz/types/page.types";
import { PageContext } from "@site/src/modules/quiz/utils/PageContext";
import type {
	PageContextProps,

} from "@site/src/modules/quiz/utils/PageContext";
// biome lint-disable: lint/style/useImportType // LINT: Don't use import type
import { DifficultyLevel, QuestionProps, QuestionStatus } from "@site/src/modules/quiz/types/question.types";

// Action types
const REGISTER_QUESTION = "REGISTER_QUESTION";
const UPDATE_QUESTION_STATUS = "UPDATE_QUESTION_STATUS";
const RESET_PAGE = "RESET_PAGE";

type PageState = {
	questions: QuestionProps[];
};

type PageAction =
	| { type: "REGISTER_QUESTION"; payload: QuestionProps }
	| {
		type: "UPDATE_QUESTION_STATUS";
		payload: { id: number; updates: Partial<QuestionProps> };
	}
	| { type: "RESET_PAGE" };

const pageReducer = (state: PageState, action: PageAction): PageState => {
	switch (action.type) {
		case REGISTER_QUESTION:
			console.log("Registering question:", action.payload);
			return {
				...state,
				questions: [...state.questions, action.payload],
			};
		case UPDATE_QUESTION_STATUS:
			console.log("Updating question status:", action.payload);
			return {
				...state,
				questions: state.questions.map((question) =>
					question.id === action.payload.id
						? { ...question, ...action.payload.updates }
						: question,
				),
			};
		case RESET_PAGE:
			console.log("Resetting page state");
			return {
				...state,
				questions: state.questions.map((question) => ({
					...question,
					status: QuestionStatus.NotStarted as QuestionStatus,
					correct: false,
				})),
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
		pageScore = 0,
		points = 0,
		completed = QuestionStatus.NotStarted,
		tags = [],
		lastAccessed = null,
		coursePathProgress = 0,
		questions = [],
	} = pageData;

	const [state, dispatch] = useReducer(pageReducer, {
		questions,
	});

	const registerQuestion = useCallback((question: QuestionProps) => {
		dispatch({ type: REGISTER_QUESTION, payload: question });
	}, []);

	const updateQuestionStatus = useCallback(
		(id: number, updates: Partial<QuestionProps>) => {
			dispatch({
				type: UPDATE_QUESTION_STATUS,
				payload: { id, updates },
			});
		},
		[],
	);

	const calculatePageScore = useCallback(() => {
		const totalScore = state.questions.reduce((totalScore, question) => {
			return question.correct ? totalScore + question.value : totalScore;
		}, 0);
		console.log("Calculated page score:", totalScore);
		return totalScore;
	}, [state.questions]);

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
				completed,
				tags,
				lastAccessed,
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
