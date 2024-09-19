// src/redux/slices/authSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { loginUser } from "@site/src/redux/thunks/authThunk";

// Initial state
const initialState = {
	isAuthenticated: false,
	user: null,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			const cookies = new Cookies();
			cookies.remove("token", { path: "/" }); // Ensure correct options
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
