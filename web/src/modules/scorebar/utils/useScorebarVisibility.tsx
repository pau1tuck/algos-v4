// src/modules/scorebar/utils/useScorebarVisibility.tsx
import { useLocation } from '@docusaurus/router';

import { HIDDEN_SCOREBAR_PAGES } from '../scorebarConfig';

export const useScorebarVisibility = () => {
	const location = useLocation();
	return !HIDDEN_SCOREBAR_PAGES.includes(location.pathname); // Return true if the page is allowed
};
