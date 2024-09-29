// websrc/redux/thunks/userProgressThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from "@site/src/redux/store"; // Import RootState
import type { UserProgress } from "../slices/userProgressSlice";

// Dummy data to simulate fetched user progress
const dummyUserProgress: UserProgress = {
	userId: 1,
	trackId: 1, // JavaScript track
	points: 0, // Start with zero points
	health: 100, // Full health
	questionsCompleted: [], // Empty array
	pagesCompleted: [], // Empty array
	challengesCompleted: [], // Empty array
	currentPage: 0, // No pages completed yet
	lastCompleted: null, // No last completed timestamp
};

// Fetch user progress (dummy implementation)
export const fetchUserProgress = createAsyncThunk(
	"userProgress/fetchUserProgress",
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState() as RootState;
			const userId = state.auth.user?.id || 0;

			// Use userId in your dummy data
			const userProgress = {
				...dummyUserProgress,
				userId,
			};

			console.log("Fetching user progress (dummy data)...", userProgress);
			return userProgress;
		} catch (error) {
			// Handle error by rejecting with a value
			return rejectWithValue("Error fetching dummy user progress");
		}
	},
);
// Save user progress (dummy implementation)
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (userProgress: UserProgress, { rejectWithValue }) => {
		try {
			// Simulate saving user progress by logging to the console
			console.log("Saving user progress (dummy):", userProgress);
			return userProgress; // Return the same user progress
		} catch (error) {
			// Handle error by rejecting with a value
			return rejectWithValue("Error saving dummy user progress");
		}
	},
);
/* 
// Original backend call for fetching user progress
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

// Original backend call for saving user progress
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
*/
