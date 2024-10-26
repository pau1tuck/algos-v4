// web/src/modules/quiz/types/progress.types.ts

export interface Grade {
	id: number;
	title: string;
	slug: string;
	description: string;
	order: number;
	image: string;
	thumbnail: string;
	icon: string;
}

export interface Rank {
	id: number;
	title: string;
	slug: string;
	description: string;
	order: number;
	image: string;
	thumbnail: string;
	icon: string;
	challengeThreshold: number;
}

export interface Level {
	id: number;
	title: string;
	slug: string;
	description: string;
	order: number;
	image: string;
	thumbnail: string;
	icon: string;
	track: number;
	pagesRequired: number[];
}

// Define the structure for each completed page in the hashmap
interface PageCompletion {
	completedAt?: string; // ISO timestamp of completion
}

// Main interface for tracking the user's progress
export interface UserProgress {
	userId: number;
	trackId: number;
	score: number; // Fetched from the backend (total score)
	points?: number; // Optional field, used when saving page-specific points
	xp: number; // Fetched from the backend
	health: number; // Fetched from the backend
	questionsCompleted: number[];
	pagesCompleted: { [key: number]: PageCompletion }; // Hashmap
	challengesCompleted: number[];
	currentPage?: number;
	lastCompleted: string; // ISO timestamp of the last progress update
	level: Level;
	grade: Grade;
	rank: Rank;
}

export type SaveUserProgress = Omit<UserProgress, "score" | "health">; // Utility type
