import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import CircleIcon from 'mdi-react/CircleIcon';
import LoadingIcon from 'mdi-react/LoadingIcon';
import { FC, HTMLProps, useEffect, useState } from 'react';
import { hubspotFieldFile } from 'renderer/Dashboard/utils';
import { Directory } from '../FrameContext/FrameContext.types';
import { DirectoryIcon } from './DirectoryIcon';
import { ModuleIcon } from './ModuleIcon';
import { ExpandIcon } from './ExpandIcon';
import { CollapseIcon } from './CollapseIcon';
import { FieldsIcon } from './FieldsIcon';
import { CSSIcon } from './CSSIcon';
import { HtmlIcon } from './HtmlIcon';
import { JavascriptIcon } from './JavascriptIcon';
import { SassLangaugeIcon } from './SassLangaugeIcon';
import { MetaIcon } from './MetaIcon';
import { JsonIcon } from './JsonIcon';
import { MarkdownIcon } from './MarkdownIcon';
import { TypescriptIcon } from './TypescriptIcon';
import { DefaultFileIcon } from './DefaultFileIcon';

export type ExplorerFilesProps = HTMLProps<HTMLDivElement> & {
  directory?: Directory;
  directoryLoading?: boolean;
  onFileSelect: (file: any) => void;
  onOpenProject: () => void;
  selectedFile?: any;
  selectedFileEdited?: boolean;
  selectedFileValid?: boolean;
};

export const ExplorerFiles: FC<ExplorerFilesProps> = ({
  directory,
  directoryLoading,
  onOpenProject,
  onFileSelect,
  selectedFile,
  selectedFileEdited = false,
  selectedFileValid = true,
  ...props
}) => {
  const handleFakeEvent = () => {};

  const clickableFiles = [hubspotFieldFile];
  const [tree, setTree] = useState<any>();
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    if (directory && directory.tree) {
      setTree(directory.tree);
    }
  }, [directory]);

  const handleFileClick = (sourceItem: any) => {
    if (sourceItem.isDirectory) {
      setExpanded((prevValue: any) => {
        const alreadyExpanded = prevValue.includes(sourceItem.path);

        const newValue = alreadyExpanded
          ? prevValue.filter((v: any) => v !== sourceItem.path)
          : [...prevValue, sourceItem.path];

        return newValue;
      });
    } else if (clickableFiles.includes(sourceItem.name)) {
      return onFileSelect(sourceItem);
    }
  };

  const displayDirectory = (item: any, index: number) => {
    if (!directory) {
      return null;
    }

    let sourceItem = directory.contents?.find(
      (s: any) => `${s.path}` === `${item.path}`
    );

    if (!sourceItem) {
      sourceItem = {
        directory: directory.path,
        isDirectory: true,
        name: directory.name,
        path: directory.path,
      };
    }

    return (
      <ul
        key={index}
        style={{
          fontSize: 15,
          paddingLeft: 20,
        }}
      >
        <li>
          <div
            role="button"
            className={`clickable-subtle ${
              selectedFile?.path === sourceItem.path ? 'clickable-active' : ''
            } ${
              !clickableFiles.includes(sourceItem.name) &&
              !sourceItem.isDirectory
                ? 'clickable-subtle-disabled'
                : ''
            }`}
            style={{
              padding: 6,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxSizing: 'border-box',
              borderRadius: 4,
              color:
                selectedFile?.path === sourceItem.path
                  ? selectedFileValid
                    ? 'white'
                    : 'rgb(232, 90, 107)'
                  : 'white',
              backgroundColor:
                selectedFile?.path === sourceItem.path
                  ? 'rgba(79, 100, 121, 0.5)'
                  : 'transparent',
              cursor: 'pointer',
            }}
            onClick={() => handleFileClick(sourceItem)}
            onKeyDown={handleFakeEvent}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'baseline',
                boxSizing: 'border-box',
              }}
            >
              {sourceItem.isDirectory ? (
                <>
                  {expanded.includes(sourceItem.path) ? (
                    <ExpandIcon />
                  ) : (
                    <CollapseIcon />
                  )}

                  {(sourceItem.name as string).endsWith('.module') ? (
                    <ModuleIcon />
                  ) : (
                    <DirectoryIcon />
                  )}

                  <span style={{ userSelect: 'none' }}>{sourceItem.name}</span>
                </>
              ) : (
                <>
                  {sourceItem.name === 'meta.json' ? <MetaIcon /> : null}
                  {sourceItem.name === 'fields.json' ? <FieldsIcon /> : null}
                  {sourceItem.name.endsWith('.css') ? <CSSIcon /> : null}
                  {sourceItem.name.endsWith('.html') ? <HtmlIcon /> : null}
                  {sourceItem.name.endsWith('.js') ? <JavascriptIcon /> : null}
                  {sourceItem.name.endsWith('.md') ? <MarkdownIcon /> : null}
                  {sourceItem.name.endsWith('.ts') ? <TypescriptIcon /> : null}

                  {sourceItem.name.endsWith('.scss') ||
                  sourceItem.name.endsWith('.sass') ? (
                    <SassLangaugeIcon />
                  ) : null}

                  {sourceItem.name !== 'meta.json' &&
                  sourceItem.name !== 'fields.json' &&
                  sourceItem.name.endsWith('.json') ? (
                    <JsonIcon />
                  ) : null}

                  {sourceItem.name !== 'fields.json' &&
                  sourceItem.name !== 'meta.json' &&
                  !sourceItem.name.endsWith('.css') &&
                  !sourceItem.name.endsWith('.js') &&
                  !sourceItem.name.endsWith('.html') &&
                  !sourceItem.name.endsWith('.json') &&
                  !sourceItem.name.endsWith('.md') &&
                  !sourceItem.name.endsWith('.scss') &&
                  !sourceItem.name.endsWith('.sass') &&
                  !sourceItem.name.endsWith('.ts') ? (
                    <DefaultFileIcon />
                  ) : null}

                  <span style={{ userSelect: 'none' }}>{sourceItem.name}</span>
                </>
              )}
            </div>

            {selectedFileEdited && selectedFile?.path === sourceItem.path ? (
              <CircleIcon size={10} />
            ) : null}
          </div>

          {expanded.includes(sourceItem.path) ? (
            <>
              {item.children.map((child: any, indx: number) =>
                displayDirectory(child, indx)
              )}
            </>
          ) : null}
        </li>
      </ul>
    );
  };

  return (
    <div
      {...props}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        minHeight: 28,
        color: 'rgba(255,255,255,0.75)',
        fontSize: 15,
        flexShrink: 1,
        flexGrow: 1,
        overflowY: 'auto',
      }}
      className="field-list-x scrollable"
    >
      {directory && !directoryLoading ? (
        <ul style={{ width: '100%', fontSize: 15, paddingLeft: 20 }}>
          <li>
            <div
              style={{
                padding: '6px 0',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              <ChevronDownIcon size={14} style={{ marginRight: 6 }} />
              <span
                style={{
                  textTransform: 'uppercase',
                  fontSize: 15,
                  letterSpacing: 1,
                  userSelect: 'none',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {directory.name}
              </span>
            </div>

            {tree.map((item: any, index: number) =>
              displayDirectory(item, index)
            )}
          </li>
        </ul>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '60px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {directoryLoading ? (
            <span>
              <LoadingIcon className="animate-spin" />
            </span>
          ) : (
            <span
              className="clickable"
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: 13,
                letterSpacing: 0.5,
                userSelect: 'none',
              }}
              role="button"
              onClick={onOpenProject}
              onKeyDown={() => {}}
            >
              Open a project.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
