import type { FC, HTMLProps } from 'react';
import { uiDimensions } from '../../utils';

export type LayoutViewBarProps = HTMLProps<HTMLDivElement>;

export const LayoutViewBar: FC<LayoutViewBarProps> = (props) => (
    <div
        {...props}
        style={{
            position: 'absolute',
            zIndex: 10,
            top: uiDimensions.navbar,
            left: uiDimensions.explorer,
            width: uiDimensions.viewbar,
            height: `calc(100vh - ${uiDimensions.navbar}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#2e3f50',
            padding: '12px 0',
            borderLeft: '1px solid #4f6479',
            borderRight: '1px solid #4f6479',
        }}
    />
);
