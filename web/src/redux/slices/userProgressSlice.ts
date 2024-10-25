// web/src/redux/slices/userProgressSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProgress } from '@site/src/redux/thunks/userProgressThunk';
import { initialState } from '@site/src/redux/utils/userProgressState';

import type { PayloadAction } from "@reduxjs/toolkit";
import type { PageProgress } from "@site/src/modules/quiz/types/page.types";

const userProgressSlice = createSlice({
	name: "userProgress",
	initialState,
	reducers: {
		updatePageProgress: (state, action: PayloadAction<PageProgress>) => {
			const { pageId, score } = action.payload;
			const userId = state.userId;
			const trackId = state.trackId;

			console.log(
				"updatePageProgress: Received action.payload:",
				action.payload,
			);

			// Check if the pageId already exists in the pagesCompleted hashmap
			if (state.pagesCompleted[pageId]) {
				console.warn(
					`Page ID ${pageId} already completed by user ${userId}. No further action taken.`,
				);
				// Early return to prevent further processing and saveUserProgress call
				return;
			}

			// Insert or update the pageId entry in the pagesCompleted hashmap without completedAt
			state.pagesCompleted[pageId] = {
				userId, // Associate with the current userId
				trackId, // Associate with the current trackId
				// completedAt is handled by the backend, so we remove it here
			};

			// Update the total points by adding the score (points) from this page
			state.points += score;

			// Log the updated state
			console.log("updatePageProgress: Updated state:", {
				pagesCompleted: state.pagesCompleted,
				points: state.points,
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserProgress.fulfilled, (state, action) => {
			// Initialize state with fetched user progress data
			state.level = action.payload.level;
			state.grade = action.payload.grade;
			state.rank = action.payload.rank;
			state.pagesCompleted = action.payload.pagesCompleted; // Fetch existing pagesCompleted
			state.points = action.payload.points; // Initialize points from fetched data
			console.log(
				"Fetched user progress with points:",
				action.payload.points,
			);
		});
	},
});

export const { updatePageProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
