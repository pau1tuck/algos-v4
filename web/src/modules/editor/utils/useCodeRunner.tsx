// src/modules/editor/utils/useCodeRunner.ts
import { useState } from "react";
import axios from "axios";

const useCodeRunner = () => {
	const [output, setOutput] = useState<string>("");

	const executeCode = async (
		userCode: string,
		testCases: any[], // FIXME: string[] | number[] | boolean[] |object[]
		testCode: string,
	) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/coderunner",
				{
					user_code: userCode, // FIXME: camelCase object keys?
					test_cases: testCases,
					run_code: testCode,
				},
			);
			setOutput(response.data.output);
		} catch (error) {
			setOutput(
				`An error occurred while running the tests: ${error.response?.data?.error || error.message}`,
			);
		}
	};

	return { output, executeCode };
};

export default useCodeRunner;
