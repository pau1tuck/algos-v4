//web/src/modules/quiz/utils/PageContext.tsx
import { createContext } from "react";
import type { QuestionProps, QuestionStatus } from "@site/src/modules/quiz/types/question.types";
import type { DifficultyLevel } from "@site/src/modules/quiz/types/question.types";
import type { UserRole } from "@site/src/modules/user/types/user.type";
import type { PageType } from "@site/src/modules/quiz/types/page.types";

export interface PageContextProps {
	page_id: number;
	title: string;
	section: string;
	module: string;
	topic: string;
	order: number;
	type: PageType;
	role: UserRole;
	prerequisites?: number[]; // Certain pages require completion of other pages
	difficulty: DifficultyLevel;
	pageScore?: number; // Optional with a default value
	points?: number; // Optional with a default value
	completed?: QuestionStatus; // Optional with a default value
	tags?: string[]; // Optional
	lastAccessed?: Date | null; // Optional
	coursePathProgress?: number; // Optional
	questions?: QuestionProps[]; // Optional with a default value
	resetFlag: boolean; // Add resetFlag to the context

	// Functions that modify the context
	registerQuestion: (question: QuestionProps) => void;
	updateQuestionStatus: (
		id: number,
		status: Partial<QuestionProps>,
	) => void;
	calculatePageScore: () => number;
	resetPage: () => void;
}

// Create the context
export const PageContext = createContext<PageContextProps | undefined>(
	undefined,
);