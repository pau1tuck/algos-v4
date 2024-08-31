import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./quiz.module.css"; // Importing CSS Module

type MultipleChoiceQuestionProps = {
    question: string;
    options: string[];
    correctAnswer: number;
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    question,
    options,
    correctAnswer,
}) => {
    const [userAnswerIndex, setUserAnswerIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleAnswer = (index: number) => {
        setUserAnswerIndex(index);
        setIsCorrect(index === correctAnswer);
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
            {options.map((option, index) => (
                <div
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`${styles["question-option"]} ${
                        userAnswerIndex === index
                            ? isCorrect
                                ? styles.correct
                                : styles.incorrect
                            : ""
                    }`}
                >
                    {option}
                </div>
            ))}
            {
                isCorrect !== null && null
                /*<p className={`${styles["question-feedback"]} ${isCorrect ? styles.correct : styles.incorrect}`}>
                    {isCorrect ? "Correct!" : "Incorrect. Try again!"}
                </p>*/
            }
        </div>
    );
};

export default MultipleChoiceQuestion;
