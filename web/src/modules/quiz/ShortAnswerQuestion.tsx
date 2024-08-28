import { useState } from "react";

type ShortAnswerQuestionProps = {
    question: string;
    correctAnswer: boolean;
};

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ question, correctAnswer }) => {
    const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleAnswer = (answer: boolean) => {
        setUserAnswer(answer);
        setIsCorrect(answer === correctAnswer);
        // disable other button
    };

    return (
        <div className="short-answer-container">
            <p className="short-answer-question">{question}</p>
            <div className="short-answer-input">
                <input
                    className={`short-answer-option ${
                        userAnswer === true ? (isCorrect ? "correct" : "incorrect") : ""
                    }`}
                />
            </div>
            {userAnswer !== null && <div />}
        </div>
    );
};

export default ShortAnswerQuestion;
