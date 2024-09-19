// src/redux/thunks/userProgressThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import type { UserProgressState } from "@site/src/redux/types";

// Fetch user progress from the backend
export const fetchUserProgress = createAsyncThunk(
	"userProgress/fetchUserProgress",
	async () => {
		const cookies = new Cookies();
		const token = cookies.get("token");

		const response = await axios.get(
			"http://localhost:8000/api/gameplay/user-progress",
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			},
		);
		if (!response.ok) {
			throw new Error("Failed to fetch user progress");
		}
		return await response.data;
	},
);

// Save user progress to the backend
// Save user progress to the backend
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (userProgress: UserProgressState) => {
		const cookies = new Cookies();
		const token = cookies.get("token");

		const response = await axios.post(
			"http://localhost:8000/api/gameplay/user-progress",
			{
				xp: userProgress.xp, // Send XP to the backend
				points: userProgress.points, // Send points
				health: userProgress.health, // Send health
				difficulty:
					userProgress.pages.length > 0
						? userProgress.pages[0].difficulty
						: null, // Example: Assuming difficulty is part of page data
				completed_pages: userProgress.pages.map((page) => page.page_id), // Sending the list of completed pages
				completed_questions: userProgress.pages.flatMap((page) =>
					page.questions.map((question) => ({
						question_id: question.id,
						correct: question.correct,
					})),
				), // Sending completed questions, flattened
				current_page:
					userProgress.pages.find((page) => !page.completed)
						?.page_id || null, // Sending the last uncompleted page, if any
				current_module:
					userProgress.pages.find((page) => !page.completed)
						?.module || null, // Sending the last uncompleted module
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${token}`, // Token for authentication
				},
			},
		);

		if (!response.status || response.status !== 200) {
			throw new Error("Failed to save user progress");
		}
		return response.data;
	},
);
