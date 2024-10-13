// web/src/redux/slices/pageContextSlice.ts
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from "@reduxjs/toolkit";
import type { PageData } from "@site/src/modules/quiz/types/page.types";

interface PageContextState {
	activePage?: PageData;
	lastAccessed?: string; // Store timestamp of last access
}

const initialState: PageContextState = {};

// Create the slice
const pageContextSlice = createSlice({
	name: "pageContext",
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<PageData>) => {
			state.activePage = action.payload;
			state.lastAccessed = new Date().toISOString();

			console.log("pageContextSlice: Set active page:", state);

			// Write to localStorage for persistence
			localStorage.setItem(
				"activePage",
				JSON.stringify(state.activePage),
			);
			localStorage.setItem("lastAccessed", state.lastAccessed);
		},
		clearCurrentPage: (state) => {
			state.activePage = undefined;
			state.lastAccessed = undefined;

			console.log("pageContextSlice: Cleared active page data.");
			localStorage.removeItem("activePage");
			localStorage.removeItem("lastAccessed");
		},
	},
});

export const { setCurrentPage, clearCurrentPage } = pageContextSlice.actions;
export default pageContextSlice.reducer;
