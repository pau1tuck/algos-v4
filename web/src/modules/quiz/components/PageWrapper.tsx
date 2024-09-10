// src/modules/quiz/components/PageWrapper.tsx

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { QuestionStatus } from "@site/src/modules/quiz/utils/PageContext";
import { PageProvider } from "@site/src/modules/quiz/utils/PageProvider";
import { usePageContext } from "@site/src/modules/quiz/utils//usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";

interface PageWrapperProps {
    pageData: {
        page_id: number;
        title: string;
        section: string;
        module: string;
        topic: string;
        order: number;
        type: string;
        role: string;
        prerequisites: number[];
        difficulty: string;
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
    const { calculatePageScore, questions, completed } = usePageContext();
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
        dispatch(updatePageProgress(pageProgress));
    }, [questions, calculatePageScore, dispatch]);

    return <PageProvider pageData={pageData}>{children}</PageProvider>;
};

export default PageWrapper;
