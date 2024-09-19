// /server/coderunner/container/executor.js

// Import required modules
const vm = require("vm");

// Uncomment the following lines when using with Django API
// const userCode = process.env.USER_CODE;
// const testCases = JSON.parse(process.env.TEST_CASES);
// const testCode = process.env.TEST_CODE;

// For testing locally without Django API
const userCode = `function add(a, b) { return a + b; }`;
const testCases = [
	{ input: [2, 3], expected: 5 },
	{ input: [0, 0], expected: 0 },
	{ input: [-1, 1], expected: 0 },
];
const testCode = `
function runTests(userFunction, testCases) {
    const results = [];
    for (const testCase of testCases) {
        const { input, expected } = testCase;
        try {
            const result = userFunction(...input);
            if (result === expected) {
                results.push('Pass');
            } else {
                results.push(\`Fail: Expected \${expected}, but got \${result}\`);
            }
        } catch (error) {
            results.push(\`Error: \${error.message}\`);
        }
    }
    return results;
}`;

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
		const context = vm.createContext({ testCases });
		script.runInContext(context);

		// Retrieve the runTests function from the context
		const runTests = context.runTests;

		// Execute the test function with the user's function and test cases
		let allPassed = true;
		if (typeof runTests === "function") {
			const results = runTests(context.add, testCases); // Pass user function and test cases
			allPassed = results.every((result) => result === "Pass");
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
