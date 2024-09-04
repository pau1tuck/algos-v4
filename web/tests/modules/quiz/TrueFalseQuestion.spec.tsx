// tests/modules/quiz/TrueFalseQuestion.spec.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TrueFalseQuestion from "@site/src/modules/quiz/TrueFalseQuestion";
import QuizProvider from "@site/src/modules/quiz/utils/QuizProvider";
import { useQuizContext } from "@site/src/modules/quiz/utils/useQuizContext";
import { QuestionStatus } from "@site/src/modules/quiz/types";

// Mock the useQuizContext hook
jest.mock("@site/src/modules/quiz/utils/useQuizContext", () => ({
    useQuizContext: jest.fn(),
}));

describe("TrueFalseQuestion", () => {
    const mockQuestion = "Is this a test question?";
    const mockCorrectAnswer = true;

    it("renders the question and answer buttons", () => {
        render(
            <QuizProvider>
                <TrueFalseQuestion
                    question={mockQuestion}
                    correctAnswer={mockCorrectAnswer}
                />
            </QuizProvider>
        );

        expect(screen.getByText(mockQuestion)).toBeInTheDocument();
        expect(screen.getByText("True")).toBeInTheDocument();
        expect(screen.getByText("False")).toBeInTheDocument();
    });

    it("handles correct answer", () => {
        const mockUpdateQuestionStatus = jest.fn();
        (useQuizContext as jest.Mock).mockReturnValue({
            registerQuestion: jest.fn(),
            updateQuestionStatus: mockUpdateQuestionStatus,
            incrementCorrectAnswers: jest.fn(),
        });

        render(
            <QuizProvider>
                <TrueFalseQuestion
                    question={mockQuestion}
                    correctAnswer={mockCorrectAnswer}
                />
            </QuizProvider>
        );

        fireEvent.click(screen.getByText("True"));

        expect(mockUpdateQuestionStatus).toHaveBeenCalledWith(
            expect.any(Number),
            QuestionStatus.Correct
        );
    });

    it("handles incorrect answer", () => {
        const mockUpdateQuestionStatus = jest.fn();
        (useQuizContext as jest.Mock).mockReturnValue({
            registerQuestion: jest.fn(),
            updateQuestionStatus: mockUpdateQuestionStatus,
            incrementCorrectAnswers: jest.fn(),
        });

        render(
            <QuizProvider>
                <TrueFalseQuestion
                    question={mockQuestion}
                    correctAnswer={mockCorrectAnswer}
                />
            </QuizProvider>
        );

        fireEvent.click(screen.getByText("False"));

        expect(mockUpdateQuestionStatus).toHaveBeenCalledWith(
            expect.any(Number),
            QuestionStatus.Incorrect
        );
    });
});
