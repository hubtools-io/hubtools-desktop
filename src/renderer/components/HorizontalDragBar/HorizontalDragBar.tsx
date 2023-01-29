import DragHorizontalIcon from 'mdi-react/DragHorizontalIcon';
import type { FC, HTMLProps } from 'react';

export type HorizontalDragBarProps = HTMLProps<HTMLDivElement>;

export const HorizontalDragBar: FC<HorizontalDragBarProps> = (props) => (
  <div
    {...props}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 10,
      backgroundColor: 'rgb(37 54 70)',
      cursor: 'ns-resize',
      color: '#4f6479',
      borderTop: '1px solid rgba(79, 100, 121, 0.3)',
      borderBottom: '1px solid rgba(79, 100, 121, 0.3)',
    }}
  >
    <DragHorizontalIcon size={18} />
  </div>
);
