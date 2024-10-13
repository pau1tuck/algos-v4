import type React from "react";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // Use GitHub theme

import styles from '../css/quiz.module.css'; // Importing CSS Module

type CodeChoiceQuestionProps = {
	questionId: number;
	question: string;
	options: string[];
	correctAnswer: number; // Index of the correct answer
	points: number;
	order: number;
};

const CodeChoiceQuestion: React.FC<CodeChoiceQuestionProps> = ({
	questionId,
	question,
	options,
	correctAnswer,
	points,
	order,
}) => {
	const [userAnswer, setUserAnswer] = useState<number | null>(null);
	const isLocked = userAnswer !== null;

	const handleOptionClick = (index: number) => {
		if (isLocked) return; // Prevent further clicks after selection
		setUserAnswer(index); // Set the selected option
	};

	return (
		<div className={styles["question-container"]}>
			<div className={styles["question-title"]}>{question}</div>
			<div className={styles["code-options-container"]}>
				{options.map((option, index) => (
					<div
						key={index}
						onClick={() => handleOptionClick(index)}
						className={`${styles["code-option"]} ${
							userAnswer !== null &&
							(index === correctAnswer
								? styles["correct"]
								: userAnswer === index
									? styles["incorrect"]
									: "")
						}`}
						role="button"
						tabIndex={0}
						onKeyPress={(e) => {
							if (e.key === "Enter" || e.key === " ")
								handleOptionClick(index);
						}}
						aria-disabled={isLocked}
					>
						<ReactMarkdown
							components={{
								code({
									node,
									inline,
									className,
									children,
									...props
								}) {
									const match = /language-(\w+)/.exec(
										className || "",
									);
									return !inline && match ? (
										<SyntaxHighlighter
											style={github} // Apply the GitHub theme
											language={match[1]}
											PreTag="div" // Avoid unnecessary nesting by using div
											{...props}
										>
											{String(children).replace(
												/\n$/,
												"",
											)}
										</SyntaxHighlighter>
									) : (
										<code className={className} {...props}>
											{children}
										</code>
									);
								},
							}}
						>
							{option}
						</ReactMarkdown>
					</div>
				))}
			</div>
		</div>
	);
};

export default CodeChoiceQuestion;
