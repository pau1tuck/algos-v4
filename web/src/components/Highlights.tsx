import styles from "@site/theme/styles/colors.css";
import { Typography } from "@mui/material";

export const Blue = ({ children }) => {
	return <span style={{ color: "#0984e3" }}>{children}</span>;
};

export const Primary = ({ children }) => {
	return <Typography style={{ color: "#0984e3" }}>{children}</Typography>;
};
