//web/src/modules/user/types/user.type.ts
import type { PageProgress } from "@site/src/modules/quiz/types/page.types";
export interface UserData {
	first_name: string;
	last_name: string;
	email: string;
}

export enum UserRole {
	Admin = "admin",
	Guest = "guest",
	Member = "member",
	Subscriber = "subscriber",
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
