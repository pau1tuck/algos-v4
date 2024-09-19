// src/redux/slices/userProgressSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserProgressState, PageProgress } from "@site/src/redux/types";
import {
	fetchUserProgress,
	saveUserProgress,
} from "@site/src/redux/thunks/userProgressThunk";

// Initial state with additional properties for XP, points, health, etc.
const initialState: UserProgressState = {
	pages: [],
	totalScore: 0,
	xp: 0,
	points: 0,
	health: 100,
	skill: "novice",
	profession: "default",
	rank: "beginner",
};

// userProgressSlice with new actions and extra reducers for thunks
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
			} else {
				// Add new page progress
				state.pages.push(action.payload);
			}

			// Recalculate total score
			state.totalScore = state.pages.reduce(
				(total, page) => total + page.score,
				0,
			);

			// Example XP and points calculation
			state.xp += action.payload.score; // Adding page score to XP
			state.points += action.payload.score; // Adding page score to points
		},

		updateUserHealth: (state, action: PayloadAction<number>) => {
			state.health += action.payload;
		},

		updateSkillLevel: (state, action: PayloadAction<string>) => {
			state.skill = action.payload;
		},

		resetUserProgress: (state) => {
			state.pages = [];
			state.totalScore = 0;
			state.xp = 0;
			state.points = 0;
			state.health = 100;
			state.skill = "novice";
			state.rank = "beginner";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProgress.fulfilled, (state, action) => {
				// Populate the state with data fetched from the backend
				return { ...state, ...action.payload };
			})
			.addCase(saveUserProgress.fulfilled, (state) => {
				console.log("User progress saved successfully:", state);
			});
	},
});

export const {
	updatePageProgress,
	resetUserProgress,
	updateUserHealth,
	updateSkillLevel,
} = userProgressSlice.actions;
export default userProgressSlice.reducer;
