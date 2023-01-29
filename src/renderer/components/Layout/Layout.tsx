import type { FC, HTMLProps } from 'react';

export type LayoutProps = HTMLProps<HTMLDivElement>;

export const Layout: FC<LayoutProps> = (props) => <div {...props} />;
