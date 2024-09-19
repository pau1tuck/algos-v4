// /server/coderunner/container/executor.js

// Import required modules
const vm = require("vm");

// Get user code, test cases, and test code from environment variables
const userCode = process.env.USER_CODE;
const testCases = JSON.parse(process.env.TEST_CASES);
const testCode = process.env.TEST_CODE;

// Function to run user code and test code safely
function runUserCodeAndTests(userCode, testCode, testCases) {
	try {
		// Combine user code and test code into a single script
		const fullCode = `
        ${userCode}
        ${testCode}
        runTests; // Ensure that runTests function is exposed
        `;

		// Create a new script and context for execution
		const script = new vm.Script(fullCode);
		const context = vm.createContext({});
		script.runInContext(context);

		// Retrieve the runTests function from the context
		const runTests = context.runTests;

		// Execute the test function with the user's function and test cases
		let allPassed = true;
		if (typeof runTests === "function") {
			for (const testCase of testCases) {
				const { input, expected } = testCase;
				try {
					const result = runTests(context.add, input); // Pass user function and test case input
					if (result !== "Pass") {
						allPassed = false;
						break;
					}
				} catch (error) {
					allPassed = false;
					break;
				}
			}
		} else {
			return "FAILED: runTests function is not defined correctly.";
		}

		return allPassed ? "PASSED" : "FAILED";
	} catch (error) {
		return `FAILED: ${error.message}`;
	}
}

// Run the user code with test cases and test code
const output = runUserCodeAndTests(userCode, testCode, testCases);
console.log(output);
