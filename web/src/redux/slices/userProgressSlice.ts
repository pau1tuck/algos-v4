// src/redux/slices/userProgressSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserProgressState } from "@site/src/modules/user/types/user.type";
import { PageProgress } from "@site/src/modules/quiz/types/page.types"; // Import from page.types.ts
import {
	fetchUserProgress,
	saveUserProgress,
} from "../thunks/userProgressThunk";

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

const userProgressSlice = createSlice({
	name: "userProgress",
	initialState,
	reducers: {
		updatePageProgress: (state, action: PayloadAction<PageProgress>) => {
			const existingPage = state.pages.find(
				(page) => page.page_id === action.payload.page_id,
			);

			if (existingPage) {
				Object.assign(existingPage, action.payload);
			} else {
				state.pages.push(action.payload);
			}

			state.totalScore = state.pages.reduce(
				(total, page) => total + page.score,
				0,
			);

			state.xp += action.payload.score;
			state.points += action.payload.score;
		},
		// other reducers
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProgress.fulfilled, (state, action) => {
				return { ...state, ...action.payload };
			})
			.addCase(saveUserProgress.fulfilled, (state) => {
				console.log("User progress saved successfully:", state);
			});
	},
});

export const { updatePageProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
