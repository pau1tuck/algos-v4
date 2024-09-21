//web/src/modules/quiz/utils/PageContext.tsx
import { createContext } from "react";
import type { QuestionProps } from "@site/src/modules/quiz/types/question.types";
import type { PageData } from "@site/src/modules/quiz/types/page.types";

export interface PageContextProps extends PageData {
	// Functions that modify the context
	registerQuestion: (question: QuestionProps) => void;
	updateQuestionStatus: (id: number, status: Partial<QuestionProps>) => void;
	calculatePageScore: () => number;
	resetPage: () => void;
}

// Create the context
export const PageContext = createContext<PageContextProps | undefined>(undefined);