// web/src/modules/scorebar/components/Scorebar.tsx
import React from 'react';
import { useSelector } from 'react-redux';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GradeIcon from '@mui/icons-material/Grade';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StarIcon from '@mui/icons-material/Star';
import { AppBar, Box, LinearProgress, Toolbar, Tooltip, Typography } from '@mui/material';
import useAuthState from '@site/src/modules/auth/utils/useAuthState'; // Authentication hook

import { useScorebarVisibility } from '../utils/useScorebarVisibility'; // Visibility hook

import type { RootState } from "@site/src/redux/store";

const Scorebar = () => {
	const { points, health, xp, rank, grade } = useSelector(
		(state: RootState) => state.userProgress,
	);

	const { isAuthenticated } = useAuthState(true); // Authentication check
	const isVisible = useScorebarVisibility(); // Path-based visibility check

	// If the user is not authenticated or the Scorebar is hidden on this page, return null
	if (!isAuthenticated || !isVisible) return null;

	return (
		<AppBar
			position="fixed"
			color="default"
			sx={{ top: 60, zIndex: 99, height: "40px" }}
		>
			<Toolbar
				variant="dense"
				sx={{ minHeight: "40px", alignItems: "center" }}
			>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					width="100%"
				>
					<Box display="flex" alignItems="center">
						<PointOfSaleIcon color="primary" />
						<Typography
							variant="body1"
							component="div"
							sx={{ ml: 1 }}
						>
							Score: {points}
						</Typography>
					</Box>

					<Box display="flex" alignItems="center">
						<FavoriteIcon color="error" />
						<Typography
							variant="body1"
							component="div"
							sx={{ ml: 1 }}
						>
							Health: {health}
						</Typography>
					</Box>

					<Box display="flex" alignItems="center">
						<StarIcon color="secondary" />
						<Box sx={{ ml: 1, width: 100 }}>
							<Tooltip title={`XP: ${xp}/100`}>
								<LinearProgress
									variant="determinate"
									value={(xp / 100) * 100}
									sx={{ height: 10 }}
								/>
							</Tooltip>
							{/*<Typography variant="body2" sx={{ mt: 0.5 }}>
								XP: {xp}/100
							</Typography>*/}
						</Box>
					</Box>

					<Box display="flex" alignItems="center">
						<GradeIcon color="warning" />
						<Typography
							variant="body1"
							component="div"
							sx={{ ml: 1 }}
						>
							{grade?.title}
						</Typography>
					</Box>

					<Box display="flex" alignItems="center">
						<EmojiEventsIcon color="action" />
						<Typography
							variant="body1"
							component="div"
							sx={{ ml: 1 }}
						>
							{rank?.title}
						</Typography>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Scorebar;
