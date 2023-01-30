import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import CircleIcon from 'mdi-react/CircleIcon';
import FileIcon from 'mdi-react/FileIcon';
import FileCancelOutlineIcon from 'mdi-react/FileCancelOutlineIcon';
import FolderIcon from 'mdi-react/FolderIcon';
import LoadingIcon from 'mdi-react/LoadingIcon';
import { FC, HTMLProps } from 'react';
import { hubspotFieldFile } from 'renderer/Dashboard/utils';
import { Directory } from '../FrameContext/FrameContext.types';

export type ExplorerFilesProps = HTMLProps<HTMLDivElement> & {
  directory?: Directory;
  directoryLoading?: boolean;
  onFileSelect: (file: any) => void;
  selectedFile?: any;
  selectedFileEdited?: boolean;
  selectedFileValid?: boolean;
};

export const ExplorerFiles: FC<ExplorerFilesProps> = ({
  directory,
  directoryLoading,
  onFileSelect,
  selectedFile,
  selectedFileEdited = false,
  selectedFileValid = true,
  ...props
}) => {
  const handleFakeEvent = () => {};

  const clickableFiles = [hubspotFieldFile];

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
            className={
              clickableFiles.includes(sourceItem.name)
                ? 'clickable-subtle'
                : 'clickable-subtle-disabled'
            }
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
              opacity: clickableFiles.includes(sourceItem.name) ? '1' : '0.6',
              cursor: clickableFiles.includes(sourceItem.name)
                ? 'pointer'
                : 'not-allowed',
            }}
            onClick={
              clickableFiles.includes(sourceItem.name)
                ? () => onFileSelect(sourceItem)
                : undefined
            }
            onKeyDown={handleFakeEvent}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              {sourceItem.isDirectory ? (
                <>
                  <FolderIcon size={14} style={{ marginRight: 6 }} />
                  <span>{sourceItem.name}</span>
                </>
              ) : (
                <>
                  {clickableFiles.includes(sourceItem.name) ? (
                    <FileIcon
                      size={14}
                      style={{ marginRight: 6 }}
                      color={
                        selectedFile?.path === sourceItem.path
                          ? selectedFileValid
                            ? '#ff7a59'
                            : 'rgb(232, 90, 107)'
                          : '#ff7a59'
                      }
                    />
                  ) : (
                    <FileCancelOutlineIcon
                      size={14}
                      style={{ marginRight: 6 }}
                    />
                  )}
                  <span style={{ userSelect: 'none' }}>{sourceItem.name}</span>
                </>
              )}
            </div>

            {selectedFileEdited && selectedFile?.path === sourceItem.path ? (
              <CircleIcon size={10} />
            ) : null}
          </div>

          {item.children.map((child: any, indx: number) =>
            displayDirectory(child, indx)
          )}
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

            {directory?.tree.map((item: any, index: number) =>
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
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: 13,
                letterSpacing: 0.5,
                userSelect: 'none',
              }}
            >
              Open a project.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
