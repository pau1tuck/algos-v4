import React, { useState, ReactNode } from "react";
import { QuizContext } from "./QuizContext";

export const QuizProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const incrementCorrectAnswers = () => setCorrectAnswers((prev) => prev + 1);

    const resetCorrectAnswers = () => setCorrectAnswers(0);

    return (
        <QuizContext.Provider
            value={{
                correctAnswers,
                incrementCorrectAnswers,
                resetCorrectAnswers,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
