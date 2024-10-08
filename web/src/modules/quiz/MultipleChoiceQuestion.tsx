import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import {
	DifficultyLevel,
	QuestionStatus,
	QuestionType,
} from "@site/src/modules/quiz/types/question.types";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";

import styles from "./css/quiz.module.css"; // Importing CSS Module

type MultipleChoiceQuestionProps = {
	questionId: number;
	type: QuestionType;
	difficulty: DifficultyLevel;
	order: number;
	question: string;
	options: string[];
	correctAnswer: number;
	points: number;
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
	questionId,
	type = QuestionType.MultipleChoice,
	difficulty,
	order,
	question,
	options,
	correctAnswer,
	points,
}) => {
	const [userAnswerIndex, setUserAnswerIndex] = useState<number | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const { registerQuestion, updateQuestionStatus, resetFlag } =
		usePageContext();

	const numericQuestionId = Number(questionId); // Ensure questionId is a number

	// Register the question with the page context when the component mounts
	useEffect(() => {
		if (
			!isNaN(numericQuestionId) &&
			difficulty &&
			order !== undefined &&
			!isNaN(points)
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

	// Reset userAnswerIndex and isCorrect when resetFlag toggles
	useEffect(() => {
		setUserAnswerIndex(null);
		setIsCorrect(null);
	}, [resetFlag]);

	// Handle user's answer submission
	const handleAnswer = (index: number) => {
		setUserAnswerIndex(index);
		const isAnswerCorrect = index === correctAnswer;
		setIsCorrect(isAnswerCorrect);

		updateQuestionStatus(numericQuestionId, {
			status: QuestionStatus.Complete,
			correct: isAnswerCorrect,
		});
	};

	// Determine if options should be locked after an answer is selected
	const isLocked = userAnswerIndex !== null;

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
			{options.map((option, index) => (
				<div
					key={index}
					onClick={() => handleAnswer(index)}
					className={`${styles["question-option"]} ${
						userAnswerIndex === index
							? isCorrect
								? styles.correct
								: styles.incorrect
							: ""
					}`}
					role="button"
					tabIndex={0}
					onKeyPress={(e) => {
						if (e.key === "Enter" || e.key === " ")
							handleAnswer(index);
					}}
					aria-disabled={isLocked}
				>
					{option}
				</div>
			))}
		</div>
	);
};

export default MultipleChoiceQuestion;
