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
export const saveUserProgress = createAsyncThunk(
	"userProgress/saveUserProgress",
	async (userProgress: UserProgressState) => {
		const cookies = new Cookies();
		const token = cookies.get("token");

		const response = await axios.post(
			"http://localhost:8000/api/gameplay/user-progress",
			userProgress,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			},
		);
		if (!response.ok) {
			throw new Error("Failed to save user progress");
		}
		return await response.data;
	},
);
