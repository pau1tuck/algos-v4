// src/modules/quiz/utils/PageContext.tsx
import { createContext } from "react";

export enum PageType {
	Challenge = "challenge",
	Presentation = "presentation",
	Quiz = "quiz",
}

export enum QuestionStatus {
	NotStarted = "notStarted",
	InProgress = "inProgress",
	Complete = "complete",
	Correct = "correct",
	Incorrect = "incorrect",
}

export enum UserRole {
	Admin = "admin",
	Guest = "guest",
	Member = "member",
	Subscriber = "subscriber",
}

export enum DifficultyLevel {
	Junior = "junior",
	Middle = "middle",
	Senior = "senior",
	Lead = "lead",
}

export interface QuestionStatusProps {
	id: number;
	value: number; // The potential score for this question
	status: QuestionStatus;
	correct: boolean /*
    difficulty: DifficultyLevel; // Difficulty of the question
    attempts: number; // Number of attempts made by the user
    timeSpent: number; // Time spent on this question in seconds
    hintsUsed: boolean; // Indicates if hints were used
    completionTime: Date | null; // When the question was completed */;
}

// Define the shape of the PageContext, making some fields optional
export interface PageContextProps {
	page_id: number;
	title: string;
	section: string;
	module: string;
	topic: string;
	order: number;
	type: PageType;
	role: UserRole;
	prerequisites?: number[]; // Optional
	difficulty?: DifficultyLevel; // Optional
	pageScore?: number; // Optional with a default value
	points?: number; // Optional with a default value
	estimatedTime?: string; // Optional with a default value
	completed?: QuestionStatus; // Optional with a default value
	tags?: string[]; // Optional
	relatedPages?: number[]; // Optional
	resources?: string[]; // Optional
	lastAccessed?: Date | null; // Optional
	learningObjectives?: string[]; // Optional
	coursePathProgress?: number; // Optional
	questions?: QuestionStatusProps[]; // Optional with a default value

	// Functions that modify the context
	registerQuestion: (question: QuestionStatusProps) => void;
	updateQuestionStatus: (
		id: number,
		status: Partial<QuestionStatusProps>,
	) => void;
	calculatePageScore: () => number;
	resetPage: () => void;
}

// Create the context
export const PageContext = createContext<PageContextProps | undefined>(
	undefined,
);
