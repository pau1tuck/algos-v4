// web/src/redux/slices/pageContextSlice.ts
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from "@reduxjs/toolkit";
import type { Page } from "@site/src/modules/quiz/types/page.types";

interface PageContextState {
	activePage?: Page;
	updatedAt?: string; // Changed to updatedAt for clarity
}

const initialState: PageContextState = {};

const pageContextSlice = createSlice({
	name: "pageContext",
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<Page>) => {
			state.activePage = action.payload;
			state.updatedAt = new Date().toISOString();

			console.log("pageContextSlice: Set active page:", state);

			localStorage.setItem(
				"activePage",
				JSON.stringify(state.activePage),
			);
			localStorage.setItem("updatedAt", state.updatedAt);
		},
		clearCurrentPage: (state) => {
			state.activePage = undefined;
			state.updatedAt = undefined;

			console.log("pageContextSlice: Cleared active page data.");
			localStorage.removeItem("activePage");
			localStorage.removeItem("updatedAt");
		},
	},
});

export const { setCurrentPage, clearCurrentPage } = pageContextSlice.actions;
export default pageContextSlice.reducer;
