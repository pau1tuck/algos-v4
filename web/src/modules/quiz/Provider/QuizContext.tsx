// src/modules/quiz/Provider/QuizContext.tsx
import { createContext, useContext } from "react";

export enum QuestionType {
    MultipleChoice = "multiple-choice",
    TrueFalse = "true-false",
    ShortAnswer = "short-answer",
}

export enum QuestionStatus {
    Unanswered = "unanswered",
    Correct = "correct",
    Incorrect = "incorrect",
}
interface QuestionState {
    questionId: number;
    order: number;
    questionType: QuestionType; // Updated to use enum
    questionStatus: QuestionStatus; // Updated to use enum
    attemptCount: number;
    hintUsed: boolean;
}
/*  questionType: enum;
    questionText: string;  // New: Text of the question
    answerChoices?: string[];  // New: Possible answers (optional, as not all questions need this)
    userAnswer: string | null;  // New: User's answer
    attemptCount: number;
    difficulty: string;  // New: Difficulty level of the question
    hint: string;
    explanation?: string;  // New: Explanation for the correct answer (optional)
    timeTaken?: number;  // New: Time taken to answer (optional)
    tags?: string[];  // New: Tags for categorizing questions (optional)
    isSkipped?: boolean;  // New: Whether the question was skipped (optional) */

interface QuizContextType {
    questions: QuestionState[];
    registerQuestion: (question: QuestionState) => void;
    updateQuestionStatus: (questionId: number, status: QuestionStatus) => void; // Updated to use enum
    incrementAttemptCount: (questionId: number) => void;
    useHint: (questionId: number) => void;
    correctAnswers: number;
    incrementCorrectAnswers: () => void;
    resetCorrectAnswers: () => void;
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
