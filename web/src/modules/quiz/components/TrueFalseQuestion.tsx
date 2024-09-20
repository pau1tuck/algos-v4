//web/src/modules/quiz/components/TrueFalseQuestion.tsx
import type React from "react";
import { useState, useEffect } from "react";
import styles from "@site/src/modules/quiz/css/quiz.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { QuestionStatus, QuestionType } from "@site/src/modules/quiz/types/question.types";
import type { DifficultyLevel } from "@site/src/modules/quiz/types/question.types";

type TrueFalseQuestionProps = {
	questionId: number; // Dynamic question ID passed as a prop
	type: QuestionType;
	difficulty: DifficultyLevel;
	order: number; // Dynamic order of the question
	question: string;
	correctAnswer: boolean;
	pointValue: number; // Points associated with the question
};

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
	questionId,
	question,
	type = QuestionType.TrueFalse,
	difficulty,
	correctAnswer,
	order,
	pointValue,
}) => {
	const [userAnswer, setUserAnswer] = useState<boolean | null>(null); // Tracks user's answer
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Tracks correctness of the answer

	const { registerQuestion, updateQuestionStatus, resetFlag } = usePageContext(); // Added resetFlag from context

	// Register the question with the page context when the component mounts
	useEffect(() => {
		console.log("Registering question with ID:", questionId);
		registerQuestion({
			id: Number(questionId), // Unique ID for the question
			type,
			order,
			value: Number(pointValue), // Points for the question
			difficulty,
			status: QuestionStatus.NotStarted, // Initially not started
			correct: false, // Initially marked as incorrect
		});
	}, [questionId, type, order, pointValue, difficulty, registerQuestion]);

	// Reset userAnswer and isCorrect when resetFlag toggles
	useEffect(() => {
		console.log("Resetting TrueFalseQuestion state due to resetFlag");
		setUserAnswer(null);
		setIsCorrect(null);
	}, [resetFlag]);

	// Handle answer submission
	const handleAnswer = (answer: boolean) => {
		setUserAnswer(answer);
		const isAnswerCorrect = answer === correctAnswer;
		setIsCorrect(isAnswerCorrect);

		console.log("Answer submitted:", answer);
		console.log("Is answer correct?", isAnswerCorrect);

		// Update the question status in the PageContext
		updateQuestionStatus(Number(questionId), {
			status: QuestionStatus.Complete, // Mark the question as completed
			correct: isAnswerCorrect, // Whether the answer is correct
		});
	};

	// Determine if buttons should be locked (disabled) after an answer is selected
	const isLocked = userAnswer !== null;

	return (
		<div className={styles["question-container"]}>
			{/* Render the question text with Markdown */}
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

			<div className={styles["true-false-options"]}>
				{/* True button */}
				<button
					type="button"
					onClick={() => handleAnswer(true)}
					disabled={isLocked} // Disable after selecting an answer
					className={`${styles["true-false-option"]} ${userAnswer === true
						? isCorrect
							? styles.correct
							: styles.incorrect
						: ""
						}`}
				>
					True
				</button>

				{/* False button */}
				<button
					type="button"
					onClick={() => handleAnswer(false)}
					disabled={isLocked} // Disable after selecting an answer
					className={`${styles["true-false-option"]} ${userAnswer === false
						? isCorrect
							? styles.correct
							: styles.incorrect
						: ""
						}`}
				>
					False
				</button>
			</div>
		</div>
	);
};

export default TrueFalseQuestion;