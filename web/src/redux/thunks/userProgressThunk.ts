// web/src/redux/thunks/userProgressThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import type { UserProgress } from "../slices/userProgressSlice";

// Define the base URL for the backend API
const BASE_URL = "http://localhost:8000/api/gameplay";

// Fetch user progress from the backend
export const fetchUserProgress = createAsyncThunk(
	"userProgress/fetchUserProgress",
	async (_, { rejectWithValue }) => {
		try {
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
		} catch (error) {
			// Handle error by rejecting with a value
			return rejectWithValue(
				error.response?.data || "Error fetching user progress",
			);
		}
	},
);

// Save user progress to the backend
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (userProgress: UserProgress, { rejectWithValue }) => {
		try {
			const cookies = new Cookies();
			const token = cookies.get("token");

			// Prepare the data to be sent to the backend API
			const data = {
				pages_completed: userProgress.pagesCompleted, // Send completed pages
				questions_completed: userProgress.questionsCompleted, // Send completed questions
				challenges_completed: userProgress.challengesCompleted, // Send completed challenges
			};

			// Determine the userProgressId to target the correct resource for update
			const userProgressId = userProgress.userId;

			// Make a PUT request to update user progress
			const response = await axios.put(
				`${BASE_URL}/user-progress/${userProgressId}/`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`,
					},
				},
			);

			// Check for both 200 OK and 204 No Content (no body returned on successful update)
			if (![200, 204].includes(response.status)) {
				throw new Error("Failed to update user progress");
			}

			// Return the updated progress from the backend
			return response.data;
		} catch (error) {
			// Handle error by rejecting with a value
			return rejectWithValue(
				error.response?.data || "Error updating user progress",
			);
		}
	},
);
