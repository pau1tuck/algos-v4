// web/src/modules/quiz/utils/PageContext.tsx

import { createContext } from 'react';

import type { Page } from "@site/src/modules/quiz/types/page.types";
import type { QuestionProps } from "@site/src/modules/quiz/types/question.types";

export interface PageContextProps extends Page {
	resetFlag: boolean;
	// Functions that modify the context
	registerQuestion: (question: QuestionProps) => void;
	updateQuestionStatus: (id: number, status: Partial<QuestionProps>) => void;
	resetPage: () => void;
}

// Create the context
export const PageContext = createContext<PageContextProps | undefined>(
	undefined,
);
