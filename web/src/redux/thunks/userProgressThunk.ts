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
			points: userProgress.points,
			health: userProgress.health,
			completed_pages: userProgress.pagesCompleted,
			completed_questions: userProgress.questionsCompleted,
			challenges_completed: userProgress.challengesCompleted,
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
