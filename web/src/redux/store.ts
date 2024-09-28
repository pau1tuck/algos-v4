// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userProgressReducer from "@site/src/redux/slices/userProgressSlice";
import authReducer from "@site/src/redux/slices/authSlice"; // Import auth slice

const store = configureStore({
	reducer: {
		userProgress: userProgressReducer, // User progress
		auth: authReducer, // Add auth slice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
