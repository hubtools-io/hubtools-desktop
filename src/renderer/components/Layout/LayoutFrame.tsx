import type { FC, HTMLProps } from 'react';
import { uiDimensions } from '../../utils';

export type LayoutFrameProps = HTMLProps<HTMLDivElement>;

export const LayoutFrame: FC<LayoutFrameProps> = ({ children, ...props }) => (
    <div
        {...props}
        style={{
            position: 'absolute',
            right: 0,
            top:
                uiDimensions.navbar +
                uiDimensions.controlBar +
                uiDimensions.titleBar,
            width: `calc(100vw - ${
                uiDimensions.explorer + uiDimensions.viewbar
            }px)`,
            height: `calc(100vh - ${
                uiDimensions.navbar +
                uiDimensions.controlBar +
                uiDimensions.titleBar
            }px)`,
            zIndex: 8,
        }}
    >
        <div
            {...props}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                background: '#1E1E1E',
            }}
        >
            {children}
        </div>
    </div>
);
