// src/modules/quiz/Provider/QuizContext.tsx
import { createContext, useContext } from "react";

interface QuestionState {
    questionId: number;
    order: number;
    questionType: string;
    questionStatus: string; // e.g., 'unanswered', 'correct', 'incorrect'
    attemptCount: number;
    hintUsed: boolean;
}

interface QuizContextType {
    questions: any[]; // Using 'any[]' for flexibility
    correctAnswers: number; // Added correctAnswers to the context type
    incrementCorrectAnswers: () => void;
    resetCorrectAnswers: () => void;
    registerQuestion: (question: any) => void;
    updateQuestionStatus: (questionId: number, status: string) => void;
    incrementAttemptCount: (questionId: number) => void;
    useHint: (questionId: number) => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(
    undefined
);

// Custom hook to use the QuizContext
export const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }
    return context;
};
