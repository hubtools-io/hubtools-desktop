import { FC, HTMLProps, useEffect, useState } from 'react';
import FolderRemoveIcon from 'mdi-react/FolderRemoveIcon';
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
    onCloseProject: () => void;
    onOpenProject: () => void;
    selectedFile?: any;
    selectedFileEdited?: boolean;
    selectedFileValid?: boolean;
};

export const ExplorerFiles: FC<ExplorerFilesProps> = ({
    directory,
    directoryLoading,
    onCloseProject,
    onOpenProject,
    onFileSelect,
    selectedFile,
    selectedFileEdited = false,
    selectedFileValid = true,
    ...props
}) => {
    const [directoryTree, setDirectoryTree] = useState<any>();
    const [expanded, setExpanded] = useState<Path[]>([]);

    // On initial load, if there is a directory
    // Build out directory tree based on paths
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
                            {isExpanded &&
                            file.children &&
                            file.children.length > 0
                                ? renderDirectory(file.children)
                                : null}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div
            {...props}
            style={{ paddingTop: 0, paddingBottom: 40, paddingRight: 0 }}
        >
            {directory ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '5px 15px',
                        width: '100%',
                        background: 'red',
                        position: 'sticky',
                        top: 28,
                        left: 0,
                        zIndex: 90,
                        backgroundColor: 'rgb(46, 63, 80)',
                        borderBottom: '1px solid #4f6479',
                    }}
                >
                    <div
                        style={{
                            fontWeight: 600,
                            fontSize: 14,
                        }}
                    >
                        {directory?.name}
                    </div>

                    <div
                        title="Exit Project"
                        role="button"
                        className="clickable"
                        onClick={onCloseProject}
                        onKeyDown={onCloseProject}
                    >
                        <FolderRemoveIcon size={18} />
                    </div>
                </div>
            ) : null}

            <div style={{ paddingTop: 10 }}>
                {directoryTree !== undefined ? (
                    renderDirectory(directoryTree)
                ) : (
                    <div
                        role="button"
                        onClick={onOpenProject}
                        onKeyDown={onOpenProject}
                        className="clickable-subtle"
                        style={{
                            padding: '40px 20px',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0.75,
                        }}
                    >
                        Open Project
                    </div>
                )}
            </div>
        </div>
    );
};
