import type React from "react";
import { useState } from 'react';

import styles from '../css/quiz.module.css';

type CodeChoiceQuestionProps = {
	questionId: number;
	correctAnswer: number; // Index of the correct answer
	points: number;
	order: number;
};

const CodeChoiceQuestion: React.FC<CodeChoiceQuestionProps> = ({
	questionId,
	correctAnswer,
	points,
	order,
}) => {
	const [userAnswer, setUserAnswer] = useState<number | null>(null);
	const isLocked = userAnswer !== null;

	const handleOptionClick = (index: number) => {
		if (isLocked) return;
		setUserAnswer(index);
	};

	return (
		<div className={styles["question-container"]}>
			<div className={styles["button-container"]}>
				{["Block 1", "Block 2", "Block 3"].map((label, index) => (
					<button
						key={index}
						onClick={() => handleOptionClick(index)}
						className={`${styles["code-choice-button"]} ${
							userAnswer !== null &&
							(index === correctAnswer
								? styles["correct"]
								: userAnswer === index
									? styles["incorrect"]
									: "")
						}`}
						disabled={isLocked}
					>
						{label}
					</button>
				))}
			</div>
		</div>
	);
};

export default CodeChoiceQuestion;
