import { MdiReactIconProps } from 'mdi-react';
import LanguageTypescriptIcon from 'mdi-react/LanguageTypescriptIcon';

export const TypescriptIcon = (props: MdiReactIconProps) => (
  <LanguageTypescriptIcon
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
