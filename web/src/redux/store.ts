// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@site/src/redux/slices/authSlice';
import pageContextReducer from '@site/src/redux/slices/pageContextSlice'; // Import the new slice
import userProgressReducer from '@site/src/redux/slices/userProgressSlice';

const store = configureStore({
	reducer: {
		userProgress: userProgressReducer,
		auth: authReducer,
		pageContext: pageContextReducer, // Add pageContext slice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
