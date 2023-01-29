import { FC, HTMLProps, useCallback, useEffect, useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { clone } from 'lodash';
import shortid from 'shortid';
import { FrameFile } from '../FrameContext/FrameContext.types';
import {
  formatFieldArray,
  formatFieldString,
  isValidJson,
  removeFieldInternalId,
} from '../FrameContext/utils';
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

const formatCode = (inputCode: any) => {
  let formattedCode = formatFieldString(inputCode);
  formattedCode = removeFieldInternalId(formattedCode);
  formattedCode = formatFieldString(formattedCode);
  return formattedCode;
};

function createDependencyProposals(range: any, monaco: any) {
  const nameSuffix = shortid();
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
      documentation: 'The alignment field for hubspot modules and themes.',
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
      documentation: 'The CRM Object field for hubspot modules and themes.',
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
      documentation: 'The followup email field for hubspot modules and themes.',
      insertText: `${formatFieldString({
        ...defaultFollowupEmail,
        name: `${defaultFollowupEmail.name}_${nameSuffix}`,
      })},`,
      range,
    },
    {
      label: '"font"',
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'The font email field for hubspot modules and themes.',
      insertText: `${formatFieldString({
        ...defaultFont,
        name: `${defaultFont.name}_${nameSuffix}`,
      })},`,
      range,
    },
    {
      label: '"form"',
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: 'The form email field for hubspot modules and themes.',
      insertText: `${formatFieldString({
        ...defaultForm,
        name: `${defaultForm.name}_${nameSuffix}`,
      })},`,
      range,
    },
  ];
}

export type CodeEditorProps = HTMLProps<HTMLDivElement> & {
  code?: any;
  file?: FrameFile;
  onEdited?: (editState: boolean) => void;
  onValid?: (validState: boolean) => void;
  extension?: string;
  onFileChange?: (file: FrameFile) => void;
};

export const CodeEditor: FC<CodeEditorProps> = ({
  code = '',
  file,
  extension = 'js',
  onEdited,
  onFileChange,
  onValid,
  ...props
}) => {
  const editorRef = useRef(null);
  const monaco = useMonaco();

  const [loadingEditor, setLoadingEditor] = useState<boolean>(true);
  const [editorCode, setEditorCode] = useState<string>();
  const [editorExt, setEditorExt] = useState<string>();
  const [editorValid, setEditorValid] = useState<boolean>(true);

  useEffect(() => {
    if (!code) {
      return;
    }

    const formattedCode = formatCode(code);

    setEditorCode(formattedCode);
    setEditorExt(extension);

    setTimeout(() => {
      if (editorRef && editorRef.current) {
        const zEditor = editorRef.current as any;
        zEditor.getAction('editor.action.formatDocument').run();
      }
    }, 300);

    setTimeout(() => {
      setLoadingEditor(false);
    }, 310);
  }, [code, extension]);

  useEffect(() => {
    let defaults: any;
    let completionItemProvider: any;

    if (monaco) {
      defaults = monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        ...monaco.languages.json.jsonDefaults.diagnosticsOptions,
        trailingCommas: 'error',
        comments: 'error',
        tabSize: 4,
      });

      completionItemProvider = monaco.languages.registerCompletionItemProvider(
        'json',
        {
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
              suggestions: createDependencyProposals(range, monaco),
            };
          },
        }
      );
    }

    return () => {
      defaults?.dispose();
      completionItemProvider?.dispose();
    };
  }, [monaco]);

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
    onEdited?.(value !== code);

    if (value !== code) {
      const isValid = isValidJson(value);
      setEditorValid(isValid);

      if (isValid) {
        if (editorRef && editorRef.current) {
          const zEditor = editorRef.current as any;
          zEditor.getAction('editor.action.formatDocument').run();
        }

        let formattedValue = clone(value);
        formattedValue = formatFieldArray(value);
        onFileChange?.({ ...file, contents: formattedValue });
      } else {
        setEditorValid(false);
      }
    }
  };

  const handleEditorValidation = (markers: any) => {
    setEditorValid(markers.length === 0);
  };

  if (!editorCode) {
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
          opacity: loadingEditor || !editorExt || !editorCode ? '0' : '1',
          transition: 'all 0.3s ease',
        }}
      >
        <Editor
          theme="vs-dark"
          height="calc(100vh - 50px)"
          width="calc(100vw - 390px)"
          defaultLanguage={editorExt}
          defaultValue={`${editorCode}`}
          path={file?.name}
          options={{
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
          }}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          onValidate={handleEditorValidation}
        />
      </div>
    </div>
  );
};
