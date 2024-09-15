// src/modules/editor/components/CodeEditor.tsx
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
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
	height?: number;
	minimap?: boolean;
	initialCode: string;
	testCases: any;
	testCode: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
	height = 300,
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
		acceptSuggestionOnCommitCharacter: false,
		acceptSuggestionOnEnter: "smart",
		autoClosingBrackets: "beforeWhitespace",
		autoClosingComments: "beforeWhitespace",
		autoClosingOvertype: "auto",
		autoClosingQuotes: "beforeWhitespace",
		autoIndent: "advanced",
		fontFamily: "'Ubuntu Mono', monospace",
		fontSize: 16,
		minimap: { enabled: minimap },
		readOnly: false,
		"semanticHighlighting.enabled": true,
		wordBasedSuggestions: "allDocuments",
		wordBasedSuggestionsOnlySameLanguage: true,
		// autoSurround?: EditorAutoSurroundStrategy;
		bracketPairColorization: {
			enabled: true,
			independentColorPoolPerBracketType: true,
		},
		// codeLens?: boolean;
		// codeLensFontFamily?: string;
		// codeLensFontSize?: number;
		// colorDecorators?: boolean;
		// colorDecoratorsActivatedOn?: "clickAndHover" | "click" | "hover";
		// colorDecoratorsLimit?: number;
		// columnSelection?: boolean;
		// comments?: IEditorCommentsOptions;
		// contextmenu?: boolean;
		// copyWithSyntaxHighlighting?: boolean;
		// cursorBlinking?: "blink" | "smooth" | "phase" | "expand" | "solid";
		// cursorSmoothCaretAnimation?: "off" | "on" | "explicit";
		// cursorStyle?: "line" | "block" | "underline" | "line-thin" | "block-outline" | "underline-thin";
		// cursorSurroundingLines?: number;
		// cursorSurroundingLinesStyle?: "default" | "all";
		// cursorWidth?: number;
		// defaultColorDecorators?: boolean;
		// definitionLinkOpensInPeek?: boolean;
		// detectIndentation?: boolean;
		// dimension?: IDimension;
		// disableLayerHinting?: boolean;
		disableMonospaceOptimizations: false,
		// domReadOnly?: boolean;
		// dragAndDrop?: boolean;
		// dropIntoEditor?: IDropIntoEditorOptions;
		// emptySelectionClipboard?: boolean;
		// experimentalInlineEdit?: IInlineEditOptions;
		// experimentalWhitespaceRendering?: "off" | "svg" | "font";
		// extraEditorClassName?: string;
		// fastScrollSensitivity?: number;
		// find?: IEditorFindOptions;
		// fixedOverflowWidgets?: boolean;
		// folding?: boolean;
		// foldingHighlight?: boolean;
		// foldingImportsByDefault?: boolean;
		// foldingMaximumRegions?: number;
		// foldingStrategy?: "auto" | "indentation";
		// fontFamily?: string;
		// fontLigatures?: string | boolean;
		// fontSize?: number;
		// fontVariations?: string | boolean;
		// fontWeight?: string;
		// formatOnPaste?: boolean;
		// formatOnType?: boolean;
		// glyphMargin?: boolean;
		// gotoLocation?: IGotoLocationOptions;
		// guides?: IGuidesOptions;
		// hideCursorInOverviewRuler?: boolean;
		// hover?: IEditorHoverOptions;
		// inDiffEditor?: boolean;
		// inlayHints?: IEditorInlayHintsOptions;
		// inlineCompletionsAccessibilityVerbose?: boolean;
		// inlineSuggest?: IInlineSuggestOptions;
		// insertSpaces?: boolean;
		// language?: string;
		// largeFileOptimizations?: boolean;
		// letterSpacing?: number;
		// lightbulb?: IEditorLightbulbOptions;
		// lineDecorationsWidth?: string | number;
		// lineHeight?: number;
		lineNumbers: "on",
		// lineNumbersMinChars?: number;
		// linkedEditing?: boolean;
		// links?: boolean;
		// matchBrackets?: "always" | "never" | "near";
		// matchOnWordStartOnly?: boolean;
		// maxTokenizationLineLength?: number;
		// minimap?: IEditorMinimapOptions;
		// model?: ITextModel;
		// mouseStyle?: "default" | "text" | "copy";
		// mouseWheelScrollSensitivity?: number;
		// mouseWheelZoom?: boolean;
		// multiCursorLimit?: number;
		// multiCursorMergeOverlapping?: boolean;
		// multiCursorModifier?: "ctrlCmd" | "alt";
		// multiCursorPaste?: "spread" | "full";
		// occurrencesHighlight?: "off" | "singleFile" | "multiFile";
		// overflowWidgetsDomNode?: HTMLElement;
		// overviewRulerBorder?: boolean;
		// overviewRulerLanes?: number;
		// padding?: IEditorPaddingOptions;
		// parameterHints?: IEditorParameterHintOptions;
		// pasteAs?: IPasteAsOptions;
		// peekWidgetDefaultFocus?: "tree" | "editor";
		// placeholder?: string;
		// quickSuggestions?: boolean | IQuickSuggestionsOptions;
		// quickSuggestionsDelay?: number;
		// readOnly?: boolean;
		// readOnlyMessage?: IMarkdownString;
		// renameOnType?: boolean;
		// renderControlCharacters?: boolean;
		// renderFinalNewline?: "off" | "on" | "dimmed";
		// renderLineHighlight?: "all" | "line" | "none" | "gutter";
		// renderLineHighlightOnlyWhenFocus?: boolean;
		// renderValidationDecorations?: "off" | "on" | "editable";
		// renderWhitespace?: "all" | "none" | "boundary" | "selection" | "trailing";
		// revealHorizontalRightPadding?: number;
		// roundedSelection?: boolean;
		// rulers?: (number | IRulerOption)[];
		// screenReaderAnnounceInlineSuggestion?: boolean;
		// scrollBeyondLastColumn?: number;
		scrollBeyondLastLine: false,
		// scrollPredominantAxis?: boolean;
		scrollbar: {
			// alwaysConsumeMouseWheel?: boolean;
			// arrowSize?: number;
			// handleMouseWheel?: boolean;
			// horizontal?: "auto" | "visible" | "hidden";
			// horizontalHasArrows?: boolean;
			// horizontalScrollbarSize?: number;
			// horizontalSliderSize?: number;
			// ignoreHorizontalScrollbarInContentHeight?: boolean;
			// scrollByPage?: boolean;
			// useShadows?: boolean;
			vertical: "auto",
			verticalHasArrows: true,
			// verticalScrollbarSize?: number;
			// verticalSliderSize?: number;};
		},
		// selectOnLineNumbers?: boolean;
		// selectionClipboard?: boolean;
		// selectionHighlight?: boolean;
		// semanticHighlighting.enabled?: boolean | "configuredByTheme";
		// showDeprecated?: boolean;
		// showFoldingControls?: "always" | "never" | "mouseover";
		// showUnused?: boolean;
		// smartSelect?: ISmartSelectOptions;
		// smoothScrolling?: boolean;
		// snippetSuggestions?: "none" | "top" | "bottom" | "inline";
		// stablePeek?: boolean;
		// stickyScroll?: IEditorStickyScrollOptions;
		// stickyTabStops?: boolean;
		// stopRenderingLineAfter?: number;
		// suggest?: ISuggestOptions;
		// suggestFontSize?: number;
		// suggestLineHeight?: number;
		// suggestOnTriggerCharacters?: boolean;
		// suggestSelection?: "first" | "recentlyUsed" | "recentlyUsedByPrefix";
		tabCompletion: "on",
		// tabFocusMode?: boolean;
		// tabIndex?: number;
		// tabSize?: number;
		// theme?: string;
		// trimAutoWhitespace?: boolean;
		// unfoldOnClickAfterEndOfLine?: boolean;
		// unicodeHighlight?: IUnicodeHighlightOptions;
		// unusualLineTerminators?: "off" | "auto" | "prompt";
		// useShadowDOM?: boolean;
		// useTabStops?: boolean;
		// value?: string;
		// wordBasedSuggestions?: "off" | "currentDocument" | "matchingDocuments" | "allDocuments";
		// wordBasedSuggestionsOnlySameLanguage?: boolean;
		// wordBreak?: "normal" | "keepAll";
		// wordSegmenterLocales?: string | string[];
		// wordSeparators?: string;
		// wordWrap?: "off" | "on" | "wordWrapColumn" | "bounded";
		// wordWrapBreakAfterCharacters?: string;
		// wordWrapBreakBeforeCharacters?: string;
		// wordWrapColumn?: number;
		// wordWrapOverride1?: "off" | "on" | "inherit";
		// wordWrapOverride2?: "off" | "on" | "inherit";
		// wrappingIndent?: "none" | "same" | "indent" | "deepIndent";
		// wrappingStrategy?: "simple" | "advanced"; */
	};

	const handleEditorDidMount = (
		editor: monaco.editor.IStandaloneCodeEditor,
	) => {
		editorRef.current = editor;
		console.log("Editor mounted:", editor);
	};

	const handleResetCode = () => {
		setCode(initialCode);
		if (editorRef.current) {
			editorRef.current.setValue(initialCode); // Reset the editor's content
		}
		console.log("Editor reset to initial code.");
	};

	const handleTestCode = () => {
		const userCode = editorRef.current.getValue();
		console.log("Test code after user entry:", userCode);
	};

	return (
		<div>
			<Editor
				height={height}
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
