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
            <p>{question}</p>
            {options.map((option, index) => (
                <div
                    key={index}
                    onClick={() => handleAnswer(index)}
                    style={{
                        cursor: "pointer",
                        margin: "5px 0",
                        textAlign: "left",
                    }}
                >
                    {option}
                </div>
            ))}
            {isCorrect !== null && <p>{isCorrect ? "Correct!" : "Incorrect. Try again!"}</p>}
        </div>
    );
};

export default MultipleChoiceQuestion;
