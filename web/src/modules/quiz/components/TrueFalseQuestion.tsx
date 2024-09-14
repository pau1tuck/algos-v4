import React, { useState, useEffect } from "react";
import styles from "@site/src/modules/quiz/css/quiz.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { QuestionStatus } from "@site/src/modules/quiz/utils/PageContext";

type TrueFalseQuestionProps = {
    question: string;
    correctAnswer: boolean;
    questionId: string; // Dynamic question ID passed as a prop
    order: number; // Dynamic order of the question
    pointValue: number; // Points associated with the question
};

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
    question,
    correctAnswer,
    questionId,
    order,
    pointValue,
}) => {
    const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const { registerQuestion, updateQuestionStatus } = usePageContext();

    // Register the question with the page context when the component mounts
    useEffect(() => {
        console.log("Registering question with ID:", questionId);
        registerQuestion({
            id: Number(questionId), // Unique ID for the question
            value: Number(pointValue), // Points for the question
            status: QuestionStatus.NotStarted, // Initially not started
            correct: false, // Initially marked as incorrect
        });
    }, [questionId, pointValue, registerQuestion]);

    const handleAnswer = (answer: boolean) => {
        setUserAnswer(answer);
        const isAnswerCorrect = answer === correctAnswer;
        setIsCorrect(isAnswerCorrect);

        console.log("Answer submitted:", answer);
        console.log("Is answer correct?", isAnswerCorrect);

        // Update the question status in the PageContext
        updateQuestionStatus(Number(questionId), {
            status: QuestionStatus.Complete, // Mark the question as completed
            correct: isAnswerCorrect, // Whether the answer is correct
        });
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
                    disabled={userAnswer !== null}
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
