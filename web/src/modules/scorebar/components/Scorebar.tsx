// web/src/modules/scorebar/components/Scorebar.tsx

import React from "react";
import { useSelector } from "react-redux";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // Rank icon
import FavoriteIcon from "@mui/icons-material/Favorite"; // Health icon
import GradeIcon from "@mui/icons-material/Grade"; // Grade icon
import PointOfSaleIcon from "@mui/icons-material/PointOfSale"; // Points icon
import StarIcon from "@mui/icons-material/Star"; // XP icon
import {
	AppBar,
	Box,
	LinearProgress,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { RootState } from "@site/src/redux/store"; // RootState type from your store setup

const Scorebar = () => {
	// Retrieve the user's progress and rank details from Redux
	const { points, health, xp, rank, grade } = useSelector(
		(state: RootState) => state.userProgress,
	);

	return (
		<AppBar
			position="static"
			color="default"
			sx={{ top: 64, zIndex: 1100 }}
		>
			<Toolbar>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					width="100%"
				>
					{/* Display points with icon */}
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

					{/* Display health with heart icon */}
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

					{/* Display XP with star icon and progress bar */}
					<Box display="flex" alignItems="center">
						<StarIcon color="secondary" />
						<Box sx={{ ml: 1, width: 100 }}>
							<Tooltip title={`XP: ${xp}/100`}>
								<LinearProgress
									variant="determinate"
									value={(xp / 100) * 100} // Assuming xp is a value out of 100 for now
									sx={{ height: 10 }}
								/>
							</Tooltip>
							<Typography variant="body2" sx={{ mt: 0.5 }}>
								XP: {xp}/100
							</Typography>
						</Box>
					</Box>
					{/* Display grade with icon only */}
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

					{/* Display rank with icon only */}
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
