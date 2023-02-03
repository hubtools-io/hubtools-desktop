import { MdiReactIconProps } from 'mdi-react';
import InformationOutlineIcon from 'mdi-react/InformationOutlineIcon';

export const MetaIcon = (props: MdiReactIconProps) => (
  <InformationOutlineIcon
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
