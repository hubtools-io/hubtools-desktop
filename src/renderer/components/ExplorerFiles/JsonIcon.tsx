import { MdiReactIconProps } from 'mdi-react';
import CodeBracesIcon from 'mdi-react/CodeBracesIcon';

export const JsonIcon = (props: MdiReactIconProps) => (
  <CodeBracesIcon
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
