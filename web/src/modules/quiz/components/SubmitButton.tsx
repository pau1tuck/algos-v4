//web/src/modules/quiz/components/SubmitButton.tsx
import type React from "react";
import type { RootState } from "@site/src/redux/store";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";
import { saveUserProgress } from "@site/src/redux/thunks/userProgressThunk";
import { useAppDispatch } from "@site/src/redux/store"; // Custom hook
import { useSelector } from "react-redux";

const SubmitButton: React.FC = () => {
	const { page_id, questions, calculatePageScore, module, difficulty } = usePageContext();
	const dispatch = useAppDispatch();
	const userProgress = useSelector((state: RootState) => state.userProgress);

	const handleSubmit = () => {
		const pageScore = calculatePageScore();
		const pageCompleted = questions.every((question) => question.correct);

		// Dispatch progress to Redux
		dispatch(updatePageProgress({
			page_id,
			module,
			difficulty,
			completed: pageCompleted,
			score: pageScore,
			lastAccessed: new Date().toISOString(),
			questions,
		}));

		// Save the updated progress to the backend
		dispatch(saveUserProgress(userProgress));
	};
	// TODO: Add logic to handle submission with missing questions etc.

	return <button onClick={handleSubmit}>Submit</button>;
};

export default SubmitButton;
// TODO: Create pull request for feature/pagecontext-only-submit branch