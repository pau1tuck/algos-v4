// web/src/modules/quiz/utils/usePageContext.ts

import { useContext } from 'react';

import { PageContext } from '@site/src/modules/quiz/utils/PageContext';

// Custom hook to access PageContext
export const usePageContext = () => {
	const context = useContext(PageContext);

	if (!context) {
		throw new Error("usePageContext must be used within a PageProvider");
	}

	return context;
};
