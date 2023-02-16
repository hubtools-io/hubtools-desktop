import FileOutlineIcon from 'mdi-react/FileOutlineIcon';
import { cloneElement, HTMLProps } from 'react';
import { hubId } from '../FrameContext/utils';
import { extensionIcons, extensionIconSize } from './utils';

export type FileIconProps = HTMLProps<HTMLDivElement> & {
    file: any;
};

export const FileIcon = ({ file }: FileIconProps) => {
    const fileExt = file?.extension ? file.extension : null;
    const element = fileExt in extensionIcons ? extensionIcons[fileExt] : null;

    const iconProps = {
        size: extensionIconSize,
        style: {
            marginRight: 6,
            transform: 'translateY(2px)',
            flexGrow: 0,
            flexShrink: 0,
        },
    };

    return element ? (
        cloneElement(element, {
            ...element.props,
            ...iconProps,
        })
    ) : (
        <FileOutlineIcon {...iconProps} />
    );
};
