// web/src/modules/quiz/components/SubmitButton.tsx

import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';
import { updatePageProgress } from '@site/src/redux/slices/userProgressSlice';
import { saveUserProgress } from '@site/src/redux/thunks/userProgressThunk';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch';

import type React from "react";

const SubmitButton: React.FC = () => {
	// Destructure values from PageContext, including canSubmit
	const { pageId, questions, difficulty, points, canSubmit } =
		usePageContext();

	// Log the values received from the PageContext
	console.log("SubmitButton - pageId:", pageId);
	console.log("SubmitButton - difficulty:", difficulty);
	console.log("SubmitButton - points:", points);
	console.log("SubmitButton - questions:", questions);
	console.log("SubmitButton - canSubmit:", canSubmit);

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

		dispatch(saveUserProgress());
	};

	return (
		<Button
			type="button"
			color="primary"
			variant="contained"
			endIcon={<SendIcon />}
			onClick={handleSubmit}
			disabled={!canSubmit} // Disable the button if canSubmit is false
			sx={{ mt: 2, mr: 2 }}
		>
			SUBMIT
		</Button>
	);
};

export default SubmitButton;
