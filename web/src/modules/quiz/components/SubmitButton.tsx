// src/modules/quiz/components/SubmitButton.jsx
import React from "react";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";
import { saveUserProgress } from "@site/src/redux/thunks/userProgressThunk";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "@site/src/redux/store";
import type { RootState } from "@site/src/redux/store";
import useAuthState from "@site/src/modules/auth/utils/useAuthState";
import { useSelector } from "react-redux";

const SubmitButton = () => {
	const { page_id, questions, calculatePageScore } = usePageContext();
	const { isAuthenticated } = useAuthState();
	const history = useHistory();
	const dispatch = useAppDispatch(); // Use the custom hook here

	// Select the full user progress state
	const userProgress = useSelector((state: RootState) => state.userProgress);

	const handleSubmit = () => {
		if (!isAuthenticated) {
			history.push("/login"); // Redirect to login if not authenticated
			return;
		}

		const pageScore = calculatePageScore();
		const pageCompleted = questions.every((question) => question.correct);

		// Update Redux state with the page progress
		dispatch(
			updatePageProgress({
				page_id,
				completed: pageCompleted,
				score: pageScore,
				lastAccessed: new Date().toISOString(),
				questions,
			}),
		);

		// Save the updated progress to the backend
		dispatch(saveUserProgress(userProgress)); // Pass the full user progress state
	};

	return <button onClick={handleSubmit}>Submit</button>;
};

export default SubmitButton;