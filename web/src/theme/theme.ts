import { createTheme } from "@mui/material/styles";
import { palette } from "./constants";

// Extend the typography variants in Material UI
declare module "@mui/material/styles" {
	interface TypographyVariants {
		code: React.CSSProperties; // Add 'code' variant
	}

	// Allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		code?: React.CSSProperties; // Add 'code' option
	}
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		code: true; // Add 'code' to the variant prop
	}
}

const theme = createTheme({
	palette: {
		primary: {
			main: palette.primary.main, // Electron Blue
			light: palette.primary.light, // Green Darner Tail
			dark: palette.primary.dark,
		},
		secondary: {
			main: palette.secondary.main, // Exodus Fruit
			light: palette.secondary.dark, // Shy Moment
			dark: palette.secondary.light,
		},
	},
	typography: {
		fontFamily:
			'"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		h1: {
			fontFamily: '"Lora", "Helvetica", "Arial", sans-serif',
			fontWeight: 600,
		},
		h2: {
			fontFamily: '"Lora", "Helvetica", "Arial", sans-serif',
			fontWeight: 600,
		},
		h3: {
			fontFamily: '"Lora", "Helvetica", "Arial", sans-serif',
			fontWeight: 600,
		},
		h4: {
			fontFamily: '"Lora", "Helvetica", "Arial", sans-serif',
			fontWeight: 600,
		},
		h5: {
			fontFamily: '"Lora", "Helvetica", "Arial", sans-serif',
			fontWeight: 600,
		},
		h6: {
			fontFamily: '"Lora", "Helvetica", "Arial", sans-serif',
			fontWeight: 600,
		},
		code: {
			fontFamily: '"Ubuntu Mono", monospace',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 600,
				},
				contained: {
					height: "48px",
					color: "#fff",
					"&:hover": {
						color: "#fff",
					},
				},
				outlined: {
					height: "38px",
					borderColor: "#CCD1D7", // Lighter grey border
					"&:hover": {
						borderColor: "rgba(0, 0, 0, 0.23)", // Keep the same color on hover
						backgroundColor: "#F1F3F5",
					},
					borderRadius: "8px",
				},
			},
		},
	},
});

export default theme;
