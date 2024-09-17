// src/redux/slices/authSlice.ts
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
		thunkAPI,
	) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/users/login/",
				{ email, password },
			);
			const { key } = response.data;
			const cookies = new Cookies();
			cookies.set("token", key, {
				path: "/",
				secure: true,
				sameSite: "strict",
			});

			const userProfile = await axios.get(
				"http://localhost:8000/api/users/me",
				{
					headers: {
						Authorization: `Token ${key}`,
					},
				},
			);
			return { token: key, user: userProfile.data };
		} catch (error) {
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
