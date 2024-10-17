// web/src/modules/quiz/components/TrueFalseQuestion.tsx

import type React from "react";
import { useEffect, useState } from 'react';
import { BsFillQuestionSquareFill } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Box } from '@mui/material';
import styles from '@site/src/modules/quiz/css/quiz.module.css';
import { QuestionStatus, QuestionType } from '@site/src/modules/quiz/types/question.types';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';

import type { DifficultyLevel } from "@site/src/modules/quiz/types/question.types";

type TrueFalseQuestionProps = {
	questionId: number;
	type: QuestionType;
	difficulty: DifficultyLevel;
	order: number;
	question: string;
	correctAnswer: boolean;
	points: number;
};

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
	questionId,
	question,
	type = QuestionType.TrueFalse,
	difficulty,
	correctAnswer,
	order,
	points,
}) => {
	const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const { registerQuestion, updateQuestionStatus, resetFlag } =
		usePageContext();

	const numericQuestionId = Number(questionId); // Ensure questionId is a number

	// Register the question with the page context when the component mounts
	useEffect(() => {
		registerQuestion({
			id: numericQuestionId,
			type,
			order,
			points: Number(points),
			difficulty,
			status: QuestionStatus.NotStarted,
			correct: false,
		});
	}, [numericQuestionId, type, order, points, difficulty, registerQuestion]);

	// Reset userAnswer and isCorrect when resetFlag toggles
	useEffect(() => {
		setUserAnswer(null);
		setIsCorrect(null);
	}, [resetFlag]);

	// Handle user's answer submission
	const handleAnswer = (answer: boolean) => {
		setUserAnswer(answer);
		const isAnswerCorrect = answer === correctAnswer;
		setIsCorrect(isAnswerCorrect);

		console.log(
			"TFQuestion: User answered:",
			answer,
			"Correct answer:",
			isAnswerCorrect,
		);

		// Update both completeness and correctness in PageContext
		updateQuestionStatus(numericQuestionId, {
			status: QuestionStatus.Complete,
			correct: isAnswerCorrect,
		});
	};

	// Determine if buttons should be locked after an answer is selected
	const isLocked = userAnswer !== null;

	return (
		<div className={styles["question-container"]}>
			<Box mb={-2} textAlign="right">
				<BsFillQuestionSquareFill size={22} color="lightgray" />
			</Box>
			<ReactMarkdown
				components={{
					code({ node, inline, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");
						return !inline && match ? (
							<SyntaxHighlighter
								style={dracula}
								language={match[1]}
								PreTag="div"
								{...props}
							>
								{String(children).replace(/\n$/, "")}
							</SyntaxHighlighter>
						) : (
							<code className={className} {...props}>
								{children}
							</code>
						);
					},
				}}
			>
				_
			</ReactMarkdown>
			{questionId.toString()}.&nbsp;&nbsp;{question}
			<div className={styles["true-false-options"]}>
				<button
					type="button"
					onClick={() => handleAnswer(true)}
					className={`${styles["true-false-option"]} ${
						userAnswer === true
							? isCorrect
								? styles.correct
								: styles.incorrect
							: ""
					}`}
					style={{
						cursor: isLocked ? "not-allowed" : "pointer",
						pointerEvents: isLocked ? "none" : "auto", // Lock both buttons after an answer
						color:
							userAnswer === false && isLocked
								? "gray"
								: "inherit", // Grey out the unselected button
					}}
				>
					True
				</button>
				<button
					type="button"
					onClick={() => handleAnswer(false)}
					className={`${styles["true-false-option"]} ${
						userAnswer === false
							? isCorrect
								? styles.correct
								: styles.incorrect
							: ""
					}`}
					style={{
						cursor: isLocked ? "not-allowed" : "pointer",
						pointerEvents: isLocked ? "none" : "auto", // Lock both buttons after an answer
						color:
							userAnswer === true && isLocked
								? "gray"
								: "inherit", // Grey out the unselected button
					}}
				>
					False
				</button>
			</div>
		</div>
	);
};

export default TrueFalseQuestion;
