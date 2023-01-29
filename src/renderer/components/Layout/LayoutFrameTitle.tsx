import type { FC, HTMLProps } from 'react';
import { uiDimensions } from 'renderer/utils';

export type LayoutFrameTitleProps = HTMLProps<HTMLDivElement>;

export const LayoutFrameTitle: FC<LayoutFrameTitleProps> = (props) => (
  <div
    {...props}
    style={{
      position: 'absolute',
      zIndex: 9,
      top: uiDimensions.navbar,
      left: uiDimensions.explorer + uiDimensions.viewbar,
      width: `calc(100vw - ${uiDimensions.explorer + uiDimensions.viewbar}px)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#2e3f50',
      padding: 0,
    }}
  />
);
