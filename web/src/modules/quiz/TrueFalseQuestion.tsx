// modules/quiz/TrueFalseQuestion.tsx
import type React from "react";
import { useState } from "react";
import styles from "./quiz.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

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

    const handleAnswer = (answer: boolean) => {
        setUserAnswer(answer);
        setIsCorrect(answer === correctAnswer);
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
                    className={`${styles["true-false-option"]} ${
                        userAnswer === true
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
                    className={`${styles["true-false-option"]} ${
                        userAnswer === false
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
