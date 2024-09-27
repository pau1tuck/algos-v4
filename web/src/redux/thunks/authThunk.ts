// src/redux/thunks/authThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

// Async thunk for login
export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (
		{ email, password }: { email: string; password: string },
		// biome-ignore lint: style/useNamingConvention: Redux Toolkit requires this naming
		thunkAPI,
	) => {
		try {
			console.log("Attempting login with email:", email); // Log attempt
			const response = await axios.post(
				"http://localhost:8000/api/users/login/",
				{ email, password },
			);
			const { key } = response.data;
			console.log("Login successful, received token:", key); // Log success

			const cookies = new Cookies();
			cookies.set("token", key, {
				path: "/",
				secure: true,
				sameSite: "strict",
			});

			// Fetch user profile
			const userProfile = await axios.get(
				"http://localhost:8000/api/users/profile/",
				{
					headers: {
						Authorization: `Token ${key}`,
					},
				},
			);
			console.log(
				"User profile data added to Redux store:",
				userProfile.data,
			); // Log profile data
			return { token: key, user: userProfile.data };
		} catch (error) {
			console.error("Login failed:", error.response.data); // Log error
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);
