//web/src/redux/types.ts
export interface QuestionProgress {
	/* QuestionProgress is an interface or type used to represent the progress of individual questions within a page in your learning platform. It's meant to capture details about each question a user encounters, including its ID, status, whether it was answered correctly, and other relevant properties. This structure allows you to track and manage the user's interaction with each question. */
	id: number; // Question ID
	status: string; // Status: notStarted, inProgress, complete, correct, incorrect
	correct: boolean; // Whether the question was answered correctly
	value: number; // Points associated with the question
}

export interface PageProgress {
	page_id: number; // Unique ID for the page
	completed: boolean; // Whether the page is completed
	score: number; // The score the user achieved on this page
	difficulty: string; // Difficulty level of the page (Junior, Middle, Senior, etc.)
	lastAccessed: string; // Timestamp of when the page was last accessed
	module: string; // The module the page belongs to
	questions: QuestionProgress[]; // Array of questions for this page
}

export interface UserProgressState {
	pages: PageProgress[]; // Array of pages the user has progressed through
	totalScore: number; // Total score across all pages
	xp: number; // User's total XP
	points: number; // User's total points
	health: number; // User's current health status
	skill: string; // User's current skill level
	profession: string; // User's profession or specialization
	rank: string; // User's current rank
}
