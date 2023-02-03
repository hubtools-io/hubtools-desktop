import { MdiReactIconProps } from 'mdi-react';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

export const ExpandIcon = (props: MdiReactIconProps) => (
  <ChevronDownIcon
    {...props}
    size={18}
    style={{
      marginRight: 4,
      transform: 'translateY(4px)',
      flexShrink: 0,
      flexGrow: 0,
    }}
  />
);
