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
			sx={{
				top: 60,
				zIndex: 101,
				height: "40px",
				backgroundColor: "white",
				color: "black",
				fontWeight: 500,
				boxShadow: "none",
				borderBottom: "1px solid #DADDE2",
				// boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
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
						<EmojiEventsIcon
							fontSize="small"
							sx={{ color: "#FFCC6F" }}
						/>
						<Typography
							variant="body1"
							component="div"
							sx={{ ml: 1 }}
						>
							Score: {points}
						</Typography>
					</Box>

					<Box display="flex" alignItems="center">
						<FavoriteIcon fontSize="small" color="error" />
						<Box sx={{ ml: 1, width: 100 }}>
							<Typography variant="body1">
								Health: {health}
							</Typography>
						</Box>
					</Box>
					{/*<Tooltip title={`Health: ${xp}/100`}>
								<LinearProgress
									variant="determinate"
									value={(health / 100) * 100}
									color="success"
									sx={{ height: 10 }}
								/></Tooltip>*/}

					<Box display="flex" alignItems="center">
						<StarIcon fontSize="small" color="secondary" />
						<Box sx={{ ml: 1, width: 100 }}>
							<Typography variant="body1">
								XP: {xp} / 420
							</Typography>
						</Box>
					</Box>

					<Box display="flex" alignItems="center">
						<GradeIcon fontSize="small" color="warning" />
						<Typography
							variant="body1"
							component="div"
							sx={{ ml: 1 }}
						>
							{grade?.title}
						</Typography>
					</Box>

					<Box display="flex" alignItems="center">
						<EmojiEventsIcon fontSize="small" color="action" />
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
