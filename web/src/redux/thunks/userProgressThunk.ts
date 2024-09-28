//web/src/redux/thunks/userProgressThunk.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import type { UserProgress } from "../slices/userProgressSlice"; // Import the UserProgress interface

// Define the base URL for the backend API
const BASE_URL = "http://localhost:8000/api/gameplay";

// Fetch user progress from the backend
export const fetchUserProgress = createAsyncThunk(
	"userProgress/fetchUserProgress",
	async () => {
		const cookies = new Cookies();
		const token = cookies.get("token");

		// Make a GET request to the backend API to fetch user progress
		const response = await axios.get(`${BASE_URL}/user-progress`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		if (response.status !== 200) {
			throw new Error("Failed to fetch user progress");
		}

		// Return the user progress data from the backend
		return response.data;
	},
);

// Save user progress to the backend
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (userProgress: UserProgress) => {
		const cookies = new Cookies();
		const token = cookies.get("token");

		// Prepare the data to be sent to the backend API
		const data = {
			xp: userProgress.points, // Send total points as XP (this can be changed based on the backend)
			points: userProgress.points, // Send total points to the backend
			health: userProgress.health, // Send health to the backend
			completed_pages: userProgress.pagesCompleted, // Send the list of completed page IDs
			completed_questions: userProgress.questionsCompleted.map(
				(questionId) => ({
					question_id: questionId,
					correct: true, // Assuming all questions in this array are correct
				}),
			), // Send the completed questions
			current_page: userProgress.currentPage, // Send the current page ID
			challenges_completed: userProgress.challengesCompleted, // Send the list of completed challenges
			last_completed: userProgress.lastCompleted, // Send the last completed timestamp
		};

		// Make a POST request to save user progress
		const response = await axios.post(`${BASE_URL}/user-progress`, data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});

		if (response.status !== 200) {
			throw new Error("Failed to save user progress");
		}

		// Return the updated progress from the backend
		return response.data;
	},
);
