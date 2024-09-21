//web/src/modules/quiz/components/TrueFalseQuestion.tsx
import React, { useState, useEffect } from "react";
import styles from "@site/src/modules/quiz/css/quiz.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { QuestionStatus, QuestionType } from "@site/src/modules/quiz/types/question.types";
import type { DifficultyLevel } from "@site/src/modules/quiz/types/question.types";

type TrueFalseQuestionProps = {
	questionId: number;
	type: QuestionType;
	difficulty: DifficultyLevel;
	order: number;
	question: string;
	correctAnswer: boolean;
	pointValue: number;
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

	const { registerQuestion, updateQuestionStatus, resetFlag } = usePageContext(); // Page context

	// Register the question with the page context when the component mounts
	useEffect(() => {
		registerQuestion({
			id: Number(questionId),
			type,
			order,
			value: Number(pointValue),
			difficulty,
			status: QuestionStatus.NotStarted,
			correct: false,
		});
	}, [questionId, type, order, pointValue, difficulty, registerQuestion]);

	// Reset userAnswer and isCorrect when resetFlag toggles
	useEffect(() => {
		setUserAnswer(null);
		setIsCorrect(null);
	}, [resetFlag, setUserAnswer, setIsCorrect]);

	// Handle user's answer submission (locally only)
	const handleAnswer = (answer: boolean) => {
		setUserAnswer(answer);
		const isAnswerCorrect = answer === correctAnswer;
		setIsCorrect(isAnswerCorrect);
	};

	// Determine if buttons should be locked (disabled) after an answer is selected
	const isLocked = userAnswer !== null;

	return (
		<div className={styles["question-container"]}>
			<ReactMarkdown
				components={{
					code({ node, inline, className, children, ...props }) { // TYPE: ReactMarkdown code arguments
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
					className={`${styles["true-false-option"]} ${userAnswer === true ? (isCorrect ? styles.correct : styles.incorrect) : ""
						}`}
				>
					True
				</button>

				{/* False button */}
				<button
					type="button"
					onClick={() => handleAnswer(false)}
					disabled={isLocked} // Disable after selecting an answer
					className={`${styles["true-false-option"]} ${userAnswer === false ? (isCorrect ? styles.correct : styles.incorrect) : ""
						}`}
				>
					False
				</button>
			</div>
		</div>
	);
};

export default TrueFalseQuestion;