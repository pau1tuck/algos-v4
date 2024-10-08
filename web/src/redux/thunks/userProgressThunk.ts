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
			const userId = state.auth.user?.pk || 0; // Get user ID from auth state using 'pk'
			console.log("User ID (pk):", userId);

			// Use userId in your dummy data
			const userProgress = {
				...dummyUserProgress,
				userId, // Ensure we are using the current user's ID
			};

			console.log("Fetching user progress (dummy data)...", userProgress);
			return userProgress;
		} catch (error) {
			return rejectWithValue("Error fetching dummy user progress");
		}
	},
);

// Prepare only the necessary fields for saving user progress
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (userProgress: UserProgress, { getState, rejectWithValue }) => {
		try {
			// Retrieve current user ID from the global auth state
			const state = getState() as any;
			const userId = state.auth.user?.pk; // Get the authenticated user's ID from 'pk'

			// Prepare the data to be saved, using the correct userId
			const progressToSave = {
				userId: userId, // Use the correct user ID from 'pk'
				trackId: userProgress.trackId,
				pagesCompleted: userProgress.pagesCompleted,
				challengesCompleted: userProgress.challengesCompleted,
				health: userProgress.health,
				// No need to include xp, points, level, grade, rank, lastCompleted, etc.
			};

			// Simulate saving user progress by logging it
			console.log(
				"Logging the prepared user progress to be saved:",
				progressToSave,
			);

			return progressToSave; // Return the prepared progress for now
		} catch (error) {
			console.log("Error saving user progress:", error);
			return rejectWithValue("Error saving dummy user progress");
		}
	},
);
