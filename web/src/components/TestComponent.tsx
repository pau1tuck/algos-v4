// src/components/TestComponent.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementCorrectAnswers as incrementReduxCorrectAnswers } from "@site/src/redux/slices/quizSlice"; // Adjust path
import { RootState } from "@site/src/redux/store"; // Adjust path
import { useQuizContext } from "@site/src/modules/quiz/utils/useQuizContext"; // Adjust path

const TestComponent: React.FC = () => {
    const dispatch = useDispatch();
    const reduxCorrectAnswers = useSelector(
        (state: RootState) => state.quiz.correctAnswers
    );

    const { correctAnswers: contextCorrectAnswers, incrementCorrectAnswers } =
        useQuizContext();

    return (
        <div>
            <h2>Redux State:</h2>
            <p>Correct Answers: {reduxCorrectAnswers}</p>
            <button onClick={() => dispatch(incrementReduxCorrectAnswers())}>
                Answer Correctly (Redux)
            </button>

            <h2>Context State:</h2>
            <p>Correct Answers: {contextCorrectAnswers}</p>
            <button onClick={incrementCorrectAnswers}>
                Answer Correctly (Context)
            </button>
            <button onClick={null}>Reset Correct Answers (Context)</button>
        </div>
    );
};

export default TestComponent;
