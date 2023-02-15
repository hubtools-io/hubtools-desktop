import type { FC, HTMLProps } from 'react';

export type FieldEditorFrameProps = HTMLProps<HTMLDivElement>;

export const FieldEditorFrame: FC<FieldEditorFrameProps> = (props) => (
    <div
        {...props}
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            flexDirection: 'row',
            width: '100%',
        }}
    />
);
