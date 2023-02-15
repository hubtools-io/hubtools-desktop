import { FC, forwardRef, HTMLProps } from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import ReactSelect, { ActionMeta, Props, SingleValue } from 'react-select';
import { Control, useController } from 'react-hook-form';
import { AssertsShape } from 'yup/lib/object';
import { chain } from 'lodash';

export interface SelectOption {
    value: number | string;
    label: string;
}

export type SelectProps = Props & {
    disabled?: boolean;
    error?: string;
    helpText?: string;
    ignoreMargin?: boolean;
    inputSize?: 'xsmall' | 'small' | 'medium';
    isClearable?: boolean;
    onClear?: () => void;
    onChange?: (
        next: SingleValue<SelectOption>,
        meta: ActionMeta<SelectOption>
    ) => void;
    label?: string;
    required?: boolean;
    wrapperStyle?: any;
    name: string;
    control: Control<AssertsShape<any>> | Control<any, Record<any, any>>;
    valuesGrouped?: boolean;
};

export const Select = ({
    disabled = false,
    error,
    helpText,
    label,
    required = false,
    wrapperStyle,
    options,
    onChange,
    name,
    control,
    valuesGrouped,
    ...props
}: SelectProps) => {
    const selectOverrides = {
        menu: () => ({
            background: '#262727',
            zIndex: 9999,
        }),
        control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            outline: state.isFocused ? 'none' : 'none',
            boxShadow: state.isFocused ? 'none' : 'none',
            border: state.isFocused
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid rgba(255,255,255,0.1)',
            background: '#262727',
        }),
        valueContainer: (baseStyles: any) => ({
            ...baseStyles,
            color: '#fff',
        }),
        input: (styles: any) => ({ ...styles, color: '#fff' }),
        option: (styles: any, state: any) => ({
            ...styles,
            cursor: 'pointer',
            color: state.isFocused
                ? '#1e1e1e'
                : state.isSelected
                ? '#1e1e1e'
                : '#ffffff',
            background: state.isSelected
                ? 'rgba(255,255,255,1)'
                : state.isFocused
                ? 'rgba(255,255,255,0.6)'
                : 'transparent',
        }),
        placeholder: (styles: any) => ({ ...styles, color: '#fff' }),
        singleValue: (styles: any) => ({ ...styles, color: '#fff' }),
    };

    const {
        field: { value, onChange: innerOnChange, onBlur },
    } = useController({ name, control });

    const handleChange = (next: any, meta: any) => {
        const innerNext = props.isMulti
            ? (next as any as SelectOption[]).map((o) => o.value)
            : next.value;

        innerOnChange(innerNext);

        if (onChange) {
            onChange(next, meta);
        }
    };

    const flatOpts = valuesGrouped
        ? chain(options).flatMapDeep('options').value()
        : options;

    let valueOpts: unknown = null;

    // in rare cases, having a select with a value, and then re-rendering the parent form
    // with the value being empty will leave the previous value selected.  This is most apparent
    // when swapping between objects of the same type in builder (i.e. zone 1 -> zone 2).
    if (value !== null || value !== undefined) {
        valueOpts = props.isMulti
            ? flatOpts?.filter((o: any) => value?.includes(o.value))
            : flatOpts?.find((o: any) => o?.value === value);
    }

    return (
        <div
            style={{
                width: '100%',
                marginBottom: 18,
                cursor: disabled ? 'not-allowed' : 'default',
                ...wrapperStyle,
            }}
        >
            {!!label && (
                <p
                    style={{
                        marginBottom: 4,
                        color: 'rgba(255, 255, 255, 0.8)',
                        textTransform: 'capitalize',
                        fontSize: 14,
                    }}
                >
                    <span>{label}</span>
                    {required && (
                        <span
                            style={{
                                color: '#fa6675',
                                marginLeft: 2,
                                display: 'inline-block',
                            }}
                        >
                            *
                        </span>
                    )}
                </p>
            )}
            <div>
                {required && <div title="Field is required" />}

                <ReactSelect
                    {...props}
                    required={required}
                    isDisabled={disabled}
                    options={options}
                    onChange={handleChange}
                    onBlur={onBlur}
                    value={valueOpts}
                    styles={selectOverrides}
                    menuPosition="fixed"
                />
            </div>

            {!!error && (
                <p
                    style={{
                        color: 'red',
                        marginBottom: 4,
                        marginTop: 4,
                        paddingLeft: 4,
                        fontSize: 12,
                    }}
                >
                    {error}
                </p>
            )}

            {!!helpText && (
                <p
                    style={{
                        marginBottom: 4,
                        marginTop: 4,
                        paddingLeft: 4,
                        fontSize: 12,
                        lineHeight: 1.4,
                        paddingBottom: 10,
                        paddingTop: 4,
                        color: 'rgba(255, 255, 255, 0.4)',
                    }}
                >
                    {helpText}
                </p>
            )}
        </div>
    );
};
