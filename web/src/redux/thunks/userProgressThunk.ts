// web/src/redux/thunks/userProgressThunk.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { dummyUserProgress } from "@site/src/redux/thunks/userProgressData";

import type { UserProgress } from "@site/src/modules/user/types/progress.types";

// Fetch user progress (dummy implementation)
export const fetchUserProgress = createAsyncThunk(
	"userProgress/fetchUserProgress",
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState() as any; // Adjust as necessary
			const userId = state.auth.user?.id || 0;

			// Use userId in your dummy data
			const userProgress = {
				...dummyUserProgress,
				userId,
			};

			console.log("Fetching user progress (dummy data)...", userProgress);
			return userProgress;
		} catch (error) {
			return rejectWithValue("Error fetching dummy user progress");
		}
	},
);

// Save user progress (simplified to just log the data)
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (userProgress: UserProgress, { rejectWithValue }) => {
		try {
			// Simulate saving user progress by logging it
			console.log("Logging user progress to be saved:", userProgress);
			return userProgress; // Return the same user progress for now
		} catch (error) {
			console.log("Error saving user progress:", error);
			return rejectWithValue("Error saving dummy user progress");
		}
	},
);
