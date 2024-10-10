// web/src/modules/quiz/components/ShortAnswerQuestion.tsx

import { useEffect, useState } from 'react';
import { MdCheck, MdSend } from 'react-icons/md'; // React Icon for the send button
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button, TextField } from '@mui/material'; // Material UI components
import {
    DifficultyLevel, QuestionStatus, QuestionType, type
} from '@site/src/modules/quiz/types/question.types';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';

import styles from '../css/quiz.module.css'; // Importing CSS Module

type ShortAnswerQuestionProps = {
	questionId: number;
	type: QuestionType;
	difficulty: DifficultyLevel;
	order: number;
	question: string;
	correctAnswer: string;
	points: number;
};

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
	questionId,
	type = QuestionType.ShortAnswer,
	difficulty,
	order,
	question,
	correctAnswer,
	points,
}) => {
	const [userAnswer, setUserAnswer] = useState<string>("");
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const { registerQuestion, updateQuestionStatus, resetFlag } =
		usePageContext();

	const numericQuestionId = Number(questionId); // Ensure questionId is a number

	// Register the question with the page context when the component mounts
	useEffect(() => {
		if (
			!Number.isNaN(numericQuestionId) &&
			difficulty &&
			order !== undefined &&
			!Number.isNaN(points)
		) {
			registerQuestion({
				id: numericQuestionId,
				type,
				order,
				points: Number(points),
				difficulty,
				status: QuestionStatus.NotStarted,
				correct: false,
			});
		}
	}, [numericQuestionId, type, order, points, difficulty, registerQuestion]);

	// Reset userAnswer and isCorrect when resetFlag toggles
	useEffect(() => {
		setUserAnswer("");
		setIsCorrect(null);
	}, [resetFlag]);

	// Handle user's answer submission
	const handleAnswer = () => {
		const isAnswerCorrect =
			userAnswer.trim().toLowerCase() ===
			correctAnswer.trim().toLowerCase();
		setIsCorrect(isAnswerCorrect);

		updateQuestionStatus(numericQuestionId, {
			status: QuestionStatus.Complete,
			correct: isAnswerCorrect,
		});
	};

	return (
		<div className={styles["question-container"]}>
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
				{question}
			</ReactMarkdown>
			<div className={styles["input-container"]}>
				<TextField
					id="user-answer"
					type="text"
					value={userAnswer}
					onChange={(e) => setUserAnswer(e.target.value)}
					className={styles["short-answer-input"]}
					variant="outlined"
					size="small"
					label="Your Answer"
					autoComplete="off"
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleAnswer(); // Call the submit function when Enter is pressed
						}
					}}
				/>
				<Button
					id="user-submit"
					type="button"
					onClick={handleAnswer}
					variant="contained"
					sx={{
						height: "39px",
						marginLeft: "1px",
						fontSize: "1.5rem",
						borderRadius: "3px",
						":hover": {},
					}}
				>
					{<MdCheck />}
				</Button>
			</div>
			{isCorrect !== null && (
				<p
					className={`${styles["question-feedback"]} ${
						isCorrect ? styles.correct : styles.incorrect
					}`}
				>
					{isCorrect ? "Correct!" : "Incorrect. Try again!"}
				</p>
			)}
		</div>
	);
};

export default ShortAnswerQuestion;
