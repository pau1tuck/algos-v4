module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"airbnb",
		"airbnb/hooks",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:redux/recommended",
	],
	plugins: ["@typescript-eslint", "react", "redux"],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"@typescript-eslint/no-explicit-any": "warn",
		"no-console": "warn",
		indent: ["error", 4],
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
};
