import { MdiReactIconProps } from 'mdi-react';
import FormatListBulletedTypeIcon from 'mdi-react/FormatListBulletedTypeIcon';

export const FieldsIcon = (props: MdiReactIconProps) => (
  <FormatListBulletedTypeIcon
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
