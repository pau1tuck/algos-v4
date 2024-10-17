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
	trackId: number; // Add trackId to associate the page with a specific track
	// Metadata
	type: PageType;
	course: string;
	module: string;
	section: string;
	title: string;
	topic?: string;
	description: string;
	tags?: string[];
	// Images
	image?: string;
	banner?: string;
	// Data
	order: number;
	coursePathProgress: number; // Required progress tracking for user course
	difficulty: DifficultyLevel;
	points: number; // Points earned for the entire page
	questions?: QuestionProps[]; // Stores question data related to the page
	// Access
	requiresAuth: boolean;
	roles: UserRole[];
	prerequisites: number[];
}

// Extend Page for Challenge-specific pages
export interface ChallengePage extends Page {
	challengeID: number; // Only for Challenge pages
}

export interface PageProgress
	extends Pick<Page, "pageId" | "difficulty" | "questions"> {
	score?: number; // The calculated score for the page (based on questions)
}
