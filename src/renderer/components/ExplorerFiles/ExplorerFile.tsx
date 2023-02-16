import type { FC, HTMLProps } from 'react';
import { DirectoryIcon } from './DirectoryIcon';
import { FileIcon } from './FileIcon';
import { determineFileColor } from './utils';

export type ExplorerFileProps = HTMLProps<HTMLDivElement> & {
    file: any;
    expanded?: boolean;
    onFileSelect: (file: any) => void;
    selectedFile?: any;
    selectedFileValid?: boolean;
};

export const ExplorerFile: FC<ExplorerFileProps> = ({
    children,
    file,
    expanded = false,
    onFileSelect,
    selectedFile,
    selectedFileValid = true,
    ...props
}) => (
    <div
        {...props}
        className="clickable-subtle"
        role="button"
        onClick={() => onFileSelect?.(file)}
        onKeyDown={() => onFileSelect?.(file)}
        style={{
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 15.5,
            color: determineFileColor(file, selectedFile, selectedFileValid),
            display: 'flex',
            background:
                selectedFile?.path === file?.path
                    ? 'rgba(255,255,255,0.08)'
                    : 'transparent',
            borderRadius: 4,
            paddingLeft: 5,
            paddingRight: 5,
        }}
    >
        {file.isDirectory ? (
            <DirectoryIcon expanded={expanded} />
        ) : (
            <FileIcon file={file} />
        )}
        <div style={{ userSelect: 'none' }}>{file.name}</div>
    </div>
);
