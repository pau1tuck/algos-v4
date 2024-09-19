// redux/quizSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
    correctAnswers: number;
}

const initialState: QuizState = {
    correctAnswers: 0,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        incrementCorrectAnswers: state => {
            state.correctAnswers += 1;
            console.log(
                "Redux: Incremented correct answers to",
                state.correctAnswers
            );
        },
        resetCorrectAnswers: state => {
            state.correctAnswers = 0;
            console.log(
                "Redux: Reset correct answers to",
                state.correctAnswers
            );
        },
    },
});

export const { incrementCorrectAnswers, resetCorrectAnswers } =
    quizSlice.actions;
export default quizSlice.reducer;
