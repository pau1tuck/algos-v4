// web/src/redux/slices/userProgressSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PageProgress } from "@site/src/modules/quiz/types/page.types";
import {
	fetchUserProgress,
	saveUserProgress,
} from "../thunks/userProgressThunk";

// Main interface for tracking the user's progress
export interface UserProgress {
	userId: number;
	trackId: number;
	points: number;
	health: number;
	questionsCompleted: number[];
	pagesCompleted: number[];
	challengesCompleted: number[];
	currentPage: number; // Keep this for display purposes, backend updates it
}

// Initial state for user progress
const initialState: UserProgress = {
	userId: 0,
	trackId: 1, // Default trackId to 1 (JavaScript track)
	points: 0,
	health: 100,
	questionsCompleted: [],
	pagesCompleted: [],
	challengesCompleted: [],
	currentPage: 0,
};

// Redux slice to manage user progress
const userProgressSlice = createSlice({
	name: "userProgress",
	initialState,
	reducers: {
		// Updates the state when a page is completed
		updatePageProgress: (state, action: PayloadAction<PageProgress>) => {
			const { page_id, questions } = action.payload;

			// Add page to pagesCompleted if not already present
			if (!state.pagesCompleted.includes(page_id)) {
				state.pagesCompleted.push(page_id);
			}

			// Get completed questions and update the state
			const completedQuestions = questions
				.filter((question) => question.correct)
				.map((question) => question.id);

			// Merge new completed questions into the existing list (avoiding duplicates)
			state.questionsCompleted = [
				...new Set([
					...state.questionsCompleted,
					...completedQuestions,
				]),
			];

			// The backend will now handle updating `currentPage` and `points`, so we remove that logic here
		},

		// Optionally update the state if a challenge is completed
		updateChallengesCompleted: (state, action: PayloadAction<number>) => {
			const challengeId = action.payload;

			// Add challenge to challengesCompleted if not already present
			if (!state.challengesCompleted.includes(challengeId)) {
				state.challengesCompleted.push(challengeId);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProgress.fulfilled, (state, action) => {
				// Update the state with data from the backend when user progress is fetched
				return { ...state, ...action.payload };
			})
			.addCase(saveUserProgress.fulfilled, (state) => {
				// Log success when progress is saved to the backend
				console.log("User progress saved successfully:", state);
			});
	},
});

export const { updatePageProgress, updateChallengesCompleted } =
	userProgressSlice.actions;
export default userProgressSlice.reducer;
