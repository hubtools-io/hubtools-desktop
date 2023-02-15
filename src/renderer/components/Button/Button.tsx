import type { FC, HTMLProps } from 'react';

export type ButtonProps = HTMLProps<HTMLDivElement>;

export const Button: FC<ButtonProps> = (props) => (
    <div
        {...props}
        className="clickable"
        style={{
            fontSize: 14,
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 12px',
            borderRadius: 4,
            background: '#0091ae',
            cursor: 'pointer',
            userSelect: 'none',
        }}
    />
);
