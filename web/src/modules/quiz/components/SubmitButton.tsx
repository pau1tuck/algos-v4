// web/src/modules/quiz/components/SubmitButton.tsx
import React from "react";
import { usePageContext } from "@site/src/modules/quiz/utils/usePageContext";
import { updatePageProgress } from "@site/src/redux/slices/userProgressSlice";
import { saveUserProgress } from "@site/src/redux/thunks/userProgressThunk";
import { useAppDispatch } from "@site/src/redux/utils/useAppDispatch";
import { QuestionStatus } from "@site/src/modules/quiz/types/question.types";

const SubmitButton: React.FC = () => {
	const { page_id, questions, module, difficulty } = usePageContext();
	const dispatch = useAppDispatch();

	const pageCompleted = questions.every((question) => question.correct);

	const handleSubmit = () => {
		if (!pageCompleted) return; // Prevent submission if the page is incomplete

		// Dispatch updated page progress to Redux
		dispatch(
			updatePageProgress({
				page_id,
				module,
				difficulty,
				completed: QuestionStatus.Complete,
				lastAccessed: new Date().toISOString(),
				questions,
			}),
		);

		// Ensure we retrieve the updated state using getState before dispatching saveUserProgress
		dispatch((dispatch, getState) => {
			const updatedUserProgress = getState().userProgress;
			updatedUserProgress.trackId = updatedUserProgress.trackId || 1; // Default the trackId to 1 if not provided
			dispatch(saveUserProgress(updatedUserProgress));
		});
	};

	return (
		<button onClick={handleSubmit} disabled={!pageCompleted}>
			Submit
		</button>
	);
};

export default SubmitButton;
