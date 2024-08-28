import React, { useState } from "react";

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
        <div>
            <h3>{question}</h3>
            <button onClick={() => handleAnswer(true)}>True</button>
            <button onClick={() => handleAnswer(false)}>False</button>
            {userAnswer !== null && <p>{isCorrect ? "Correct!" : "Incorrect. Try again!"}</p>}
        </div>
    );
};

export default TrueFalseQuestion;
