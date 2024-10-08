// web/src/modules/quiz/components/SubmitButton.tsx

import React from "react";
import { useSelector } from "react-redux";

import { QuestionStatus } from "@site/src/modules/quiz/types/question.types";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";
import { RootState } from "@site/src/redux/store";
import { saveUserProgress } from "@site/src/redux/thunks/userProgressThunk";
import { useAppDispatch } from "@site/src/redux/utils/useAppDispatch";

const SubmitButton: React.FC = () => {
	const { page_id, module, difficulty, points } = usePageContext(); // Points from PageContext
	const dispatch = useAppDispatch();

	// Get the current user progress from Redux
	const updatedUserProgress = useSelector(
		(state: RootState) => state.userProgress,
	);

	const handleSubmit = async () => {
		console.log("SubmitButton: Page points from PageInitializer:", points);

		// Dispatch updated page progress to Redux
		dispatch(
			updatePageProgress({
				page_id,
				module,
				difficulty,
				completed: QuestionStatus.Complete,
				questions: [],
				score: points, // Use the fixed points from PageInitializer
			}),
		);

		// Save user progress with the updated points
		const userProgressToSave = {
			...updatedUserProgress,
			points: updatedUserProgress.points + points, // Add new page points to the existing points
		};

		// Dispatch saveUserProgress after state has been updated
		dispatch(saveUserProgress(userProgressToSave));
	};

	return <button onClick={handleSubmit}>Submit</button>;
};

export default SubmitButton;
