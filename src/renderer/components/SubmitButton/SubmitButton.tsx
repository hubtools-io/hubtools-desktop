import type { FC, HTMLProps } from 'react';

export type SubmitButtonProps = HTMLProps<HTMLButtonElement> & {
    disabled?: boolean;
};

export const SubmitButton: FC<SubmitButtonProps> = ({ disabled, ...props }) => {
    return (
        <button
            {...props}
            type="submit"
            className="clickable"
            disabled={disabled}
            style={{
                fontSize: 11,
                background: '#ffffff',
                color: '#2e3f50',
                height: 28,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                padding: '0 8px',
                borderRadius: 4,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                opacity: disabled ? 0.3 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                userSelect: 'none',
                width: '100%',
            }}
        />
    );
};
