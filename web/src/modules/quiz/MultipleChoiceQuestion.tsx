import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
        // disable other buttons
    };

    return (
        <div className="multiple-choice-container">
            {question && (
                <p className="multiple-choice-question">
                    <ReactMarkdown>{question}</ReactMarkdown>
                </p>
            )}
            {options.map((option, index) => (
                <div
                    key={index}
                    onClick={() => handleAnswer(index)}
                    onKeyPress={() => handleAnswer(index)}
                    className={`multiple-choice-option ${
                        userAnswerIndex === index ? (isCorrect ? "correct" : "incorrect") : ""
                    }`}
                >
                    <ReactMarkdown>{option}</ReactMarkdown>
                </div>
            ))}
            {isCorrect !== null && <div />}
        </div>
    );
};

export default MultipleChoiceQuestion;
