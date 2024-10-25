// web/src/modules/quiz/components/CodeChoiceQuestion.tsx
import type React from "react";
import { useEffect, useState } from 'react';

import { QuestionStatus, QuestionType } from '@site/src/modules/quiz/types/question.types';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';

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
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const { registerQuestion, updateQuestionStatus, resetFlag } =
		usePageContext();

	const numericQuestionId = Number(questionId); // Ensure questionId is a number

	// Register the question when the component mounts
	useEffect(() => {
		if (!Number.isNaN(numericQuestionId) && !Number.isNaN(points)) {
			registerQuestion({
				id: numericQuestionId,
				type: QuestionType.CodeChoice,
				order,
				points: Number(points),
				difficulty: 1, // Assuming difficulty is fixed for now, can be passed as a prop if needed
				status: QuestionStatus.NotStarted,
				correct: false,
			});
		}
	}, [numericQuestionId, order, points, registerQuestion]);

	// Reset userAnswer and isCorrect when resetFlag toggles
	useEffect(() => {
		setUserAnswer(null);
		setIsCorrect(null);
	}, [resetFlag]);

	const handleOptionClick = (index: number) => {
		if (userAnswer !== null) return; // Lock options after selection
		setUserAnswer(index);
		const isAnswerCorrect = index === correctAnswer;
		setIsCorrect(isAnswerCorrect);

		updateQuestionStatus(numericQuestionId, {
			status: QuestionStatus.Complete,
			correct: isAnswerCorrect,
		});
	};

	const isLocked = userAnswer !== null;

	return (
		<div className={styles["question-container"]}>
			<div className={styles["code-choice-container"]}>
				{["Block 1", "Block 2", "Block 3"].map((label, index) => (
					<button
						key={index}
						onClick={() => handleOptionClick(index)}
						className={`${styles["code-choice-button"]} ${
							userAnswer !== null && userAnswer === index
								? isCorrect
									? styles["correct"]
									: styles["incorrect"]
								: ""
						}`}
						style={{
							cursor: isLocked ? "not-allowed" : "pointer",
							pointerEvents: isLocked ? "none" : "auto",
							color:
								userAnswer !== index && isLocked
									? "gray"
									: "inherit", // Grey out unselected options
						}}
						aria-disabled={isLocked}
					>
						{label}
					</button>
				))}
			</div>
		</div>
	);
};

export default CodeChoiceQuestion;
