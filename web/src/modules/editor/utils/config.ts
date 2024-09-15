import type * as monaco from "monaco-editor";

export const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions =
	{
		automaticLayout: true,
		fontFamily: "'Ubuntu Mono', monospace",
		fontSize: 16,
		minimap: { enabled: minimap },
		readOnly: false,
		"semanticHighlighting.enabled": true,
		wordBasedSuggestions: "allDocuments",
		wordBasedSuggestionsOnlySameLanguage: true,
	};
