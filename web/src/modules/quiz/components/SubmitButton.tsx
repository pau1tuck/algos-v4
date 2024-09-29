// web/src/modules/quiz/components/SubmitButton.tsx

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { QuestionStatus } from '@site/src/modules/quiz/types/question.types';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';
import { updatePageProgress } from '@site/src/redux/slices/userProgressSlice';
import { RootState } from '@site/src/redux/store';
import { saveUserProgress } from '@site/src/redux/thunks/userProgressThunk';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch';

const SubmitButton: React.FC = () => {
	const { page_id, questions, module, difficulty, calculatePageScore } =
		usePageContext();
	const dispatch = useAppDispatch();

	// Ensure the Redux state is selected properly using useSelector
	const updatedUserProgress = useSelector(
		(state: RootState) => state.userProgress,
	);

	const handleSubmit = async () => {
		const score = calculatePageScore();
		console.log("SubmitButton: Calculated score:", score);

		// Dispatch updated page progress to Redux
		dispatch(
			updatePageProgress({
				page_id,
				module,
				difficulty,
				completed: QuestionStatus.Complete,
				questions,
				score,
			}),
		);

		// Create a new object, do not modify the original state
		const userProgressToSave = {
			...updatedUserProgress,
			trackId: updatedUserProgress.trackId || 1,
		};

		// Dispatch saveUserProgress after state has been updated
		dispatch(saveUserProgress(userProgressToSave));
	};

	return <button onClick={handleSubmit}>Submit</button>;
};

export default SubmitButton;
