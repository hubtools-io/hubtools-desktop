import { FC, HTMLProps, useEffect, useState } from 'react';
import {
  Directory,
  DirectoryTree,
  DirectoryTreeItem,
  Path,
} from '../FrameContext/FrameContext.types';
import { buildDirectoryTree } from './utils';
import { ExplorerFile } from './ExplorerFile';

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
  const [directoryTree, setDirectoryTree] = useState<any>();
  const [expanded, setExpanded] = useState<Path[]>([]);

  useEffect(() => {
    if (directory) {
      const workingTree = buildDirectoryTree(directory);

      setDirectoryTree(workingTree);
    } else {
      setDirectoryTree(undefined);
    }
  }, [directory]);

  const handleSelectFile = (directoryItem: DirectoryTreeItem) => {
    if (directoryItem.isDirectory) {
      setExpanded((prevValue: Path[]) => {
        const isExpanded = prevValue.includes(directoryItem.path);

        return isExpanded
          ? prevValue.filter((v: any) => v !== directoryItem.path)
          : [...prevValue, directoryItem.path];
      });
    } else {
      onFileSelect(directoryItem);
    }
  };

  const renderDirectory = (files: DirectoryTree) => {
    return files.map((file: DirectoryTreeItem) => {
      const isExpanded = expanded.includes(file.path);

      return (
        <div key={file.path}>
          <div
            style={{
              display: 'block',
              paddingLeft: 20,
            }}
          >
            <ExplorerFile
              onFileSelect={handleSelectFile}
              file={file}
              expanded={isExpanded}
              selectedFile={selectedFile}
              selectedFileValid={selectedFileValid}
            />

            <div>
              {isExpanded && file.children && file.children.length > 0
                ? renderDirectory(file.children)
                : null}
            </div>
          </div>
        </div>
      );
    });
  };

  if (!directoryTree) {
    return null;
  }

  return (
    <div
      {...props}
      style={{ paddingTop: 10, paddingBottom: 40, paddingRight: 20 }}
    >
      {renderDirectory(directoryTree)}
    </div>
  );
};
