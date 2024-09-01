// src/modules/quiz/TrueFalseQuestion.tsx
import React, { useState, useEffect } from "react";
import styles from "./css/quiz.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
    QuestionType,
    QuestionStatus,
} from "@site/src/modules/quiz/utils/QuizContext";
import { useQuizContext } from "@site/src/modules/quiz/utils/useQuizContext";

type TrueFalseQuestionProps = {
    question: string;
    correctAnswer: boolean;
};

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
    question,
    correctAnswer,
}) => {
    const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const { registerQuestion, updateQuestionStatus, incrementCorrectAnswers } =
        useQuizContext();

    // Register the question with quiz page context when the component mounts
    useEffect(() => {
        registerQuestion({
            questionId: 1, // Replace with dynamic ID
            order: 1, // Replace with dynamic order
            questionType: QuestionType.TrueFalse,
            questionStatus: QuestionStatus.Unanswered,
            attemptCount: 0,
            hintUsed: false,
        });
    }, []);

    const handleAnswer = (answer: boolean) => {
        setUserAnswer(answer);
        setIsCorrect(answer === correctAnswer);

        if (answer === correctAnswer) {
            updateQuestionStatus(1, QuestionStatus.Correct); // Remove incrementCorrectAnswers() here
        } else {
            updateQuestionStatus(1, QuestionStatus.Incorrect);
        }
    };

    return (
        <div className={styles["question-container"]}>
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={dracula}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {question}
            </ReactMarkdown>
            <div className={styles["true-false-options"]}>
                <button
                    type="button"
                    onClick={() => handleAnswer(true)}
                    disabled={userAnswer !== null}
                    className={`${styles["true-false-option"]} ${userAnswer === true
                            ? isCorrect
                                ? styles.correct
                                : styles.incorrect
                            : ""
                        }`}
                >
                    True
                </button>
                <button
                    type="button"
                    onClick={() => handleAnswer(false)}
                    disabled={userAnswer !== null}
                    className={`${styles["true-false-option"]} ${userAnswer === false
                            ? isCorrect
                                ? styles.correct
                                : styles.incorrect
                            : ""
                        }`}
                >
                    False
                </button>
                {userAnswer !== null && <div />}
            </div>
        </div>
    );
};

export default TrueFalseQuestion;
