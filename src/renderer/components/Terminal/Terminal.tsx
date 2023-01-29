import type { FC, HTMLProps } from 'react';
import { HorizontalDragBar } from '../HorizontalDragBar';
import { TitleBar } from '../TitleBar';

export type TerminalProps = HTMLProps<HTMLDivElement>;

export const Terminal: FC<TerminalProps> = ({ children, ...props }) => (
  <div
    {...props}
    style={{ width: '100%', maxHeight: 335, flexShrink: 0, flexGrow: 0 }}
  >
    <HorizontalDragBar />

    <TitleBar>
      <span style={{ userSelect: 'none' }}>Terminal</span>
    </TitleBar>

    {children}
  </div>
);
