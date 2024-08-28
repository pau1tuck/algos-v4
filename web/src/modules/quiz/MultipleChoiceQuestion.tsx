import React, { useState } from "react";

type MultipleChoiceQuestionProps = {
    question: string;
    options: string[];
    correctAnswerIndex: number;
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question, options, correctAnswerIndex }) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSubmit = () => {
        if (selectedOptionIndex !== null) {
            setIsCorrect(selectedOptionIndex === correctAnswerIndex);
        }
    };

    return (
        <div>
            <h3>{question}</h3>
            <select onChange={e => setSelectedOptionIndex(Number(e.target.value))} defaultValue="">
                <option value="" disabled>
                    Select an answer
                </option>
                {options.map((option, index) => (
                    <option key={index} value={index}>
                        {option}
                    </option>
                ))}
            </select>
            <button onClick={handleSubmit}>Submit</button>
            {isCorrect !== null && <p>{isCorrect ? "Correct!" : "Incorrect. Try again!"}</p>}
        </div>
    );
};

export default MultipleChoiceQuestion;
