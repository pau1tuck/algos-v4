// src/modules/quiz/utils/PageProvider.tsx
import React, { useReducer, useCallback } from "react";
import {
    PageContext,
    PageContextProps,
    QuestionStatusProps,
    QuestionStatus,
} from "./PageContext";

// Action types
const REGISTER_QUESTION = "REGISTER_QUESTION";
const UPDATE_QUESTION_STATUS = "UPDATE_QUESTION_STATUS";
const RESET_PAGE = "RESET_PAGE";

type PageState = {
    questions: QuestionStatusProps[];
    // Add other state properties if needed
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
                questions: state.questions.map(question =>
                    question.id === action.payload.id
                        ? { ...question, ...action.payload.updates }
                        : question
                ),
            };
        case RESET_PAGE:
            return {
                ...state,
                questions: state.questions.map(question => ({
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
    pageData: PageContextProps;
    children: React.ReactNode;
}> = ({ children, pageData }) => {
    const [state, dispatch] = useReducer(pageReducer, {
        ...pageData,
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
        []
    );

    // Calculate the total score based on correct answers
    const calculatePageScore = useCallback(() => {
        return state.questions.reduce((totalScore, question) => {
            return question.correct ? totalScore + question.value : totalScore;
        }, 0);
    }, [state.questions]);

    // Reset the page state
    const resetPageState = useCallback(() => {
        dispatch({ type: RESET_PAGE });
    }, []);

    return (
        <PageContext.Provider
            value={{
                ...state,
                registerQuestion,
                updateQuestionStatus,
                calculatePageScore,
                resetPageState,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};
