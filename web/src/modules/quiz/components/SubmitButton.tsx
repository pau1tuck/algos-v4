//web/src/modules/quiz/components/SubmitButton.tsx
import React from 'react';
import { useSelector } from 'react-redux'; // Use this instead of useAppSelector

import { QuestionStatus } from '@site/src/modules/quiz/types/question.types';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';
import { updatePageProgress } from '@site/src/redux/slices/userProgressSlice';
import { RootState } from '@site/src/redux/store'; // Import RootState for typing
import { saveUserProgress } from '@site/src/redux/thunks/userProgressThunk';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch';

const SubmitButton: React.FC = () => {
	const { page_id, questions, module, difficulty } = usePageContext();
	const dispatch = useAppDispatch();

	// Ensure the Redux state is selected properly using useSelector
	const updatedUserProgress = useSelector(
		(state: RootState) => state.userProgress,
	);

	// Check if all questions are correct to consider the page completed
	const pageCompleted = questions.every((question) => question.correct);

	const handleSubmit = async () => {
		if (!pageCompleted) return; // Prevent submission if the page is incomplete

		// Dispatch updated page progress to Redux
		dispatch(
			updatePageProgress({
				page_id,
				module,
				difficulty,
				completed: QuestionStatus.Complete,
				questions, // Pass only the questions and necessary fields
				// Removed lastAccessed field as it's handled by the backend
			}),
		);

		// Create a new object, do not modify the original state
		const userProgressToSave = {
			...updatedUserProgress, // Copy all properties
			trackId: updatedUserProgress.trackId || 1, // Ensure trackId is present
		};

		// Dispatch saveUserProgress after state has been updated
		dispatch(saveUserProgress(userProgressToSave));
	};

	return (
		<button onClick={handleSubmit} disabled={!pageCompleted}>
			Submit
		</button>
	);
};

export default SubmitButton;
