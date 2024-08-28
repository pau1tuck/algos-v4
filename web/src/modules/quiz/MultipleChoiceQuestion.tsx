import { useState } from "react";

type MultipleChoiceQuestionProps = {
    question?: string;
    options: string[];
    correctAnswerIndex: number;
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question, options, correctAnswerIndex }) => {
    const [userAnswerIndex, setUserAnswerIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleAnswer = (index: number) => {
        setUserAnswerIndex(index);
        setIsCorrect(index === correctAnswerIndex);
    };

    return (
        <div className="multiple-choice-container">
            {question && <p className="multiple-choice-question">{question}</p>}
            {options.map((option, index) => (
                <div
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`multiple-choice-option ${
                        userAnswerIndex !== null ? (index === correctAnswerIndex ? "correct" : "incorrect") : ""
                    }`}
                >
                    {option}
                </div>
            ))}
            {isCorrect !== null && (
                <p className="multiple-choice-feedback">{isCorrect ? "Correct!" : "Incorrect. Try again!"}</p>
            )}
        </div>
    );
};

export default MultipleChoiceQuestion;
