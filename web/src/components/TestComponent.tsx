// TestComponent.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementCorrectAnswers } from "@site/src/redux/slices/quizSlice"; // Adjust path
import { RootState } from "@site/src/redux/store"; // Adjust path

const TestComponent: React.FC = () => {
    const dispatch = useDispatch();
    const correctAnswers = useSelector(
        (state: RootState) => state.quiz.correctAnswers
    );

    return (
        <div>
            <p>Correct Answers: {correctAnswers}</p>
            <button onClick={() => dispatch(incrementCorrectAnswers())}>
                Answer Correctly
            </button>
        </div>
    );
};

export default TestComponent;
