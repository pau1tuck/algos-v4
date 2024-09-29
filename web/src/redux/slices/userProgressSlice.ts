//web/src/redux/slices/userProgressSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { PageProgress } from '@site/src/modules/quiz/types/page.types'; // Import from quiz types

import { fetchUserProgress, saveUserProgress } from '../thunks/userProgressThunk';

import type { PayloadAction } from "@reduxjs/toolkit";
// Interfaces for Grade, Rank, Level, and UserProgress
export interface Grade {
	id: number;
	title: string;
}

export interface Rank {
	id: number;
	title: string;
}

export interface Level {
	id: number;
	title: string;
	track: number;
	order: number;
	pagesRequired: number[];
}

// Main interface for tracking the user's progress
export interface UserProgress {
	userId: number;
	trackId: number;
	points: number; // Will be calculated by the backend
	health: number; // Will be calculated by the backend
	questionsCompleted: number[];
	pagesCompleted: number[];
	challengesCompleted: number[]; // This can be optional
	currentPage: number; // Tracks the last accessed page
	lastCompleted: string; // Timestamp of the last progress update
}

// Initial state for user progress
const initialState: UserProgress = {
	userId: 0, // Placeholder until the user is fetched
	trackId: 0, // Placeholder for the learning track
	points: 0, // Will be handled by backend
	health: 100, // Will be handled by backend
	questionsCompleted: [],
	pagesCompleted: [],
	challengesCompleted: [],
	currentPage: 0,
	lastCompleted: new Date().toISOString(),
};

// Redux slice to manage user progress
const userProgressSlice = createSlice({
	name: "userProgress",
	initialState,
	reducers: {
		// Updates the state when a page is completed
		updatePageProgress: (state, action: PayloadAction<PageProgress>) => {
			const { page_id, score, questions } = action.payload;

			// Add page to pagesCompleted if not already present
			if (!state.pagesCompleted.includes(page_id)) {
				state.pagesCompleted.push(page_id);
			}

			// Get completed questions and update the state
			const completedQuestions = questions
				.filter((question) => question.correct)
				.map((question) => question.id);

			// Add new completed questions to the list
			state.questionsCompleted = [
				...new Set([
					...state.questionsCompleted,
					...completedQuestions,
				]),
			];

			// Track the current page
			state.currentPage = page_id;

			// Add the score (points from page and questions) to the total points
			state.points += score; // Increment the points with the score from the page
		},

		// Optionally update the state if a challenge is completed
		updateChallengesCompleted: (state, action: PayloadAction<number>) => {
			const challengeId = action.payload;

			// If the challenge isn't already in the completed list, add it
			if (!state.challengesCompleted.includes(challengeId)) {
				state.challengesCompleted.push(challengeId);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProgress.fulfilled, (state, action) => {
				// This is where the state is updated with real data from the backend
				return { ...state, ...action.payload };
			})
			.addCase(saveUserProgress.fulfilled, (state) => {
				// Action triggered when progress is saved successfully
				console.log("User progress saved successfully:", state);
			});
	},
});

// Export the actions and reducer
export const { updatePageProgress, updateChallengesCompleted } =
	userProgressSlice.actions;
export default userProgressSlice.reducer;
