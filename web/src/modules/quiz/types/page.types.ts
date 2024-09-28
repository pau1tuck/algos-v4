// web/src/modules/quiz/types/page.types.ts
import type { UserRole } from "@site/src/modules/user/types/user.type";
import type {
	DifficultyLevel,
	QuestionProps,
	QuestionStatus,
} from "./question.types";

export enum PageType {
	Challenge = "challenge",
	Presentation = "presentation",
	Quiz = "quiz",
}

export interface PageData {
	page_id: number;
	title: string;
	section: string;
	module: string;
	topic: string;
	order: number;
	type: PageType;
	requiresAuth: boolean;
	role: UserRole;
	prerequisites: number[];
	difficulty: DifficultyLevel;
	points: number; // Points earned for the entire page
	tags?: string[];
	lastAccessed: Date | null; // Tracks when the page was last accessed
	questions?: QuestionProps[]; // Stores question data related to the page
	resetFlag: boolean; // Signals whether the page has been reset
	completed: QuestionStatus; // Required to track if the page is completed
	coursePathProgress: number; // Required progress tracking for user course
}

// Extend PageData for Challenge-specific pages
export interface ChallengePageData extends PageData {
	challengeID: number; // Only for Challenge pages
}

export interface PageProgress {
	page_id: number;
	completed: QuestionStatus;
	module: string;
	score?: number; // The calculated score for the page (based on questions)
	difficulty: DifficultyLevel;
	lastAccessed: string;
	questions: QuestionProps[]; // Question progress and points
}
