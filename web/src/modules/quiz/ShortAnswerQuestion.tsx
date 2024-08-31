import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./quiz.module.css";

type ShortAnswerQuestionProps = {
    question?: string;
    correctAnswer: string;
};

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ question, correctAnswer }) => {
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleAnswer = () => {
        setIsCorrect(userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase());
    };

    return (
        <div className={styles["question-container"]}>
            {question && (
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
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
            )}
            <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                className={styles["short-answer-input"]}
            />
            <button type="button" onClick={handleAnswer} className={styles["short-answer-submit"]}>
                Submit
            </button>
            {isCorrect !== null && (
                <p className={`${styles["question-feedback"]} ${isCorrect ? styles.correct : styles.incorrect}`}>
                    {isCorrect ? "Correct!" : "Incorrect. Try again!"}
                </p>
            )}
        </div>
    );
};

export default ShortAnswerQuestion;
