// web/src/redux/slices/userProgressSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@site/src/redux/utils/userProgressState";

import {
	fetchUserProgress,
	saveUserProgress,
} from "../thunks/userProgressThunk";

import type { PageProgress } from "@site/src/modules/quiz/types/page.types";
import type { PayloadAction } from "@reduxjs/toolkit";

const userProgressSlice = createSlice({
	name: "userProgress",
	initialState,
	reducers: {
		updatePageProgress: (state, action: PayloadAction<PageProgress>) => {
			const { page_id, score } = action.payload;

			console.log(
				"updatePageProgress: Received action.payload:",
				action.payload,
			);

			// Append the new page_id to the existing pagesCompleted array, ensuring no duplicates
			state.pagesCompleted = Array.from(
				new Set([...state.pagesCompleted, page_id]),
			);

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
