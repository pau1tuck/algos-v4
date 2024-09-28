// web/src/modules/quiz/components/SubmitButton.tsx
import React from "react";
import type { RootState } from "@site/src/redux/store";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";
import { saveUserProgress } from "@site/src/redux/thunks/userProgressThunk";
import { useAppDispatch } from "@site/src/redux/utils/useAppDispatch";
import { useSelector } from "react-redux";
import { QuestionStatus } from "@site/src/modules/quiz/types/question.types"; // Import QuestionStatus enum

const SubmitButton: React.FC = () => {
	// Access page data and questions via PageContext
	const { page_id, questions, calculatePageScore, module, difficulty } =
		usePageContext();
	const dispatch = useAppDispatch();
	const userProgress = useSelector((state: RootState) => state.userProgress);

	// Check if the page is complete (all questions answered correctly)
	const pageCompleted = questions.every((question) => question.correct);

	// Handle form submission
	const handleSubmit = () => {
		if (!pageCompleted) return; // Prevent submission if the page is incomplete

		// Calculate total points based on questions
		const pageScore = calculatePageScore();

		// Dispatch updated page progress to Redux
		dispatch(
			updatePageProgress({
				page_id,
				module,
				difficulty,
				completed: QuestionStatus.Complete, // Always set to complete if submitted
				score: pageScore, // Total points for the page
				lastAccessed: new Date().toISOString(),
				questions,
			}),
		);

		// Save updated progress to the backend
		dispatch(saveUserProgress(userProgress));
	};

	return (
		<button onClick={handleSubmit} disabled={!pageCompleted}>
			Submit
		</button>
	);
};

export default SubmitButton;
