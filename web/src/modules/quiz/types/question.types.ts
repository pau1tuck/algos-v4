// web/src/modules/quiz/types/question.types.ts
export enum QuestionType {
	TrueFalse = "trueFalse",
	MultipleChoice = "multipleChoice",
	ShortAnswer = "shortAnswer",
	CodeChoice = "codeChoice",
	CodingChallenge = "codingChallenge",
}

export enum QuestionStatus {
	NotStarted = "notStarted",
	InProgress = "inProgress",
	Complete = "complete",
	Correct = "correct",
	Incorrect = "incorrect",
}
export interface QuestionProps {
	id: number;
	type: QuestionType;
	order: number;
	points: number; // The potential score for this question (renamed from value)
	status: QuestionStatus;
	correct: boolean;
	difficulty: number;
	// Optional: Additional properties like timeSpent, attempts, etc.
}

export interface QuestionProgress {
	id: number; // Question ID
	status: string; // Status: notStarted, inProgress, complete, correct, incorrect
	correct: boolean; // Whether the question was answered correctly
	points: number; // Points associated with the question (renamed from value)
	difficulty: number;
}
