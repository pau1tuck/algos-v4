// src/redux/slices/userProgressSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface QuestionProgress {
	id: number;
	status: string;
	correct: boolean;
}

interface PageProgress {
	page_id: number;
	completed: boolean;
	score: number;
	lastAccessed: string; // ISO string
	questions: QuestionProgress[];
}

interface UserProgressState {
	pages: PageProgress[];
	totalScore: number;
}

const initialState: UserProgressState = {
	pages: [],
	totalScore: 0,
};

const userProgressSlice = createSlice({
	name: "userProgress",
	initialState,
	reducers: {
		// Action to update progress for a specific page
		updatePageProgress: (state, action: PayloadAction<PageProgress>) => {
			const existingPage = state.pages.find(
				(page) => page.page_id === action.payload.page_id,
			);

			if (existingPage) {
				// Update the existing page's progress
				Object.assign(existingPage, action.payload);
				console.log("Updated existing page progress:", existingPage);
			} else {
				// Add new page progress
				state.pages.push(action.payload);
				console.log("Added new page progress:", action.payload);
			}

			// Recalculate total score
			state.totalScore = state.pages.reduce(
				(total, page) => total + page.score,
				0,
			);
			console.log("Recalculated total score:", state.totalScore);
		},

		// Action to reset the progress for the whole course/module
		resetUserProgress: (state) => {
			state.pages = [];
			state.totalScore = 0;
			console.log("Reset user progress");
		},
	},
});

export const { updatePageProgress, resetUserProgress } =
	userProgressSlice.actions;
export default userProgressSlice.reducer;
