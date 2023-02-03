import { MdiReactIconProps } from 'mdi-react';
import LanguageMarkdownIcon from 'mdi-react/LanguageMarkdownIcon';

export const MarkdownIcon = (props: MdiReactIconProps) => (
  <LanguageMarkdownIcon
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
