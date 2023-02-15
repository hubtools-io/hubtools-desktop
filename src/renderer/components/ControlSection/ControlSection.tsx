import type { FC, HTMLProps } from 'react';

export type ControlSectionProps = HTMLProps<HTMLDivElement> & {
    flexAlign?: 'flex-start' | 'center' | 'flex-end';
};

export const ControlSection: FC<ControlSectionProps> = ({
    flexAlign = 'flex-start',
    ...props
}) => (
    <div
        {...props}
        style={{
            display: 'flex',
            justifyContent: flexAlign,
            alignItems: 'center',
            width: '100%',
        }}
    />
);
