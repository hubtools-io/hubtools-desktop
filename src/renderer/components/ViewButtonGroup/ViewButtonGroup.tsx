import type { FC, HTMLProps } from 'react';

export type ViewButtonGroupProps = HTMLProps<HTMLDivElement>;

export const ViewButtonGroup: FC<ViewButtonGroupProps> = (props) => (
  <div {...props} style={{ marginBottom: 15 }} />
);
