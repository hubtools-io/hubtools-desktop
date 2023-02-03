import { MdiReactIconProps } from 'mdi-react';
import FolderIcon from 'mdi-react/FolderIcon';

export const DirectoryIcon = (props: MdiReactIconProps) => (
  <FolderIcon
    {...props}
    size={14}
    style={{
      marginRight: 6,
      transform: 'translateY(2px)',
      flexShrink: 0,
      flexGrow: 0,
    }}
  />
);
