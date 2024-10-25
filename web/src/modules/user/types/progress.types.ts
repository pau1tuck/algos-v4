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
	userId: number;
	trackId: number;
	completedAt: string; // ISO timestamp of completion
}

// Main interface for tracking the user's progress
export interface UserProgress {
	userId: number;
	trackId: number;
	points: number; // Calculated by the backend
	xp: number; // Calculated by the backend
	health: number; // Calculated by the backend
	questionsCompleted: number[];
	pagesCompleted: { [key: number]: PageCompletion }; // hashmap
	challengesCompleted: number[]; // Optional
	currentPage?: number; // Tracks the last accessed page
	lastCompleted: string; // Timestamp of the last progress update
	level: Level; // Fetched from the backend
	grade: Grade; // Fetched from the backend
	rank: Rank; // Fetched from the backend
}
