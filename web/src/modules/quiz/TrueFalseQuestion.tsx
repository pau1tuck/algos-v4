import type React from "react";
import { useState } from "react";
import styles from "./quiz.module.css";

type TrueFalseQuestionProps = {
    question: string;
    correctAnswer: boolean;
};

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ question, correctAnswer }) => {
    const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleAnswer = (answer: boolean) => {
        setUserAnswer(answer);
        setIsCorrect(answer === correctAnswer);
    };

    return (
        <div className={styles["question-container"]}>
            <p className={styles["question-title"]}>{question}</p>
            <div className={styles["true-false-options"]}>
                <button
                    type="button"
                    onClick={() => handleAnswer(true)}
                    className={`${styles["true-false-option"]} ${
                        userAnswer === true ? (isCorrect ? styles.correct : styles.incorrect) : ""
                    }`}
                >
                    True
                </button>
                <button
                    type="button"
                    onClick={() => handleAnswer(false)}
                    className={`${styles["true-false-option"]} ${
                        userAnswer === false ? (isCorrect ? styles.correct : styles.incorrect) : ""
                    }`}
                >
                    False
                </button>
            </div>
            {userAnswer !== null && <div />}
        </div>
    );
};

export default TrueFalseQuestion;
