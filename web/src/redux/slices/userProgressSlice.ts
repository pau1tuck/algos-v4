// src/redux/slices/userProgressSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserProgressState } from "@site/src/modules/user/types/user.type";
import { PageProgress } from "@site/src/modules/quiz/types/page.types"; // Import from page.types.ts
import {
	fetchUserProgress,
	saveUserProgress,
} from "../thunks/userProgressThunk";

/*
Properties to Serialize for Gameplay:

	1.	user_id: The ID of the currently authenticated user (can also be pulled from the session).
	2.	track_id: The current learning track the user is following (e.g., JavaScript, Node.js).
	3.	current_page_id: The ID of the page the user just completed or submitted.
	4.	pages_completed: The list of all page IDs the user has completed (may be added to with current_page_id).
	5.	questions_completed: The list of question IDs the user has completed in this session.
	6.	challenges_completed: The list of challenge IDs the user has completed in this session.
	7.	points_earned: The points earned for the current page, challenge, or quiz.
	8.	xp_earned: The calculated XP gained for completing the current activity.
	9.	health_change: Any change in health (e.g., deductions for incorrect answers, health bonuses).
	10.	progress_timestamp: The timestamp of when this progress was submitted (useful for progress tracking).
	11.	total_xp: The updated total XP (after this submission).
	12.	rank_update: The user’s new rank, if their rank has changed.
	13.	grade_update: The user’s new grade, if their grade has changed.
	14.	level_update: The user’s new level, if the submission completed necessary pages for a level.
	15.	last_completed_timestamp: The time when the last completed page or challenge occurred (this could be set to now).
	16.	current_health: The user’s updated health after submission.
	17.	total_points: The user’s updated point total (after adding new points from this submission).
	18.	progress_status: Status message or flags (e.g., “completed”, “in-progress”) indicating how the current submission affects overall course progress.
*/

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
