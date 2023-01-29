import type { FC, HTMLProps } from 'react';
import { uiDimensions } from 'renderer/utils';

export type LayoutExplorerProps = HTMLProps<HTMLDivElement>;

export const LayoutExplorer: FC<LayoutExplorerProps> = (props) => (
  <div
    {...props}
    style={{
      position: 'absolute',
      zIndex: 5,
      height: `calc(100vh - ${uiDimensions.navbar}px)`,
      maxHeight: `calc(100vh - ${uiDimensions.navbar}px)`,
      top: uiDimensions.navbar,
      left: 0,
      width: uiDimensions.explorer,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#2e3f50',
      padding: 0,
      boxShadow: '4px 0 20px rgba(46, 63, 80,0.4)',
    }}
  />
);
