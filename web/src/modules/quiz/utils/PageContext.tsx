// src/modules/quiz/utils/PageContext.tsx
import { createContext } from "react";

export enum PageType {
    Quiz = "quiz",
    Presentation = "presentation",
}

export enum QuestionStatus {
    NotStarted = "notStarted",
    InProgress = "inProgress",
    Correct = "correct",
    Incorrect = "incorrect",
}

export enum UserRole {
    Admin = "admin",
    Guest = "guest",
    Viewer = "viewer",
}

export enum DifficultyLevel {
    Junior = "junior",
    Middle = "middle",
    Senior = "senior",
    Principal = "principal",
}

export interface QuestionStatusProps {
    id: number;
    value: number;
    status: QuestionStatus;
    correct: boolean;
}

// Define the shape of the PageContext
export interface PageContextProps {
    page_id: number;
    title: string;
    section: string;
    module: string;
    topic: string;
    order: number;
    type: PageType;
    role: UserRole;
    prerequisites: number[];
    difficulty: DifficultyLevel;
    pageScore: number;
    points: number;
    estimatedTime: string;
    completed: QuestionStatus;
    tags: string[];
    relatedPages: number[];
    resources: string[];
    lastAccessed: Date | null;
    learningObjectives: string[];
    coursePathProgress: number;
    questions: QuestionStatusProps[];

    // Functions
    registerQuestion: (question: QuestionStatusProps) => void;
    updateQuestionStatus: (
        id: number,
        status: Partial<QuestionStatusProps>
    ) => void;
    calculatePageScore: () => number;
}

// Create the context (no state or logic here)
export const PageContext = createContext<PageContextProps | undefined>(
    undefined
);
