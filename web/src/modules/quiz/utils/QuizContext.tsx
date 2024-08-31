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
    questionType: QuestionType;
    questionStatus: QuestionStatus; // default unanswered
    attemptCount: number; // default 0
    hintUsed: boolean; // default false
    // Optional fields for future expansion
    // questionText?: string;
    // answerChoices?: string[];
    // userAnswer?: string | null;
    // difficulty?: string;
    // hint?: string;
    // explanation?: string;
    // timeTaken?: number;
    // tags?: string[];
    // isSkipped?: boolean;
}

interface QuizContextType {
    questions: QuestionState[];
    registerQuestion: (question: QuestionState) => void;
    updateQuestionStatus: (questionId: number, status: QuestionStatus) => void;
    incrementAttemptCount: (questionId: number) => void;
    correctAnswers: number; // default 0
    incrementCorrectAnswers: () => void;
    resetQuiz: () => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(
    undefined
);
