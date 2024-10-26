import React from 'react';
import { RiNumbersFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GradeIcon from '@mui/icons-material/Grade';
import StarIcon from '@mui/icons-material/Star';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import useAuthState from '@site/src/modules/auth/utils/useAuthState'; // Authentication hook

import { useScorebarVisibility } from '../utils/useScorebarVisibility'; // Visibility hook

import type { RootState } from "@site/src/redux/store";

const Scorebar = () => {
	// Destructure 'score' from the userProgress slice (retrieved from the backend)
	const { score, health, xp, rank, grade } = useSelector(
		(state: RootState) => state.userProgress,
	);

	const { isAuthenticated } = useAuthState(true); // Authentication check
	const isVisible = useScorebarVisibility(); // Path-based visibility check

	// If the user is not authenticated or the Scorebar is hidden on this page, return null
	if (!isAuthenticated || !isVisible) return null;

	return (
		<AppBar
			position="fixed"
			sx={{
				top: 60,
				zIndex: 101,
				height: "40px",
				backgroundColor: "white",
				color: "black",
				fontWeight: 500,
				boxShadow: "none",
				borderBottom: "1px solid #DADDE2",
			}}
		>
			<Toolbar
				variant="dense"
				sx={{
					minHeight: "40px",
					alignItems: "center",
				}}
			>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					width="100%"
				>
					<Box display="flex" alignItems="center">
						<RiNumbersFill fontSize="large" color="green" />
						<Typography variant="body1" component="div" sx={{ ml: 1 }}>
							Score: {score} {/* Updated to use 'score' */}
						</Typography>
					</Box>

					<Box display="flex" alignItems="center">
						<FavoriteIcon fontSize="small" color="error" />
						<Box sx={{ ml: 1, width: 100 }}>
							<Typography variant="body1">Health: {health}</Typography>
						</Box>
					</Box>

					<Box display="flex" alignItems="center">
						<StarIcon fontSize="small" color="secondary" />
						<Box sx={{ ml: 1, width: 100 }}>
							<Typography variant="body1">XP: {xp} / 420</Typography>
						</Box>
					</Box>

					<Box display="flex" alignItems="center">
						<GradeIcon fontSize="small" color="warning" />
						<Typography variant="body1" component="div" sx={{ ml: 1 }}>
							{grade?.title}
						</Typography>
					</Box>

					<Box display="flex" alignItems="center">
						<EmojiEventsIcon fontSize="small" color="action" />
						<Typography variant="body1" component="div" sx={{ ml: 1 }}>
							{rank?.title}
						</Typography>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Scorebar;
