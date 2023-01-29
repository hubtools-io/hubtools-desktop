import type { FC, HTMLProps } from 'react';
import { uiDimensions } from 'renderer/utils';
import { TitleBar } from '../TitleBar';

export type ExplorerProps = HTMLProps<HTMLDivElement>;

export const Explorer: FC<ExplorerProps> = ({ children, ...props }) => (
  <div
    {...props}
    className="scrollable"
    style={{
      width: '100%',
      flexShrink: 1,
      flexGrow: 1,
      maxHeight: `calc(100vh - ${uiDimensions.explorerHeight}px)`,
      overflowY: 'auto',
    }}
  >
    <TitleBar>
      <span style={{ userSelect: 'none' }}>File Explorer</span>
    </TitleBar>

    {children}
  </div>
);
