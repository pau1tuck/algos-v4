// web/src/redux/thunks/userProgressData.ts

import type {
	UserProgress,
	Level,
	Grade,
	Rank,
} from "@site/src/modules/user/types/progress.types";

// Expanded dummy data for Level
export const dummyLevel: Level = {
	id: 1,
	title: "Junior Developer",
	slug: "junior-developer",
	description: "You are a junior developer, learning the ropes!",
	order: 1,
	image: "images/levels/junior-developer.png",
	thumbnail: "images/levels/junior-developer-thumb.png",
	icon: "👨‍💻",
	track: 1,
	pagesRequired: [1, 2, 3],
};

// Expanded dummy data for Grade
export const dummyGrade: Grade = {
	id: 1,
	title: "Blue Belt",
	slug: "blue-belt",
	description: "You have attained the Blue Belt of JavaScript mastery!",
	order: 1,
	image: "images/grades/blue-belt.png",
	thumbnail: "images/grades/blue-belt-thumb.png",
	icon: "🔵",
};

// Expanded dummy data for Rank
export const dummyRank: Rank = {
	id: 1,
	title: "Apprentice",
	slug: "apprentice",
	description: "You are an apprentice, on your way to mastery!",
	order: 1,
	image: "images/ranks/apprentice.png",
	thumbnail: "images/ranks/apprentice-thumb.png",
	icon: "🛠️",
	challengeThreshold: 5,
};

// Dummy data to simulate fetched user progress
export const dummyUserProgress: UserProgress = {
	userId: 1,
	trackId: 1, // JavaScript track
	points: 27,
	xp: 100, // XP value here
	health: 85,
	questionsCompleted: [7, 9],
	pagesCompleted: [4],
	challengesCompleted: [3],
	currentPage: 4,
	lastCompleted: null, // No last completed timestamp
	level: dummyLevel, // Adding expanded dummy level
	grade: dummyGrade, // Adding expanded dummy grade
	rank: dummyRank, // Adding expanded dummy rank
};
