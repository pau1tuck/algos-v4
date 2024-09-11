// src/modules/quiz/components/PageWrapper.tsx

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    QuestionStatus,
    PageType,
    UserRole,
    DifficultyLevel,
} from "@site/src/modules/quiz/utils/PageContext"; // Import DifficultyLevel and other enums
import { PageProvider } from "@site/src/modules/quiz/utils/PageProvider";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";

interface PageWrapperProps {
    pageData: {
        page_id: number;
        title: string;
        section: string;
        module: string;
        topic: string;
        order: number;
        type: string; // Still a string here but will be mapped to enum
        role: string; // Still a string here but will be mapped to enum
        prerequisites: number[];
        difficulty: string; // Still a string here but will be mapped to enum
        pageScore: number;
        points: number;
        estimatedTime: string;
        tags: string[];
        relatedPages: number[];
        resources: string[];
        learningObjectives: string[];
    };
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ pageData, children }) => {
    const { calculatePageScore, questions } = usePageContext();
    const dispatch = useDispatch();

    useEffect(() => {
        const pageProgress = {
            page_id: pageData.page_id,
            completed: questions.every(
                q =>
                    q.status === QuestionStatus.Correct ||
                    q.status === QuestionStatus.Incorrect
            ),
            score: calculatePageScore(),
            lastAccessed: new Date().toISOString(),
            questions: questions.map(q => ({
                id: q.id,
                status: q.status,
                correct: q.correct,
            })),
        };

        // Dispatch to the Redux store to update global user progress
        console.log("Dispatching page progress to Redux:", pageProgress);
        dispatch(updatePageProgress(pageProgress));
    }, [questions, calculatePageScore, dispatch]);

    return (
        <PageProvider
            pageData={{
                ...pageData,
                type: pageData.type as PageType, // Cast `type` to enum
                role: pageData.role as UserRole, // Cast `role` to enum
                difficulty: pageData.difficulty as DifficultyLevel, // Cast `difficulty` to enum
            }}
        >
            {children}
        </PageProvider>
    );
};

export default PageWrapper;
