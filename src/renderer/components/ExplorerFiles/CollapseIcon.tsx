import { MdiReactIconProps } from 'mdi-react';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';

export const CollapseIcon = (props: MdiReactIconProps) => (
  <ChevronRightIcon
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
