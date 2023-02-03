import { MdiReactIconProps } from 'mdi-react';
import LanguageCss3Icon from 'mdi-react/LanguageCss3Icon';

export const CSSIcon = (props: MdiReactIconProps) => (
  <LanguageCss3Icon
    {...props}
    size={14}
    style={{
      marginRight: 6,
      transform: 'translateY(3px)',
      flexShrink: 0,
      flexGrow: 0,
    }}
    color="#ffffff"
  />
);
