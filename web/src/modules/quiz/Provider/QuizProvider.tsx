import React, { useState, ReactNode } from "react";
import { QuizContext } from "./QuizContext";

const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

QuizProvider.displayName = "QuizProvider";

export default QuizProvider;
