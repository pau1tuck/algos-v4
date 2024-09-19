// src/redux/thunks/userProgressThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserProgressState } from "@site/src/redux/types";

// Fetch user progress (dummy implementation)
export const fetchUserProgress = createAsyncThunk(
	"userProgress/fetchUserProgress",
	async () => {
		const dummyProgress: UserProgressState = {
			pages: [
				{
					page_id: 1,
					completed: true,
					score: 20,
					lastAccessed: new Date().toISOString(),
					questions: [
						{ id: 1, status: "Complete", correct: true },
						{ id: 2, status: "Complete", correct: false },
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

		console.log(
			"Dummy fetchUserProgress called, returning dummy data:",
			dummyProgress,
		);

		return new Promise<UserProgressState>((resolve) => {
			setTimeout(() => {
				resolve(dummyProgress);
			}, 1000); // Simulate network delay
		});
	},
);

// Save user progress (dummy implementation)
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (userProgress: UserProgressState) => {
		console.log("Dummy saveUserProgress called with data:", userProgress);

		return new Promise<UserProgressState>((resolve) => {
			setTimeout(() => {
				resolve(userProgress);
			}, 1000); // Simulate network delay
		});
	},
);
