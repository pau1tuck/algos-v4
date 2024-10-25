// web/src/redux/thunks/userProgressThunk.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { dummyUserProgress } from '@site/src/redux/thunks/userProgressData';

import type { UserProgress } from "@site/src/modules/user/types/progress.types";

// Fetch user progress (dummy implementation)
export const fetchUserProgress = createAsyncThunk(
	"userProgress/fetchUserProgress",
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState() as any;
			const userId = state.auth.user?.pk || 0;
			console.log("User ID (pk):", userId);

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
			const state = getState() as any;
			const userId = state.auth.user?.pk;

			// Prepare the data to be saved, excluding completedAt (handled by backend)
			const progressToSave = {
				userId: userId,
				trackId: userProgress.trackId,
				pagesCompleted: userProgress.pagesCompleted, // No completedAt here
				challengesCompleted: userProgress.challengesCompleted,
				health: userProgress.health,
				points: userProgress.points, // Save the updated points
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
