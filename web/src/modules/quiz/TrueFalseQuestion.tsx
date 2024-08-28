import type React from "react";
import { useState } from "react";

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
        <div className="true-false-container">
            <p className="true-false-question">{question}</p>
            <div className="true-false-options">
                <button
                    onClick={() => handleAnswer(true)}
                    className={`true-false-option ${userAnswer === true ? (isCorrect ? "correct" : "incorrect") : ""}`}
                >
                    True
                </button>
                <button
                    onClick={() => handleAnswer(false)}
                    className={`true-false-option ${
                        userAnswer === false ? (!isCorrect ? "incorrect" : "correct") : ""
                    }`}
                >
                    False
                </button>
            </div>
            {userAnswer !== null && (
                <p className="true-false-feedback">{isCorrect ? "Correct!" : "Incorrect. Try again!"}</p>
            )}
        </div>
    );
};

export default TrueFalseQuestion;
