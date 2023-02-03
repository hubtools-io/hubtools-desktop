import { MdiReactIconProps } from 'mdi-react';
import CubeIcon from 'mdi-react/CubeIcon';

export const ModuleIcon = (props: MdiReactIconProps) => (
  <CubeIcon
    {...props}
    size={16}
    style={{
      marginRight: 6,
      transform: 'translateY(3px)',
      flexShrink: 0,
      flexGrow: 0,
      color: '#ffffff',
    }}
  />
);
