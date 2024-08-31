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
        incrementCorrectAnswers: (state) => {
            state.correctAnswers += 1;
        },
        resetCorrectAnswers: (state) => {
            state.correctAnswers = 0;
        },
    },
});

export const { incrementCorrectAnswers, resetCorrectAnswers } =
    quizSlice.actions;
export default quizSlice.reducer;
