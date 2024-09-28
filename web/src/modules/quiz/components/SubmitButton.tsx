// web/src/modules/quiz/components/SubmitButton.tsx
import type React from "react";
import type { RootState } from "@site/src/redux/store";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";
import { saveUserProgress } from "@site/src/redux/thunks/userProgressThunk";
import { useAppDispatch } from "@site/src/redux/store"; // Custom hook
import { useSelector } from "react-redux";

const SubmitButton: React.FC = () => {
	// Access page data and questions via PageContext
	const { page_id, questions, calculatePageScore, module, difficulty } =
		usePageContext();
	const dispatch = useAppDispatch();
	const userProgress = useSelector((state: RootState) => state.userProgress);

	// Handle form submission
	const handleSubmit = () => {
		// Calculate total points based on questions
		const pageScore = calculatePageScore(); // Summing up points from questions
		const pageCompleted = questions.every((question) => question.correct);

		// Dispatch updated page progress to Redux
		dispatch(
			updatePageProgress({
				page_id,
				module,
				difficulty,
				completed: pageCompleted,
				score: pageScore, // Total points for the page
				lastAccessed: new Date().toISOString(),
				questions,
			}),
		);

		// Save updated progress to the backend
		dispatch(saveUserProgress(userProgress));
	};

	return <button onClick={handleSubmit}>Submit</button>;
};

export default SubmitButton;
