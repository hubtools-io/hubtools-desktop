import { useFormContext } from 'react-hook-form';

type Option = {
    value: any;
    label: string;
};

type ControlProps = {
    inputType: string;
    name: string;
    defaultValue: any;
    options?: Option[];
};

export const DynamicControl = ({
    defaultValue,
    inputType,
    name,
    options = [],
}: ControlProps) => {
    const { register } = useFormContext();

    switch (inputType) {
        case 'text':
            return (
                <input
                    type="text"
                    {...register(name)}
                    defaultValue={
                        defaultValue !== undefined ? defaultValue : null
                    }
                />
            );
        case 'textarea':
            return (
                <textarea rows={10} {...register(name)}>
                    {defaultValue !== undefined ? defaultValue : null}
                </textarea>
            );
        case 'select': {
            return (
                <select
                    {...register(name)}
                    defaultValue={defaultValue}
                    name={name}
                    id={name}
                >
                    {options.map((o, index) => (
                        <option key={index} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            );
        }
        case 'number':
            return (
                <input
                    type="number"
                    {...register(name)}
                    defaultValue={defaultValue}
                />
            );
        default:
            return <input type="text" />;
    }
};
