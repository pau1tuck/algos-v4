import type { DifficultyLevel } from "@site/src/modules/quiz/types/question.types";
import type { QuestionProps } from "@site/src/modules/quiz/types/question.types";

//web/src/redux/types.ts

export interface PageProgress {
	page_id: number; // Unique ID for the page
	completed: boolean; // Whether the page is completed
	module: string; // The module the page belongs to
	score: number; // The score the user achieved on this page
	difficulty: DifficultyLevel; // Difficulty level of the page (Junior, Middle, Senior, etc.)
	lastAccessed: string; // Timestamp of when the page was last accessed
	questions: QuestionProps[]; // Array of questions for this page
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
