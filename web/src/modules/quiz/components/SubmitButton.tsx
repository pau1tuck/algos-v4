//web/src/modules/quiz/components/SubmitButton.tsx
import React from "react";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";
import { saveUserProgress } from "@site/src/redux/thunks/userProgressThunk";
import { useAppDispatch } from "@site/src/redux/store"; // Custom hook
import { useSelector } from "react-redux";
import { RootState } from "@site/src/redux/store";

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

	return <button onClick={handleSubmit}>Submit</button>;
};

export default SubmitButton;