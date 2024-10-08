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
			const { page_id, score, questions } = action.payload;

			console.log(
				"updatePageProgress: Received action.payload:",
				action.payload,
			);

			state.pagesCompleted.push(page_id);
			state.questionsCompleted = questions.map((q) => Number(q.id));
			state.points += score;

			console.log("updatePageProgress: Updated state:", {
				pagesCompleted: state.pagesCompleted,
				questionsCompleted: state.questionsCompleted,
				points: state.points,
				xp: state.xp,
				level: state.level,
				grade: state.grade,
				rank: state.rank,
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProgress.fulfilled, (state, action) => {
				// Update state with fetched data
				state.level = action.payload.level;
				state.grade = action.payload.grade;
				state.rank = action.payload.rank;

				console.log(
					"Fetched user progress with level, grade, and rank:",
					{
						level: state.level,
						grade: state.grade,
						rank: state.rank,
					},
				);
			})
			.addCase(saveUserProgress.fulfilled, (state, action) => {
				console.log("User progress saved:", action.payload);
			});
	},
});

export const { updatePageProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
