const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
        container: false,
    },
    darkMode: ["class", '[data-theme="dark"]'],
    content: ["./src/**/*.{jsx,tsx,html}"],
    theme: {
        extend: {
            fontFamily: {},
            borderRadius: {
                sm: "4px",
            },
            screens: {},
            colors: {},
        },
    },
    plugins: [],
};