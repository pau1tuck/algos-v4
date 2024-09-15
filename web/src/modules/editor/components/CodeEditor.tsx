// src/modules/editor/components/CodeEditor.tsx
import type type yfrom "react";
import pe yfrom "react";
import pe yfrom "react";
import pe efrom "react";
import act from "react";
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import useCodeRunner from "@site/src/modules/editor/utils/useCodeRunner";

type CodeEditorProps = {
    minimap: boolean;
    initialCode: string;
    testCases: any[]; // Adjust type as needed
    testCode: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
    minimap,
    initialCode,
    testCases,
    testCode: runCode,
}) => {
    const editorRef = useRef<any>(null);
    const [code, setCode] = useState<string>(initialCode); // State to hold the current code
    const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
    const { output, executeCode } = useCodeRunner();

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleTestCode = async () => {
        const userCode = editorRef.current.getValue();
        await executeCode(userCode, testCases, runCode);
    };

    const handleResetCode = () => {
        setCode(initialCode);
        if (editorRef.current) {
            editorRef.current.setValue(initialCode); // Reset the editor's content
        }
    };

    const options = {
        readOnly: false,
        minimap: { enabled: minimap },
    };

    // Ensure the component returns JSX directly here
    return (
        <div>
            <Editor
                height="60vh"
                defaultLanguage="javascript"
                theme="vs-light" // or "vs-dark"
                options={options}
                value={code}
                onMount={handleEditorDidMount}
            />
            <Box display="flex" justifyContent="flex-end" mt={5}>
                <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                >
                    <Button type="button" onClick={handleResetCode}>
                        Reset
                    </Button>
                    <Button type="button" onClick={handleTestCode}>
                        Test Code
                    </Button>
                    <Button
                        type="button"
                        disabled={!enableSubmit}
                        onClick={handleTestCode} // This might need a different function if it's meant for submission
                    >
                        Submit
                    </Button>
                </ButtonGroup>
            </Box>
            {output && (
                <div>
                    <h3>Output:</h3>
                    <pre>{output}</pre>
                </div>
            )}
        </div>
    );
};

export default CodeEditor;
