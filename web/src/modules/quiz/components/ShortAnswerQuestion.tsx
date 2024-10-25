// web/src/modules/quiz/components/ShortAnswerQuestion.tsx

import { useEffect, useState } from 'react';
import { BsFillQuestionSquareFill } from 'react-icons/bs';
import { MdCheck, MdClose } from 'react-icons/md'; // React Icon for the send button
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Box, Button, TextField } from '@mui/material'; // Material UI components
import styles from '@site/src/modules/quiz/css/quiz.module.css'; // Importing CSS Module
import { QuestionStatus, QuestionType } from '@site/src/modules/quiz/types/question.types';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';

type ShortAnswerQuestionProps = {
	questionId: number;
	type: QuestionType;
	difficulty: number;
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
			userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
		setIsCorrect(isAnswerCorrect);

		updateQuestionStatus(numericQuestionId, {
			status: QuestionStatus.Complete,
			correct: isAnswerCorrect,
		});
	};

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
				{`${questionId}.&nbsp;&nbsp;${question}`}
			</ReactMarkdown>
			<div className={styles["input-container"]}>
				<TextField
					id="user-answer"
					type="text"
					value={userAnswer}
					onChange={(e) => setUserAnswer(e.target.value)}
					variant="outlined"
					size="small"
					label="Your Answer"
					InputProps={{
						readOnly: isCorrect !== null, // Make input read-only once an answer is submitted
					}}
					InputLabelProps={{
						shrink: isCorrect !== null ? true : undefined, // Keep label in place after submission
					}}
					autoComplete="off"
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleAnswer(); // Call the submit function when Enter is pressed
						}
					}}
					sx={{
						"& .MuiOutlinedInput-input": {
							color: isCorrect !== null ? "#808080" : "default", // Grey text when isCorrect is not null
						},
						"& .MuiOutlinedInput-root": {
							"& fieldset": {
								borderWidth: "2px",
								borderColor:
									isCorrect === true
										? "#4caf50" // Green for correct
										: isCorrect === false
											? "#f44336" // Red for incorrect
											: "default", // Default for when isCorrect is null
							},
							"&:hover": { borderColor: "#808080" },
							"&:hover fieldset": {
								borderColor:
									isCorrect === true
										? "#4caf50" // Green for correct
										: isCorrect === false
											? "#f44336" // Red for incorrect
											: "", // Default on hover
							},
							"&.Mui-focused fieldset": {
								borderColor:
									isCorrect === true
										? "#4caf50" // Green when focused for correct
										: isCorrect === false
											? "#f44336" // Red when focused for incorrect
											: "default", // Default when focused
							},
						},
						backgroundColor:
							isCorrect === true
								? "#e8f5e9" // Light green for correct
								: isCorrect === false
									? "#ffebee" // Light red for incorrect
									: "ffffff", // Default background when isCorrect is null
					}}
				/>
				{isCorrect === null && (
					<Button
						id="user-submit"
						type="button"
						onClick={handleAnswer}
						variant="contained"
						sx={{
							height: "39px",
							padding: "5px",
							marginLeft: "1px",
							fontSize: "1.7rem",
							borderRadius: "3px",
							backgroundColor: "primary.main",
							color: "white",
							":hover": {
								backgroundColor: "primary.dark",
							},
						}}
					>
						<MdCheck />
					</Button>
				)}
			</div>
		</div>
	);
};

export default ShortAnswerQuestion;
