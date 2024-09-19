// /server/coderunner/container/executor.js

// Import required modules
const vm = require("vm");

// Uncomment the following lines when using with Django API
// const userCode = process.env.USER_CODE;
// const setupCode = process.env.SETUP_CODE;
// const testCases = JSON.parse(process.env.TEST_CASES);

// For testing locally without Django API
// Local test data
const userCode = `function add(arr) { return arr.reduce((a, b) => a + b, 0); }`;
const setupCode = `
function main(input) {
    return add(...input);
}
`;
const testCases = [
	{ input: [[2, 3]], expected: 5 },
	{ input: [[0, 0]], expected: 0 },
	{ input: [[-1, 1]], expected: 0 },
];

// Function to run user code and test cases
function runUserCodeAndTests(setupCode, userCode, testCases) {
	try {
		// Combine setup code and user code into a single script
		const fullCode = `
        ${setupCode}
        ${userCode}
        main; // Ensure that main function is exposed
        `;
		const script = new vm.Script(fullCode);
		const context = vm.createContext({});
		script.runInContext(context);

		// Retrieve the main function from the context
		const mainFunction = context.main;

		// Execute the main function with the test cases
		const results = testCases.map(({ input, expected }) => {
			try {
				const actualOutput = mainFunction(input); // Execute main function with test input
				return {
					input,
					expectedOutput: expected,
					actualOutput,
					result:
						JSON.stringify(actualOutput) ===
						JSON.stringify(expected)
							? "Passed"
							: "Failed",
				};
			} catch (error) {
				return {
					input,
					expectedOutput: expected,
					actualOutput: `Error: ${error.message}`,
					result: "Failed",
				};
			}
		});

		const summary = results.every((result) => result.result === "Passed")
			? "PASSED"
			: "FAILED";

		return { summary, details: results };
	} catch (error) {
		return {
			summary: "FAILED",
			details: [{ error: error.message }],
		};
	}
}

// Run the user code with test cases
const output = runUserCodeAndTests(setupCode, userCode, testCases);
console.log(JSON.stringify(output, null, 2));
