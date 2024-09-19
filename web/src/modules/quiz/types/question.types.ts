// web/src/modules/quiz/types/question.types.ts
export enum QuestionType {
	TrueFalse = "trueFalse",
	MultipleChoice = "multipleChoice",
	SingleAnswer = "singleAnswer",
	CodingChallenge = "codingChallenge",
}

export enum QuestionStatus {
	NotStarted = "notStarted",
	InProgress = "inProgress",
	Complete = "complete",
	Correct = "correct",
	Incorrect = "incorrect",
}

export enum DifficultyLevel {
	Junior = "junior",
	Middle = "middle",
	Senior = "senior",
	Lead = "lead",
}

export interface QuestionProps {
	id: number;
	type: QuestionType;
	order: number;
	value: number; // The potential score for this question
	status: QuestionStatus;
	correct: boolean;
	difficulty: DifficultyLevel;
	// attempts: number; // Number of attempts made by the user
	// timeSpent: number; // Time spent on this question in seconds
	// hintsUsed: boolean; // Indicates if hints were used
	// completionTime: Date | null; // When the question was completed */;
}

export interface QuestionProgress {
	/* QuestionProgress is an interface or type used to represent the progress of individual questions within a page in your learning platform. It's meant to capture details about each question a user encounters, including its ID, status, whether it was answered correctly, and other relevant properties. This structure allows you to track and manage the user's interaction with each question. */
	id: number; // Question ID
	status: string; // Status: notStarted, inProgress, complete, correct, incorrect
	correct: boolean; // Whether the question was answered correctly
	value: number; // Points associated with the question
	difficulty: DifficultyLevel;
}
