// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/quizSlice"; // Existing quiz slice
import userProgressReducer from "./slices/userProgressSlice"; // Import userProgress slice

const store = configureStore({
    reducer: {
        quiz: quizReducer, // Existing quiz logic
        userProgress: userProgressReducer, // User progress
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
