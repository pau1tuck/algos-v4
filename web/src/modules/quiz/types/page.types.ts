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

export interface Page {
	pageId: number;
	title: string;
	section: string;
	module: string;
	topic: string;
	order: number;
	type: PageType;
	requiresAuth: boolean;
	roles: UserRole[];
	prerequisites: number[];
	difficulty: DifficultyLevel;
	points: number; // Points earned for the entire page
	tags?: string[];
	lastAccessed?: Date | null; // Make lastAccessed optional here
	questions?: QuestionProps[]; // Stores question data related to the page
	coursePathProgress: number; // Required progress tracking for user course
	trackId: number; // Add trackId to associate the page with a specific track
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
	roles: UserRole[];
	prerequisites: number[];
	difficulty: DifficultyLevel;
	points: number; // Points earned for the entire page
	tags?: string[];
	lastAccessed?: Date | null; // Make lastAccessed optional here
	questions?: QuestionProps[]; // Stores question data related to the page
	coursePathProgress: number; // Required progress tracking for user course
	trackId: number; // Add trackId to associate the page with a specific track
}

// Extend Page for Challenge-specific pages
export interface ChallengePage extends Page {
	challengeID: number; // Only for Challenge pages
}

export interface PageProgress
	extends Pick<Page, "pageId" | "module" | "difficulty" | "questions"> {
	score?: number; // The calculated score for the page (based on questions)
	// Removed lastAccessed field as it's managed by the backend
}
