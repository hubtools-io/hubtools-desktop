import { FC, HTMLProps, useEffect, useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { FrameFile } from '../FrameContext/FrameContext.types';
import { formatFieldString, hubId, isValidJson } from '../FrameContext/utils';
import { defaultBoolean } from '../FrameContext/defaultFields/boolean';
import { defaultGroup } from '../FrameContext/defaultFields/group';
import { defaultAlignment } from '../FrameContext/defaultFields';
import { defaultBackgroundImage } from '../FrameContext/defaultFields/backgroundimage';
import { defaultBlog } from '../FrameContext/defaultFields/blog';
import { defaultBorder } from '../FrameContext/defaultFields/border';
import { defaultColor } from '../FrameContext/defaultFields/color';
import { defaultChoice } from '../FrameContext/defaultFields/choice';
import { defaultCTA } from '../FrameContext/defaultFields/cta';
import { defaultCRMObject } from '../FrameContext/defaultFields/crmobject';
import { defaultCRMObjectProperty } from '../FrameContext/defaultFields/crmobjectproperty';
import { defaultDate } from '../FrameContext/defaultFields/date';
import { defaultDateTime } from '../FrameContext/defaultFields/datetime';
import { defaultEmail } from '../FrameContext/defaultFields/email';
import { defaultEmbed } from '../FrameContext/defaultFields/embed';
import { defaultFile } from '../FrameContext/defaultFields/file';
import { defaultFollowupEmail } from '../FrameContext/defaultFields/followupemail';
import { defaultFont } from '../FrameContext/defaultFields/font';
import { defaultForm } from '../FrameContext/defaultFields/form';
import { defaultGradient } from '../FrameContext/defaultFields/gradient';
import { defaultHubDBRow } from '../FrameContext/defaultFields/hubdbrow';
import { defaultHubDBTable } from '../FrameContext/defaultFields/hubdbtable';
import { defaultIcon } from '../FrameContext/defaultFields/icon';
import { defaultImage } from '../FrameContext/defaultFields/image';
import { defaultLink } from '../FrameContext/defaultFields/link';
import { defaultLogo } from '../FrameContext/defaultFields/logo';
import { defaultNumber } from '../FrameContext/defaultFields/number';
import { defaultPage } from '../FrameContext/defaultFields/page';
import { defaultRichText } from '../FrameContext/defaultFields/richtext';
import { defaultSimpleMenu } from '../FrameContext/defaultFields/simplemenu';
import { defaultSpacing } from '../FrameContext/defaultFields/spacing';
import { defaultTag } from '../FrameContext/defaultFields/tag';
import { defaultText } from '../FrameContext/defaultFields/text';
import { defaultTextAlignment } from '../FrameContext/defaultFields/textalignment';
import { defaultUrl } from '../FrameContext/defaultFields/url';
import { defaultVideo } from '../FrameContext/defaultFields/video';

function createDependencyProposals(range: any, monaco: any) {
    const nameSuffix = hubId();
    return [
        {
            label: '"group"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The group field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultGroup,
                name: `${defaultGroup.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"groupstyletab"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The group with style tab field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultGroup,
                name: `${defaultGroup.name}_${nameSuffix}`,
                label: 'Default Style Group',
                tab: 'STYLE',
            })},`,
            range,
        },
        {
            label: '"alignment"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The alignment field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultAlignment,
                name: `${defaultAlignment.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"backgroundimage"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The backgroundimage field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultBackgroundImage,
                name: `${defaultBackgroundImage.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"blog"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The blog field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultBlog,
                name: `${defaultBlog.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"boolean"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The boolean field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultBoolean,
                name: `${defaultBoolean.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"border"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The border field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultBorder,
                name: `${defaultBorder.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"choice"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The choice field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultChoice,
                name: `${defaultChoice.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"color"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The color field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultColor,
                name: `${defaultColor.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"cta"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The CTA field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultCTA,
                name: `${defaultCTA.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"crmobject"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The CRM Object field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultCRMObject,
                name: `${defaultCRMObject.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"crmobjectproperty"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The CRM Object Property field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultCRMObjectProperty,
                name: `${defaultCRMObjectProperty.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"date"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The date field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultDate,
                name: `${defaultDate.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"datetime"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The datetime field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultDateTime,
                name: `${defaultDateTime.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"email"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultEmail,
                name: `${defaultEmail.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"embed"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The embed field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultEmbed,
                name: `${defaultEmbed.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"file"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The file field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultFile,
                name: `${defaultFile.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"followupemail"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The followup email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultFollowupEmail,
                name: `${defaultFollowupEmail.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"font"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The font email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultFont,
                name: `${defaultFont.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"form"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The form email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultForm,
                name: `${defaultForm.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"gradient"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The gradient email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultGradient,
                name: `${defaultGradient.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"hubdbrow"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The hubdbrow email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultHubDBRow,
                name: `${defaultHubDBRow.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"hubdbtable"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The hubdbtable email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultHubDBTable,
                name: `${defaultHubDBTable.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"icon"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The icon email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultIcon,
                name: `${defaultIcon.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"image"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The image email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultImage,
                name: `${defaultImage.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"link"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The link email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultLink,
                name: `${defaultLink.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"logo"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The logo email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultLogo,
                name: `${defaultLogo.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"number"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The number email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultNumber,
                name: `${defaultNumber.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"page"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The page email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultPage,
                name: `${defaultPage.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"richtext"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The richtext email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultRichText,
                name: `${defaultRichText.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"simplemenu"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The simplemenu email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultSimpleMenu,
                name: `${defaultSimpleMenu.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"spacing"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The spacing email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultSpacing,
                name: `${defaultSpacing.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"tag"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The tag email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultTag,
                name: `${defaultTag.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"text"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The text email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultText,
                name: `${defaultText.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"textalignment"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The textalignment email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultTextAlignment,
                name: `${defaultTextAlignment.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"url"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The url email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultUrl,
                name: `${defaultUrl.name}_${nameSuffix}`,
            })},`,
            range,
        },
        {
            label: '"videoplayer"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation:
                'The videoplayer email field for hubspot modules and themes.',
            insertText: `${formatFieldString({
                ...defaultVideo,
                name: `${defaultVideo.name}_${nameSuffix}`,
            })},`,
            range,
        },
    ];
}

export type CodeEditorProps = HTMLProps<HTMLDivElement> & {
    file?: FrameFile;
    onEdited?: (editState: boolean) => void;
    onValid?: (validState: boolean) => void;
    onFileChange?: (file: FrameFile) => void;
    onFileSave?: () => void;
};

export const CodeEditor: FC<CodeEditorProps> = ({
    file,
    onEdited,
    onFileChange,
    onValid,
    onFileSave,
    ...props
}) => {
    const editorRef = useRef(null);
    const monaco = useMonaco();

    const [loadingEditor, setLoadingEditor] = useState<boolean>(true);
    const [editorValid, setEditorValid] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            if (editorRef && editorRef.current) {
                const zEditor = editorRef.current as any;
                zEditor.getAction('editor.action.formatDocument').run();

                if (monaco) {
                    const model = zEditor.getModel();
                    model.setEOL(monaco.editor.EndOfLineSequence.LF);
                    model.updateOptions({ tabSize: 4 });

                    zEditor.addCommand(
                        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                        function () {
                            onFileSave?.();
                        }
                    );
                }
            }
        }, 300);

        setTimeout(() => {
            setLoadingEditor(false);
        }, 310);
    }, [monaco, onFileSave]);

    useEffect(() => {
        let defaults: any;
        let completionItemProvider: any;

        if (monaco && file?.extension === 'json') {
            defaults = monaco.languages.json.jsonDefaults.setDiagnosticsOptions(
                {
                    ...monaco.languages.json.jsonDefaults.diagnosticsOptions,
                    tabSize: 4,
                }
            );

            if (file.name === 'fields.json') {
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
                                suggestions: createDependencyProposals(
                                    range,
                                    monaco
                                ),
                            };
                        },
                    });
            }
        }

        return () => {
            defaults?.dispose();
            completionItemProvider?.dispose();
        };
    }, [monaco, file]);

    useEffect(() => {
        onValid?.(editorValid);
    }, [onValid, editorValid]);

    const handleEditorDidMount = (editor: any) => {
        setLoadingEditor(true);

        editorRef.current = editor;
        if (editor) {
            setTimeout(() => {
                editor.getAction('editor.action.formatDocument').run();
            }, 300);

            setTimeout(() => {
                setLoadingEditor(false);
            }, 310);
        }
    };

    const handleEditorChange = (value: any, event: any) => {
        let isValid = true;

        // HubTools editor is removing trailing spaces and final newline.
        // TODO: Investigate further.
        const isEdited = value !== file?.contents;
        onEdited?.(isEdited);

        if (isEdited) {
            if (file?.extension === 'json') {
                isValid = isValidJson(value);
                setEditorValid(isValid);
            }

            if (isValid) {
                if (editorRef && editorRef.current) {
                    const zEditor = editorRef.current as any;
                    zEditor.getAction('editor.action.formatDocument').run();
                }

                onFileChange?.({ ...file, contents: value });
            } else {
                setEditorValid(false);
            }
        }
    };

    const handleEditorValidation = (markers: any) => {
        // Marker Severity
        // Hint = 1, Info = 2, Warning = 4, Error = 8,
        const errorMarkers = markers.filter((m: any) => m.severity > 4);
        setEditorValid(errorMarkers.length === 0);
    };

    const fileTypeLookup: Record<string, string> = {
        css: 'css',
        js: 'javascript',
        json: 'json',
        md: 'markdown',
        mjs: 'javascript',
        php: 'php',
        sass: 'sass',
        scss: 'scss',
        ts: 'typescript',
        yml: 'yml',
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
                    options={{
                        renderFinalNewline: false,
                        suggest: {
                            snippetsPreventQuickSuggestions: false,
                        },
                        quickSuggestions: {
                            other: 'inline',
                            comments: true,
                            strings: true,
                        },
                        autoIndent: 'full',
                        automaticLayout: true,
                        colorDecorators: true,
                        minimap: {
                            enabled: true,
                        },
                        wordWrap: 'on',
                        formatOnPaste: true,
                        formatOnType: true,
                        fontSize: 14,
                        tabSize: 4,
                    }}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    onValidate={handleEditorValidation}
                />
            </div>
        </div>
    );
};
