//web/src/modules/quiz/types/progress.types.ts
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
	points: number; // Will be calculated by the backend
	health: number; // Will be calculated by the backend
	// FIXME Where is XP?
	questionsCompleted: number[];
	pagesCompleted: number[];
	challengesCompleted: number[]; // This can be optional
	currentPage?: number; // Tracks the last accessed page
	lastCompleted: string; // Timestamp of the last progress update
}
