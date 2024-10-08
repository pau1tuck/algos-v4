// web/src/redux/slices/userProgressSlice.ts

import { createSlice } from "@reduxjs/toolkit";

import { saveUserProgress } from "../thunks/userProgressThunk";

import type { PageProgress } from "@site/src/modules/quiz/types/page.types";
import type { UserProgress } from "@site/src/modules/user/types/progress.types";
import type { PayloadAction } from "@reduxjs/toolkit";

// Initial state for user progress
const initialState: UserProgress = {
	userId: 0, // Placeholder until the user is fetched
	trackId: 0, // Placeholder for the learning track
	points: 0, // Will be handled by backend
	xp: 0, // Will be handled by backend
	health: 100, // Will be handled by backend
	questionsCompleted: [],
	pagesCompleted: [],
	challengesCompleted: [],
	lastCompleted: new Date().toISOString(),
};

const userProgressSlice = createSlice({
	name: "userProgress",
	initialState,
	reducers: {
		// Updates the state when a page is completed
		updatePageProgress: (state, action: PayloadAction<PageProgress>) => {
			const { page_id, score, questions } = action.payload;

			console.log(
				"updatePageProgress: Received action.payload:",
				action.payload,
			);

			// Simplified logging and basic state update for demo purposes
			state.pagesCompleted.push(page_id); // Log page_id for now
			state.questionsCompleted = questions.map((q) => Number(q.id)); // Log question IDs
			state.points += score;

			console.log("updatePageProgress: Updated state (simplified):", {
				pagesCompleted: state.pagesCompleted,
				questionsCompleted: state.questionsCompleted,
				points: state.points,
				xp: state.xp, // Added XP field to the log
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(saveUserProgress.fulfilled, (state, action) => {
			// Log the state including XP when the progress is saved
			console.log(
				"User progress would be saved here (logged):",
				action.payload,
			);
		});
	},
});

export const { updatePageProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
