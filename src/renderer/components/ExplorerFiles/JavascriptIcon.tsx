import { MdiReactIconProps } from 'mdi-react';
import LanguageJavascriptIcon from 'mdi-react/LanguageJavascriptIcon';

export const JavascriptIcon = (props: MdiReactIconProps) => (
  <LanguageJavascriptIcon
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
