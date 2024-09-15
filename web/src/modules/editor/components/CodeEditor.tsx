// src/modules/editor/components/CodeEditor.tsx
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import useCodeRunner from "@site/src/modules/editor/utils/useCodeRunner";
import { Box, Button, ButtonGroup } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { RxReset } from "react-icons/rx";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import ScienceIcon from "@mui/icons-material/Science";
import SendIcon from "@mui/icons-material/Send";

type CodeEditorProps = {
	minimap: boolean;
	initialCode: string;
	testCases: any;
	testCode: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
	minimap,
	initialCode,
	testCases,
	testCode: runCode,
}) => {
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
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
						disabled={!enableSubmit}
						onClick={handleTestCode}
					>
						Submit
					</Button>
					{/*<LoadingButton loading variant="outlined">
						Submit
					</LoadingButton>*/}
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
