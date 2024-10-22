// web/src/modules/quiz/components/SubmitButton.tsx

import React from 'react';
import { useSelector } from 'react-redux';

import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';
import { updatePageProgress } from '@site/src/redux/slices/userProgressSlice';
import { saveUserProgress } from '@site/src/redux/thunks/userProgressThunk';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch';

import type { RootState } from "@site/src/redux/store";

const SubmitButton: React.FC = () => {
	const { pageId, questions, difficulty, points } = usePageContext();

	// Log the values received from the PageContext
	console.log("SubmitButton - pageId:", pageId);
	console.log("SubmitButton - difficulty:", difficulty);
	console.log("SubmitButton - points:", points);
	console.log("SubmitButton - questions:", questions);

	const dispatch = useAppDispatch();
	const updatedUserProgress = useSelector(
		(state: RootState) => state.userProgress,
	);
	const [isPageUpdated, setIsPageUpdated] = React.useState(false);

	const handleSubmit = async () => {
		const score = points; // Use points directly from PageContext
		console.log("SubmitButton: Using score from pageData:", score);

		dispatch(
			updatePageProgress({
				pageId,
				difficulty,
				questions,
				score,
			}),
		);

		setIsPageUpdated(true);
	};

	React.useEffect(() => {
		if (isPageUpdated) {
			const userProgressToSave = {
				...updatedUserProgress,
				trackId: updatedUserProgress.trackId || 1,
			};
			dispatch(saveUserProgress(userProgressToSave));
			setIsPageUpdated(false);
		}
	}, [isPageUpdated, updatedUserProgress, dispatch]);

	return (
		<Button
			type="button"
			color="success" // Green color
			variant="outlined"
			endIcon={<SendIcon />} // Send icon
			onClick={handleSubmit}
			sx={{ mt: 2, mr: 2 }}
		>
			Submit
		</Button>
	);
};

export default SubmitButton;
