// src/modules/quiz/utils/QuizProvider.tsx
import React, { useState, useCallback, ReactNode } from "react";
import { QuizContext, QuestionStatus } from "./QuizContext";

const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const registerQuestion = useCallback((question: any) => {
        setQuestions(prevQuestions => [...prevQuestions, question]);
    }, []);

    const incrementCorrectAnswers = () => {
        console.log("Increment correct answers called.");
        setCorrectAnswers(prev => prev + 1);
    };

    const updateQuestionStatus = useCallback(
        (questionId: number, status: QuestionStatus) => {
            console.log(
                "updateQuestionStatus called for question:",
                questionId,
                "with status:",
                status
            );
            setQuestions(prevQuestions =>
                prevQuestions.map(q =>
                    q.questionId === questionId
                        ? { ...q, questionStatus: status }
                        : q
                )
            );
            if (status === QuestionStatus.Correct) {
                incrementCorrectAnswers();
            }
            console.log("Callback complete");
        },
        []
    );

    const incrementAttemptCount = useCallback((questionId: number) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(q =>
                q.questionId === questionId
                    ? { ...q, attemptCount: q.attemptCount + 1 }
                    : q
            )
        );
    }, []);

    const resetQuiz = useCallback(() => {
        setCorrectAnswers(0);
        setQuestions(prevQuestions =>
            prevQuestions.map(q => ({
                ...q,
                questionStatus: QuestionStatus.Unanswered,
                attemptCount: 0,
                hintUsed: false,
            }))
        );
    }, []);

    return (
        <QuizContext.Provider
            value={{
                questions,
                correctAnswers,
                incrementCorrectAnswers,
                resetQuiz,
                registerQuestion,
                updateQuestionStatus,
                incrementAttemptCount,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

export default QuizProvider;
