// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "@site/src/redux/slices/quizSlice";
import userProgressReducer from "@site/src/redux/slices/userProgressSlice";
import authReducer from "@site/src/redux/slices/authSlice"; // Import auth slice
import { useDispatch } from "react-redux"; // Import useDispatch

const store = configureStore({
	reducer: {
		quiz: quizReducer, // Existing quiz logic
		userProgress: userProgressReducer, // User progress
		auth: authReducer, // Add auth slice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
