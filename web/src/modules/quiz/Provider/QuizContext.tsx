import { createContext, useContext } from "react";

interface QuizContextType {
    correctAnswers: number;
    incrementCorrectAnswers: () => void;
    resetCorrectAnswers: () => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(
    undefined
);

export const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }
    return context;
};
