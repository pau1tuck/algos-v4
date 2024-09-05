import { createTheme } from "@mui/material/styles";

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
            main: "#1976d2",
            light: "#42a5f5",
            dark: "#1565c0",
        },
        secondary: {
            main: "#dc004e",
            light: "#f06292",
            dark: "#ad1457",
        },
    },
    typography: {
        fontFamily:
            '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        h1: {
            fontFamily:
                '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            fontWeight: 500,
        },
        code: {
            fontFamily: '"Ubuntu Mono", monospace',
        },
    },
});

export default theme;
