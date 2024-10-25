// web/src/modules/quiz/components/SubmitButton.tsx

import type React from "react";
import { useSelector } from 'react-redux';

import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';
import { updatePageProgress } from '@site/src/redux/slices/userProgressSlice';
import { saveUserProgress } from '@site/src/redux/thunks/userProgressThunk';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch';

const SubmitButton: React.FC = () => {
	const { pageId, questions, difficulty, points } = usePageContext();

	// Log the values received from the PageContext
	console.log("SubmitButton - pageId:", pageId);
	console.log("SubmitButton - difficulty:", difficulty);
	console.log("SubmitButton - points:", points);
	console.log("SubmitButton - questions:", questions);

	const dispatch = useAppDispatch();

	const handleSubmit = async () => {
		const score = points; // Use points directly from PageContext
		console.log("SubmitButton: Using score from pageData:", score);

		// Dispatch updatePageProgress to update the Redux state
		dispatch(
			updatePageProgress({
				pageId,
				difficulty,
				questions,
				score,
			}),
		);

		// After updating the state, dispatch saveUserProgress to save the progress to the backend
		dispatch(saveUserProgress());
	};

	return (
		<Button
			type="button"
			color="success"
			variant="contained"
			endIcon={<SendIcon />} // Send icon
			onClick={handleSubmit}
			sx={{ mt: 2, mr: 2 }}
		>
			SUBMIT
		</Button>
	);
};

export default SubmitButton;
