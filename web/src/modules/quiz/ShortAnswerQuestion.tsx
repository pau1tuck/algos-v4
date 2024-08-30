import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
        <div className="short-answer-container">
            {question && (
                <p className="short-answer-question">
                    <ReactMarkdown>{question}</ReactMarkdown>
                </p>
            )}
            <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                className="short-answer-input"
            />
            <button type="submit" onClick={handleAnswer} className="short-answer-submit">
                Submit
            </button>
            {isCorrect !== null && (
                <p className={`short-answer-feedback ${isCorrect ? "correct" : "incorrect"}`}>
                    {isCorrect ? "Correct!" : "Incorrect. Try again!"}
                </p>
            )}
        </div>
    );
};

export default ShortAnswerQuestion;
