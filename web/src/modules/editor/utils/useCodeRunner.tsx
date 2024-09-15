import axios from "axios";
// src/modules/editor/utils/useCodeRunner.tsx
import { useState } from "react";

const useCodeRunner = () => {
    const [output, setOutput] = useState<string>("");

    const executeCode = async (
        userCode: string,
        testCases: any[],
        testCode: string
    ) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/coderunner",
                {
                    user_code: userCode,
                    test_cases: testCases,
                    run_code: testCode,
                }
            );
            setOutput(response.data.output);
        } catch (error) {
            setOutput(
                `An error occurred while running the tests: ${error.response?.data?.error || error.message}`
            );
        }
    };

    return { output, executeCode };
};

export default useCodeRunner;
