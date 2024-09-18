// src/redux/slices/authSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

// Initial state
const initialState = {
	isAuthenticated: false,
	user: null,
	error: null,
};

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
				"http://localhost:8000/api/users/me",
				{
					headers: {
						Authorization: `Token ${key}`,
					},
				},
			);
			console.log("User profile fetched:", userProfile.data); // Log profile data
			return { token: key, user: userProfile.data };
		} catch (error) {
			console.error("Login failed:", error.response.data); // Log error
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			const cookies = new Cookies();
			cookies.remove("token");
			state.isAuthenticated = false;
			state.user = null;
		},
		// New reducer to directly set user state
		setUser: (state, action: PayloadAction<any>) => {
			state.isAuthenticated = true;
			state.user = action.payload;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.user = null;
				state.error = action.payload;
			});
	},
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
