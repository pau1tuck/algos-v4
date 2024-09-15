// src/modules/editor/components/CodeEditor.tsx
import { useRef, useState } from "react";
import Editor, { IStandaloneCodeEditor } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
// import useCodeRunner from "@site/src/modules/editor/utils/useCodeRunner"; // Eventual hook
import { Box, Button, ButtonGroup } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { RxReset } from "react-icons/rx";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import ScienceIcon from "@mui/icons-material/Science";
import SendIcon from "@mui/icons-material/Send";
import { PiX } from "react-icons/pi";

type CodeEditorProps = {
	minimap?: boolean;
	initialCode: string;
	testCases: any;
	testCode: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
	minimap = false,
	initialCode,
	testCases,
	testCode,
}) => {
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
	const [code, setCode] = useState<string>(initialCode); // State to hold the current code
	const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
	// const { output, executeCode } = useCodeRunner(); // Commented out for future use

	const options: monaco.editor.IStandaloneEditorConstructionOptions = {
		automaticLayout: true,
		fontFamily: "'Ubuntu Mono', monospace",
		fontSize: 16,
		readOnly: false,
		minimap: { enabled: minimap },
	};

	const handleEditorDidMount = (editor: any) => {
		editorRef.current = editor;
		console.log("Editor mounted:", editor);
	};

	const handleTestCode = () => {
		const userCode = editorRef.current.getValue();
		console.log("Test code after user entry:", userCode);
	};

	const handleResetCode = () => {
		setCode(initialCode);
		if (editorRef.current) {
			editorRef.current.setValue(initialCode); // Reset the editor's content
		}
		console.log("Editor reset to initial code.");
	};

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
			<Box display="flex" justifyContent="flex-end" mt={5} mr={4}>
				<ButtonGroup variant="outlined" aria-label="Basic button group">
					<Button
						type="button"
						color="error"
						startIcon={<RestartAltRoundedIcon />}
						onClick={handleResetCode}
					>
						Reset
					</Button>
					<Button
						type="button"
						startIcon={<ScienceIcon />}
						onClick={handleTestCode}
					>
						Test
					</Button>
					<Button
						type="button"
						color="success"
						endIcon={<SendIcon />}
						disabled={!allowSubmit}
						onClick={handleTestCode}
					>
						Submit
					</Button>
					{/*<LoadingButton loading variant="outlined">
                        Submit
                    </LoadingButton>*/}
				</ButtonGroup>
			</Box>
			{/* Commenting out the output display for now */}
			{/* {output && (
                <div>
                    <h3>Output:</h3>
                    <pre>{output}</pre>
                </div>
            )} */}
		</div>
	);
};

export default CodeEditor;
