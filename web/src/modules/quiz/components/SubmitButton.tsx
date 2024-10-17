// web/src/modules/quiz/components/SubmitButton.tsx

import type React from "react";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';
import { updatePageProgress } from '@site/src/redux/slices/userProgressSlice';
import { saveUserProgress } from '@site/src/redux/thunks/userProgressThunk';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch';

import type { RootState } from "@site/src/redux/store";

const SubmitButton: React.FC = () => {
	const { pageId, questions, difficulty, calculatePageScore } =
		usePageContext();
	const dispatch = useAppDispatch();

	// Ensure the Redux state is selected properly using useSelector
	const updatedUserProgress = useSelector(
		(state: RootState) => state.userProgress,
	);
	const [isPageUpdated, setIsPageUpdated] = useState(false);

	const handleSubmit = async () => {
		const score = calculatePageScore();
		console.log("SubmitButton: Calculated score:", score);

		// Dispatch updated page progress to Redux
		dispatch(
			updatePageProgress({
				pageId,
				difficulty,
				questions,
				score,
			}),
		);

		// Set flag to true after dispatching the update
		setIsPageUpdated(true);
	};

	// useEffect to trigger saveUserProgress only after page progress has been updated
	useEffect(() => {
		if (isPageUpdated) {
			// Save user progress with the updated pagesCompleted array
			const userProgressToSave = {
				...updatedUserProgress, // Get the fully updated state (with the new pageId included)
				trackId: updatedUserProgress.trackId || 1,
			};

			// Dispatch saveUserProgress after state has been updated
			dispatch(saveUserProgress(userProgressToSave));

			// Reset flag after saving
			setIsPageUpdated(false);
		}
	}, [isPageUpdated, updatedUserProgress, dispatch]);

	return <button onClick={handleSubmit}>Submit</button>;
};

export default SubmitButton;
