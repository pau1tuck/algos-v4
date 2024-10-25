// web/src/modules/quiz/components/ResetButton.tsx

import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { Button } from '@mui/material';
import { usePageContext } from '@site/src/modules/quiz/utils/usePageContext';

import type React from "react";

const ResetButton: React.FC = () => {
	const { resetPage } = usePageContext();

	return (
		<Button
			type="button"
			color="error"
			variant="outlined"
			startIcon={<RestartAltRoundedIcon />}
			onClick={resetPage}
			sx={{ mt: 2, mr: 2 }} // Add some margin for better spacing
		>
			TRY AGAIN
		</Button>
	);
};

export default ResetButton;
