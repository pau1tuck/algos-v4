// web/src/redux/slices/pageContextSlice.ts
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from "@reduxjs/toolkit";

import type { PageData } from "@site/src/modules/quiz/types/page.types";

// Define the initial state with optional page data
interface PageContextState {
	currentPage?: PageData;
}

const initialState: PageContextState = {};

// Create the slice
const pageContextSlice = createSlice({
	name: "pageContext",
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<PageData>) => {
			state.currentPage = action.payload;
			console.log(
				"pageContextSlice: Set current page data:",
				action.payload,
			);
		},
		clearCurrentPage: (state) => {
			state.currentPage = undefined;
			console.log("pageContextSlice: Cleared current page data.");
		},
	},
});

export const { setCurrentPage, clearCurrentPage } = pageContextSlice.actions;
export default pageContextSlice.reducer;
