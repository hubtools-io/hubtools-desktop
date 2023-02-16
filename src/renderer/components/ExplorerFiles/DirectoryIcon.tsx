import { MdiReactIconProps } from 'mdi-react';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import FolderIcon from 'mdi-react/FolderIcon';
import { extensionIconSize } from './utils';

export type DirectoryIconProps = MdiReactIconProps & {
    expanded?: boolean;
};

export const DirectoryIcon = ({
    expanded = false,
    ...props
}: DirectoryIconProps) => (
    <>
        {expanded ? (
            <ChevronDownIcon
                {...props}
                size={extensionIconSize + 2}
                style={{
                    marginRight: 6,
                    transform: 'translateY(1px)',
                    flexGrow: 0,
                    flexShrink: 0,
                }}
            />
        ) : (
            <ChevronRightIcon
                {...props}
                size={extensionIconSize + 2}
                style={{
                    marginRight: 6,
                    transform: 'translateY(1px)',
                    flexGrow: 0,
                    flexShrink: 0,
                }}
            />
        )}
        <FolderIcon
            {...props}
            size={extensionIconSize}
            style={{
                marginRight: 6,
                transform: 'translateY(2px)',
                flexGrow: 0,
                flexShrink: 0,
            }}
        />
    </>
);
