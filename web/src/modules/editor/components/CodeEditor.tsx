import Editor from "@monaco-editor/react";
import useCodeRunner from "@site/src/modules/editor/utils/useCodeRunner";
// src/modules/editor/components/CodeEditor.tsx
import type React from "react";
import { useRef, useState } from "react";

type CodeEditorProps = {
    initialCode: string;
    testCases: any[]; // Adjust type as needed
    testCode: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
    initialCode,
    testCases,
    testCode: runCode,
}) => {
    const editorRef = useRef<any>(null);
    const [code, setCode] = useState(initialCode); // State to hold the current code
    const { output, executeCode } = useCodeRunner();

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleRunTests = async () => {
        const userCode = editorRef.current.getValue();
        await executeCode(userCode, testCases, runCode);
    };

    const handleResetCode = () => {
        setCode(initialCode);
        if (editorRef.current) {
            editorRef.current.setValue(initialCode); // Reset the editor's content
        }
    };

    return (
        <div>
            <Editor
                height="80vh"
                defaultLanguage="javascript"
                value={code} // Use the code state
                onMount={handleEditorDidMount}
            />
            <button type="button" onClick={handleRunTests}>
                Run Tests
            </button>
            <button type="button" onClick={handleResetCode}>
                Reset Code
            </button>
            <div>
                <h3>Output:</h3>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;
