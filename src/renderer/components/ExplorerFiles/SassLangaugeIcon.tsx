import { MdiReactIconProps } from 'mdi-react';
import SassIcon from 'mdi-react/SassIcon';

export const SassLangaugeIcon = (props: MdiReactIconProps) => (
  <SassIcon
    {...props}
    size={14}
    style={{
      marginRight: 6,
      transform: 'translateY(2px)',
      flexShrink: 0,
      flexGrow: 0,
    }}
    color="#ffffff"
  />
);
