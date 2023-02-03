import { MdiReactIconProps } from 'mdi-react';
import FileOutlineIcon from 'mdi-react/FileOutlineIcon';

export const DefaultFileIcon = (props: MdiReactIconProps) => (
  <FileOutlineIcon
    {...props}
    size={14}
    style={{
      marginRight: 6,
      transform: 'translateY(1px)',
      flexShrink: 0,
      flexGrow: 0,
    }}
  />
);
