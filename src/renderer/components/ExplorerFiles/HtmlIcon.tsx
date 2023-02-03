import { MdiReactIconProps } from 'mdi-react';
import LanguageHtml5Icon from 'mdi-react/LanguageHtml5Icon';

export const HtmlIcon = (props: MdiReactIconProps) => (
  <LanguageHtml5Icon
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
