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
			const { pageId, points } = action.payload;

			console.log(
				"updatePageProgress: Received action.payload:",
				action.payload,
			);

			// If the page is already completed, skip updating
			if (state.pagesCompleted[pageId]) {
				console.warn(
					`Page ID ${pageId} already completed. No further action taken.`,
				);
				return;
			}

			// We're only saving points, not updating the total score on the frontend
			state.pagesCompleted[pageId] = {
				completedAt: new Date().toISOString(),
			};

			// Log the updated state
			console.log("updatePageProgress: Updated state (points only):", {
				pagesCompleted: state.pagesCompleted,
				points, // Page-specific points
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserProgress.fulfilled, (state, action) => {
			// Initialize state with fetched user progress data from the backend
			state.userId = action.payload.userId;
			state.trackId = action.payload.trackId;
			state.score = action.payload.score; // Total score is fetched from the backend
			state.xp = action.payload.xp;
			state.health = action.payload.health;
			state.questionsCompleted = action.payload.questionsCompleted;
			state.challengesCompleted = action.payload.challengesCompleted;
			state.currentPage = action.payload.currentPage;
			state.lastCompleted = action.payload.lastCompleted;
			state.level = action.payload.level;
			state.grade = action.payload.grade;
			state.rank = action.payload.rank;

			// Assign pagesCompleted directly since it's now a hashmap
			state.pagesCompleted = action.payload.pagesCompleted;

			// Log the fetched score from the backend
			console.log(
				"Fetched user progress with score:",
				action.payload.score,
			);
		});
	},
});

export const { updatePageProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
