import { FC, HTMLProps, useCallback, useEffect, useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { FrameFile } from '../FrameContext/FrameContext.types';
import { isValidJson } from '../FrameContext/utils';
import { fieldCompletionItems } from './utils/field-completion-items';
import { fileTypeLookup } from './utils/file-type-lookup';

const editorOptions = {
    autoIndent: 'full',
    automaticLayout: true,
    colorDecorators: true,
    fontSize: 14,
    formatOnPaste: true,
    formatOnType: true,
    indentSize: 4,
    minimap: {
        enabled: true,
    },
    renderFinalNewline: 'on',
    suggest: {
        snippetsPreventQuickSuggestions: false,
    },
    tabSize: 4,
    quickSuggestions: {
        other: 'inline',
        comments: true,
        strings: true,
    },
    wordWrap: 'off',
};

export type CodeEditorProps = HTMLProps<HTMLDivElement> & {
    file?: FrameFile;
    format?: boolean;
    onEdited?: (editState: boolean) => void;
    onFileChange?: (file: FrameFile) => void;
    onFileSave?: (file: FrameFile) => void;
    onFormatted?: () => void;
    onValid?: (validState: boolean) => void;
};

export const CodeEditor: FC<CodeEditorProps> = ({
    file,
    format = false,
    onEdited,
    onFileChange,
    onFileSave,
    onFormatted,
    onValid,
    ...props
}) => {
    const editorRef = useRef(null);
    const monaco = useMonaco();

    const [loadingEditor, setLoadingEditor] = useState<boolean>(true);
    const [editorValid, setEditorValid] = useState<boolean>(true);

    // Allows to manually trigger format editor.
    const formatDocument = (editor: any) => {
        editor.getAction('editor.action.formatDocument').run();
    };

    // Save file (as final or unsaved version)
    const saveFile = useCallback(
        (editor: any, value: any, type: string, checkIfEdited: boolean) => {
            // Manually trigger monaco editor to format.
            formatDocument(editor);

            let isValid = true;
            let isEdited = false;

            // We only check to see if file was edited for type "change"
            // If it is edited, we trigger onEdited event.
            if (checkIfEdited) {
                isEdited = value !== file?.contents;
                onEdited?.(isEdited);
            } else {
                isEdited = true;
            }

            if (isEdited) {
                // If file extension is json,
                // We check to see if contents are valid JSON.
                // We prevent saving if contents are invalid.
                if (file?.extension === 'json') {
                    isValid = isValidJson(value);
                    setEditorValid(isValid);
                }

                if (isValid) {
                    // If valid we continue to submit final action
                    // If 'save', we save contents to the final saved version.
                    if (type === 'save') {
                        onFileSave?.({
                            ...file,
                            contents: value,
                        });
                    }

                    // If 'change', we save contents to the unsaved version.
                    if (type === 'change') {
                        onFileChange?.({
                            ...file,
                            contents: value,
                        });
                    }
                } else {
                    // If invalid, we do not perform final action.
                    // We send back to Dashboard that file is invalid.
                    setEditorValid(false);
                }
            }
        },
        [file, onFileSave, onEdited, onFileChange]
    );

    // Buttons outside of this component can trigger to format the code.
    // If an external component requests formatting, format will be true.
    // We trigger formatting and respond that it was formatted.
    useEffect(() => {
        if (format === true && editorRef && editorRef.current) {
            const zEditor = editorRef.current as any;
            formatDocument(zEditor);
            onFormatted?.();
        } else {
            onFormatted?.();
        }
    }, [format, onFormatted]);

    // On initial component load, we setup the editor
    useEffect(() => {
        setTimeout(() => {
            if (editorRef && editorRef.current) {
                const zEditor = editorRef.current as any;

                if (monaco && zEditor) {
                    const model = zEditor.getModel();

                    // We trigger to update options to those we expect.
                    if (model) {
                        model.setEOL(monaco.editor.EndOfLineSequence.LF);
                        model.updateOptions({ ...editorOptions });
                    }

                    // We also attach keyboard bindings here.
                    // This adds the command ctrl+s, cmd+s to save file.
                    zEditor.addCommand(
                        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                        () => {
                            const value = model.getValue();
                            return saveFile(zEditor, value, 'save', false);
                        }
                    );
                }
            }
        }, 300);

        setTimeout(() => {
            // After setup, we set the editor as loaded.
            setLoadingEditor(false);
        }, 310);
    }, [monaco, saveFile]);

    // On initial load and editor initialization, we setup editor extensions.
    useEffect(() => {
        let defaults: any;
        let completionItemProvider: any;

        if (monaco && file?.extension === 'json') {
            if (file.name === 'fields.json') {
                // If file is HubSpot's fields.json,
                // We add suggestions for field completion items.
                completionItemProvider =
                    monaco.languages.registerCompletionItemProvider('json', {
                        provideCompletionItems(model: any, position: any) {
                            const textUntilPosition = model.getValueInRange({
                                startLineNumber: 1,
                                startColumn: 1,
                                endLineNumber: position.lineNumber,
                                endColumn: position.column,
                            });
                            const match = textUntilPosition.match();
                            if (!match) {
                                return { suggestions: [] };
                            }
                            const word = model.getWordUntilPosition(position);
                            const range = {
                                startLineNumber: position.lineNumber,
                                endLineNumber: position.lineNumber,
                                startColumn: word.startColumn,
                                endColumn: word.endColumn,
                            };
                            return {
                                suggestions: fieldCompletionItems(
                                    range,
                                    monaco
                                ),
                            };
                        },
                    });
            }
        }

        // We dispose of these suggestions.
        // Not doing this causes suggestions to be shown as duplicates.
        return () => {
            defaults?.dispose();
            completionItemProvider?.dispose();
        };
    }, [monaco, file]);

    // Everytime we update editorValid
    // We need to send the valid state back to Dashboard
    useEffect(() => {
        onValid?.(editorValid);
    }, [onValid, editorValid]);

    const handleEditorDidMount = () => {};

    // Once the editor changes, we need to send a change event.
    // This will update the unsaved version of the file.
    // Updating the unsaved version allows us to change to field
    // editor with same file contents.
    const handleEditorChange = (value: any, _event: any) => {
        const zEditor = editorRef.current as any;
        return saveFile(zEditor, value, 'change', true);
    };

    // We only mark editor as invalid, and prevent saving if
    // errors are actual errors, not warnings.
    const handleEditorValidation = (markers: any) => {
        // Marker Severity
        // Hint = 1, Info = 2, Warning = 4, Error = 8,
        const errorMarkers = markers.filter((m: any) => m.severity > 4);
        setEditorValid(errorMarkers.length === 0);
    };

    if (!file) {
        return null;
    }

    return (
        <div
            {...props}
            style={{
                width: '100%',
                height: 'calc(100vh - 167)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#1E1E1E',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#1E1E1E',
                    opacity: loadingEditor ? '0' : '1',
                    transition: 'all 0.3s ease',
                }}
            >
                <Editor
                    theme="vs-dark"
                    height="calc(100vh - 50px)"
                    width="calc(100vw - 390px)"
                    defaultLanguage={
                        file?.extension
                            ? fileTypeLookup[file?.extension.toLowerCase()]
                            : 'js'
                    }
                    defaultValue={`${file?.contents}`}
                    path={file?.path}
                    language={
                        file?.extension
                            ? fileTypeLookup[file?.extension.toLowerCase()]
                            : 'js'
                    }
                    value={`${file?.contents}`}
                    saveViewState
                    options={{ ...editorOptions }}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    onValidate={handleEditorValidation}
                />
            </div>
        </div>
    );
};
