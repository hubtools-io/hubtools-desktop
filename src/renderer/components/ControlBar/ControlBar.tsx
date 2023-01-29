import type { FC, HTMLProps } from 'react';
import { uiDimensions } from 'renderer/utils';

export type ControlBarProps = HTMLProps<HTMLDivElement>;

export const ControlBar: FC<ControlBarProps> = (props) => (
  <div
    {...props}
    style={{
      borderBottom: '1px solid #4f6479',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: uiDimensions.controlBar,
      color: 'rgba(255,255,255,0.75)',
      fontSize: 12,
      boxSizing: 'border-box',
      padding: '0 10px',
    }}
  />
);
