// src/redux/slices/userProgressSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserProgressState, PageProgress } from "@site/src/redux/types";
import { fetchUserProgress, saveUserProgress } from "@site/src/redux/thunks/userProgressThunk";

const initialState: UserProgressState = {
    pages: [],
    totalScore: 0,
    xp: 0,
    points: 0,
    health: 100,
    skill: "novice",
    profession: "default",
    rank: "beginner",
};

const userProgressSlice = createSlice({
    name: "userProgress",
    initialState,
    reducers: {
        updatePageProgress: (state, action: PayloadAction<PageProgress>) => {
            const existingPage = state.pages.find(
                (page) => page.page_id === action.payload.page_id,
            );

            if (existingPage) {
                // Update the existing page's progress
                Object.assign(existingPage, action.payload);
                console.log("Updated existing page progress:", existingPage);
            } else {
                // Add new page progress
                state.pages.push(action.payload);
                console.log("Added new page progress:", action.payload);
            }

            // Recalculate total score
            state.totalScore = state.pages.reduce(
                (total, page) => total + page.score,
                0,
            );
            console.log("Recalculated total score:", state.totalScore);

            // Example XP and points calculation
            state.xp += action.payload.score; // Adding page score to XP
            state.points += action.payload.score; // Adding page score to points
        },

        updateUserHealth: (state, action: PayloadAction<number>) => {
            state.health += action.payload;
            console.log("Updated user health:", state.health);
        },

        updateSkillLevel: (state, action: PayloadAction<string>) => {
            state.skill = action.payload;
            console.log("Updated skill level:", state.skill);
        },

        // Remove resetUserProgress here
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProgress.fulfilled, (state, action) => {
                console.log("Fetched user progress:", action.payload);
                return { ...state, ...action.payload };
            })
            .addCase(saveUserProgress.fulfilled, (state) => {
                console.log("User progress saved successfully:", state);
            });
    },
});

export const {
    updatePageProgress,
    updateUserHealth,
    updateSkillLevel,
} = userProgressSlice.actions;
export default userProgressSlice.reducer;