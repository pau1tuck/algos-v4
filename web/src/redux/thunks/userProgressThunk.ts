// web/src/redux/thunks/userProgressThunk.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { dummyUserProgress } from '@site/src/redux/thunks/userProgressData';

import type {
	SaveUserProgress,
	UserProgress,
} from "@site/src/modules/user/types/progress.types";

// Fetch user progress (dummy implementation)
export const fetchUserProgress = createAsyncThunk(
	"userProgress/fetchUserProgress",
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState() as any;
			const userId = state.auth.user?.pk || 0;
			const trackId = 1;

			console.log("User ID (pk):", userId);

			// Simulate fetching data from the backend
			const userProgress: UserProgress = {
				...dummyUserProgress,
				userId,
				trackId,
				// pagesCompleted is already in the expected format from the backend (hashmap)
			};

			console.log("Fetching user progress (dummy data)...", userProgress);
			return userProgress;
		} catch (error) {
			console.log("Error fetching user progress:", error);
			return rejectWithValue("Error fetching user progress");
		}
	},
);

// Prepare only the necessary fields for saving user progress
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState() as any;
			const userProgress: SaveUserProgress = state.userProgress;

			// Prepare the data to be saved
			const progressToSave = {
				// Include only the fields that the backend expects and allows to be updated.
				trackId: userProgress.trackId,
				points: userProgress.points, // Send page-specific points if provided
				questionsCompleted: userProgress.questionsCompleted,
				pagesCompleted: Object.keys(userProgress.pagesCompleted).reduce(
					(acc, pageId) => {
						acc[pageId] = {}; // Empty object since we don't send `completedAt`
						return acc;
					},
					{} as { [key: number]: {} }, // Empty objects serve as placeholders. Only the key (pageId) is read by the serializer.
				),
				challengesCompleted: userProgress.challengesCompleted,
				currentPage: userProgress.currentPage,
				lastCompleted: userProgress.lastCompleted,
			};

			// Simulate saving user progress by logging it
			console.log(
				"Logging the prepared user progress to be saved:",
				progressToSave,
			);

			// Here you would make the actual API call to save the data
			// For example:
			// const response = await api.saveUserProgress(progressToSave);
			// return response.data;

			// For now, we just return the progressToSave object
			return progressToSave;
		} catch (error) {
			console.log("Error saving user progress:", error);
			return rejectWithValue("Error saving user progress");
		}
	},
);
