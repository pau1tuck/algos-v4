// src/modules/quiz/utils/useQuizContext.tsx
import { useContext } from "react";
import { QuizContext } from "./QuizContext";

// Custom hook to use the QuizContext
export const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }
    return context;
};