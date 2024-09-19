//web/src/redux/types.ts
export interface QuestionProgress {
	/* QuestionProgress is an interface or type used to represent the progress of individual questions within a page in your learning platform. It's meant to capture details about each question a user encounters, including its ID, status, whether it was answered correctly, and other relevant properties. This structure allows you to track and manage the user's interaction with each question. */
	id: number;
	status: string;
	correct: boolean;
}

export interface PageProgress {
	page_id: number;
	completed: boolean;
	score: number;
	lastAccessed: string; // ISO string
	questions: QuestionProgress[];
}

export interface UserProgressState {
	pages: PageProgress[];
	totalScore: number;
	xp: number; // Total XP earned by the user
	points: number; // Total points earned by the user
	health: number; // Current health status of the user
	skill: string; // User's current skill level
	profession: string; // User's selected profession or specialization
	rank: string; // User's rank/level
}
