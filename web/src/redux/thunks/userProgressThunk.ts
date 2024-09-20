//web/src/redux/thunks/userProgressThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	DifficultyLevel,
	QuestionStatus,
	QuestionType,
} from "@site/src/modules/quiz/types/question.types";
import type { UserProgressState } from "@site/src/redux/types";

// Simulating in-memory storage for user progress (this will reset if the page is refreshed)
let inMemoryUserProgress: UserProgressState = {
	pages: [
		{
			page_id: 1,
			module: "Introduction",
			difficulty: DifficultyLevel.Middle,
			completed: true,
			score: 20,
			lastAccessed: new Date().toISOString(),
			questions: [
				{
					id: 1,
					type: QuestionType.TrueFalse,
					order: 1,
					status: QuestionStatus.Complete,
					correct: true,
					value: 5,
					difficulty: DifficultyLevel.Junior,
				},
				{
					id: 2,
					type: QuestionType.MultipleChoice,
					order: 2,
					status: QuestionStatus.Complete,
					correct: false,
					value: 9,
					difficulty: DifficultyLevel.Senior,
				},
			],
		},
	],
	totalScore: 20,
	xp: 50,
	points: 50,
	health: 100,
	skill: "novice",
	profession: "developer",
	rank: "beginner",
};

// Fetch user progress from memory (dummy implementation)
export const fetchUserProgress = createAsyncThunk(
	"userProgress/fetchUserProgress",
	async () => {
		console.log(
			"Dummy fetchUserProgress called, returning dummy data:",
			inMemoryUserProgress,
		);

		return new Promise<UserProgressState>((resolve) => {
			setTimeout(() => {
				resolve(inMemoryUserProgress);
			}, 1000); // Simulate network delay
		});
	},
);

// Save user progress to memory (dummy implementation)
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (userProgress: UserProgressState) => {
		// Simulate saving progress by updating the in-memory store
		inMemoryUserProgress = { ...userProgress };

		console.log(
			"Dummy saveUserProgress called with data:",
			inMemoryUserProgress,
		);

		return new Promise<UserProgressState>((resolve) => {
			setTimeout(() => {
				resolve(inMemoryUserProgress);
			}, 1000); // Simulate network delay
		});
	},
);
