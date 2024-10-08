// web/src/modules/quiz/types/progress.types.ts

export interface Grade {
	id: number;
	title: string;
}

export interface Rank {
	id: number;
	title: string;
}

export interface Level {
	id: number;
	title: string;
	track: number;
	order: number;
	pagesRequired: number[];
}

// Main interface for tracking the user's progress
export interface UserProgress {
	userId: number;
	trackId: number;
	points: number; // Calculated by the backend
	xp: number; // XP, calculated by the backend
	health: number; // Calculated by the backend
	questionsCompleted: number[];
	pagesCompleted: number[];
	challengesCompleted: number[]; // Optional
	currentPage?: number; // Tracks the last accessed page
	lastCompleted: string; // Timestamp of the last progress update
}
