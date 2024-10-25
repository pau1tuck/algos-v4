// web/src/redux/utils/userProgressState.ts

import type { UserProgress } from "@site/src/modules/user/types/progress.types";

// Initial state for user progress
export const initialState: UserProgress = {
	userId: 0,
	trackId: 0,
	points: 0,
	xp: 0,
	health: 100,
	questionsCompleted: [],
	pagesCompleted: {}, // Hashmap for pagesCompleted
	challengesCompleted: [],
	lastCompleted: new Date().toISOString(),
	level: {
		id: 0,
		title: "",
		slug: "",
		description: "",
		order: 0,
		image: "",
		thumbnail: "",
		icon: "",
		track: 0,
		pagesRequired: [],
	},
	grade: {
		id: 0,
		title: "",
		slug: "",
		description: "",
		order: 0,
		image: "",
		thumbnail: "",
		icon: "",
	},
	rank: {
		id: 0,
		title: "",
		slug: "",
		description: "",
		order: 0,
		image: "",
		thumbnail: "",
		icon: "",
		challengeThreshold: 0,
	},
};
