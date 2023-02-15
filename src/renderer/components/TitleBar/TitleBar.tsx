import type { FC, HTMLProps } from 'react';

export type TitleBarProps = HTMLProps<HTMLDivElement> & {
    dark?: boolean;
};

export const TitleBar: FC<TitleBarProps> = ({ dark = false, ...props }) => (
    <div
        {...props}
        style={{
            position: 'sticky',
            top: 0,
            left: 0,
            zIndex: 2,
            backgroundColor: dark ? '#1E1E1E' : 'rgb(46, 63, 80)',
            borderBottom: dark ? '1px solid #464646' : '1px solid #4f6479',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 28,
            color: 'rgba(255,255,255,0.75)',
            fontSize: 11,
            textTransform: 'uppercase',
            userSelect: 'none',
        }}
    />
);
