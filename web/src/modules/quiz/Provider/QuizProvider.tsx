import React, { useState, ReactNode } from "react";
import { QuizContext } from "./QuizContext";

const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [questions, setQuestions] = useState<any[]>([]); // Using 'any[]' for questions state
    const [correctAnswers, setCorrectAnswers] = useState(0); // Keep the 'correctAnswers' state

    const registerQuestion = (question: any) => {
        setQuestions((prevQuestions) => [...prevQuestions, question]);
    };

    const updateQuestionStatus = (questionId: number, status: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.questionId === questionId
                    ? { ...q, questionStatus: status }
                    : q
            )
        );

        // Update correct answers count based on the status
        if (status === "correct") {
            incrementCorrectAnswers();
        }
    };

    const incrementCorrectAnswers = () => setCorrectAnswers((prev) => prev + 1);

    const incrementAttemptCount = (questionId: number) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.questionId === questionId
                    ? { ...q, attemptCount: q.attemptCount + 1 }
                    : q
            )
        );
    };

    const useHint = (questionId: number) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.questionId === questionId ? { ...q, hintUsed: true } : q
            )
        );
    };

    const resetCorrectAnswers = () => setCorrectAnswers(0);

    return (
        <QuizContext.Provider
            value={{
                questions,
                correctAnswers, // Include 'correctAnswers' in the context value
                incrementCorrectAnswers,
                resetCorrectAnswers,
                registerQuestion,
                updateQuestionStatus,
                incrementAttemptCount,
                useHint,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

QuizProvider.displayName = "QuizProvider";

export default QuizProvider;
