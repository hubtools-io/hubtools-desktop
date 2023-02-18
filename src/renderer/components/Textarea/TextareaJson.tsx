import { FC, HTMLProps, useEffect, useState } from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import { AssertsShape } from 'yup/lib/object';
import {
    Control,
    FieldError,
    FieldErrorsImpl,
    Merge,
    useController,
} from 'react-hook-form';

export type TextareaJsonProps = HTMLProps<HTMLTextAreaElement> & {
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    helpText?: string;
    ignoreMargin?: boolean;
    inputSize?: 'xsmall' | 'small' | 'medium';
    isClearable?: boolean;
    onClear?: () => void;
    label?: string;
    required?: boolean;
    wrapperStyle?: any;
    control: Control<AssertsShape<any>> | Control<any, Record<any, any>>;
    name: string;
};

export const TextareaJson: FC<TextareaJsonProps> = ({
    children,
    color = 'dark',
    disabled = false,
    error,
    helpText,
    name,
    ignoreMargin = false,
    inputSize = 'medium',
    isClearable = false,
    label,
    onClear,
    required = false,
    type = 'text',
    wrapperStyle,
    control,
    onChange,
    ...props
}) => {
    const {
        field: { value, onChange: innerOnChange, onBlur },
    } = useController({ name, control });

    const handleChange = (e: any) => {
        let nextValue = e.target.value;

        try {
            nextValue = JSON.parse(nextValue);
            nextValue = JSON.stringify(nextValue, undefined, 4);
        } catch (err) {
            nextValue = e.target.value;
        }

        innerOnChange(nextValue);

        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div style={{ width: '100%', marginBottom: 18, ...wrapperStyle }}>
            {!!label && (
                <p
                    style={{
                        marginBottom: 4,
                        color: 'rgba(255, 255, 255, 0.6)',
                        textTransform: 'capitalize',
                    }}
                >
                    <span>{label}</span>
                    {required && <p style={{ color: 'red' }}>*</p>}
                </p>
            )}
            <div>
                {required && <div title="Field is required" />}

                <textarea
                    {...props}
                    disabled={disabled}
                    rows={12}
                    spellCheck={false}
                    className="scrollable-dark input-component"
                    style={{
                        width: '100%',
                        padding: 10,
                        backgroundColor: '#262727',
                        color: '#ffffff',
                        fontSize: 14,
                        borderRadius: 4,
                        resize: 'none',
                        marginBottom: 0,
                        opacity: disabled ? 0.5 : 1,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    value={value === null || value === undefined ? '' : value}
                    onChange={(e) => handleChange(e)}
                />

                {isClearable && (
                    <div role="button" onClick={onClear} onKeyDown={() => {}}>
                        <CloseIcon />
                    </div>
                )}
            </div>

            {!!error && <p style={{ color: 'red' }}>{`${error}`}</p>}

            {!!helpText && <p>{helpText}</p>}
        </div>
    );
};
