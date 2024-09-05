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
            main: "#0984e3", // Electron Blue
            light: "#74b9ff", // Green Darner Tail
            dark: "#0768b3",
        },
        secondary: {
            main: "#6c5ce7", // Exodus Fruit
            light: "#a29bfe", // Shy Moment
            dark: "#5649c0",
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
