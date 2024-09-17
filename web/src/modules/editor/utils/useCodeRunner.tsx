// src/modules/editor/utils/useCodeRunner.ts
import { useState } from "react";
import axios from "axios";

const useCodeRunner = () => {
	const [output, setOutput] = useState<string>("");

	const executeCode = async (
		userCode: string,
		testCases: any[], // FIXME: any[] type
		testCode: string,
	) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/coderunner/execute/",
				{
					user_code: userCode, // FIXME: camelCase or snake_case?
					test_cases: testCases,
					test_code: testCode,
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
