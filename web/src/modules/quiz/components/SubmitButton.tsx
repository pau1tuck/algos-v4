// web/src/modules/quiz/components/SubmitButton.tsx

import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';
import { updatePageProgress } from '@site/src/redux/slices/userProgressSlice';
import { saveUserProgress } from '@site/src/redux/thunks/userProgressThunk';
import { useAppDispatch } from '@site/src/redux/utils/useAppDispatch';

const SubmitButton: React.FC = () => {
	const { pageId, questions, difficulty, points, canSubmit } =
		usePageContext();
	const dispatch = useAppDispatch();

	const handleSubmit = async () => {
		// Guard clause: if canSubmit is false, prevent submission
		if (!canSubmit) {
			console.warn(
				"SubmitButton: Cannot submit, not all questions are correct.",
			);
			return;
		}

		// Log the points for debugging
		console.log("SubmitButton: Submitting page with points:", points);

		// Dispatch updatePageProgress with the correct points and pageId
		dispatch(
			updatePageProgress({
				pageId,
				difficulty,
				questions,
				points, // Send the page-specific points from PageContext
			}),
		);

		// Dispatch the action to save user progress
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
