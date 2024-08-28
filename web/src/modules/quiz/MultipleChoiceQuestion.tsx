import React, { useState } from "react";

type MultipleChoiceQuestionProps = {
    question: string;
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
        <div>
            <h3>{question}</h3>
            {options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(index)}>
                    {option}
                </button>
            ))}
            {userAnswerIndex !== null && <p>{isCorrect ? "Correct!" : "Incorrect. Try again!"}</p>}
        </div>
    );
};

export default MultipleChoiceQuestion;
