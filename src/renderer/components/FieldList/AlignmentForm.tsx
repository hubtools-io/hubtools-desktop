import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC, HTMLProps, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Field } from '../FrameContext/FrameContext.types';
import { Input } from '../Input';
import { Select } from '../Select';
import { TextArea } from '../Textarea';
import { TextareaJson } from '../Textarea/TextareaJson';
import { SubmitButton } from '../SubmitButton';

export type AlignmentFormProps = HTMLProps<HTMLDivElement> & {
    onClearEdit?: () => void;
    onSubmit?: (payload: any) => void;
    editingField?: Field;
    values?: any;
};

export const AlignmentForm: FC<AlignmentFormProps> = ({
    editingField,
    onSubmit,
}) => {
    const fieldSchema = yup.object({
        id: yup.string(),
        name: yup.string().required('Field name is required.'),
        label: yup.string().required('Field name is required.'),
        required: yup.boolean().nullable(true),
        locked: yup.boolean().nullable(true),
        type: yup.string(),
        inline_help_text: yup.string(),
        help_text: yup.string(),
        visibility: yup.mixed(),
        display_width: yup.string().nullable(true),
        alignment_direction: yup.string(),
        default: yup.mixed(),
    });

    type FieldSchema = yup.InferType<typeof fieldSchema>;

    const defaultValues = useMemo(() => {
        return {
            id: '',
            name: 'fdsa',
            label: 'fdsa',
            required: false,
            locked: false,
            type: 'alignment',
            inline_help_text: '',
            help_text: '',
            visibility: undefined,
            display_width: '',
            alignment_direction: 'BOTH',
            default: undefined,
        } as Partial<Field>;
    }, []);

    const initialValues = useMemo(() => {
        const nextField = editingField
            ? {
                  ...defaultValues,
                  ...editingField,
              }
            : { ...defaultValues };

        nextField.default =
            nextField.default !== '' &&
            nextField.default !== undefined &&
            nextField.default !== null
                ? JSON.stringify(nextField.default, null, 4)
                : undefined;

        nextField.visibility =
            nextField.visibility !== '' &&
            nextField.visibility !== undefined &&
            nextField.visibility !== null
                ? JSON.stringify(nextField.visibility, null, 4)
                : undefined;

        return nextField;
    }, [defaultValues, editingField]) as Field;

    const {
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FieldSchema>({
        defaultValues: initialValues as Field,
        resolver: yupResolver(fieldSchema),
        mode: 'all',
    });

    useEffect(() => {
        reset(initialValues);
    }, [reset, initialValues, editingField]);

    const removeEmptyFields = (data: any, dataKey: string[]) => {
        dataKey.forEach((dk) => {
            Object.keys(data).forEach((key) => {
                if (key === dk && data[key] === '') {
                    delete data[key];
                }
            });
        });
        return data;
    };

    const removeNullFields = (data: any) => {
        Object.keys(data).forEach((key) => {
            if (data[key] === null) {
                delete data[key];
            }
        });
        return data;
    };

    const parseJsonFields = (fieldValue: any) => {
        let nextValue = fieldValue;

        try {
            nextValue = JSON.parse(nextValue);
        } catch (err) {
            nextValue = fieldValue;
        }

        return nextValue;
    };

    const submitForm = useCallback(
        (payload: any) => {
            const nextPayload = removeNullFields(payload);
            const filterednextPayload = removeEmptyFields(
                nextPayload,
                Object.keys(initialValues)
            );

            filterednextPayload.default = filterednextPayload.default
                ? parseJsonFields(filterednextPayload.default)
                : undefined;

            filterednextPayload.visibility = filterednextPayload.visibility
                ? parseJsonFields(filterednextPayload.visibility)
                : undefined;

            onSubmit?.(filterednextPayload);
        },
        [initialValues, onSubmit]
    );

    const handleIdChange = (event: any) => {
        setValue('id', event.target.value);
    };

    const handleNameChange = (event: any) => {
        setValue('name', event.target.value);
    };

    const handleLabelChange = (event: any) => {
        setValue('label', event.target.value);
    };

    const handleTypeChange = (event: any) => {
        setValue('type', event.target.value);
    };

    if (!editingField) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} style={{ width: '100%' }}>
            <Input
                {...register('id')}
                label="ID"
                placeholder="ID"
                onChange={(e) => handleIdChange(e)}
                error={errors?.id?.message}
                helpText="The field's unique ID, which is set by HubSpot. When building locally you do not need to specify this ID."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />

            <Input
                {...register('name')}
                spellCheck={false}
                label="Name"
                required
                placeholder="Enter name..."
                autoFocus
                onChange={(e) => handleNameChange(e)}
                error={errors?.name?.message}
                helpText="The field's name, which you'll reference when incorporating the field and its values in the module or theme. Cannot contain spaces or special characters."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />

            <Input
                {...register('label')}
                label="Label"
                required
                placeholder="Enter label..."
                onChange={(e) => handleLabelChange(e)}
                error={errors?.label?.message}
                helpText="The text the content creator sees describing the field. May contain spaces."
            />

            <Select
                control={control}
                name="required"
                label="Required"
                options={[
                    { value: true, label: 'Required' },
                    { value: false, label: 'Not required' },
                ]}
                controlShouldRenderValue
                error={errors?.required?.message}
                helpText="Sets whether the field can be left blank in the editor. If true, content cannot be published without a value in the field."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />

            <Select
                control={control}
                name="locked"
                label="Locked"
                options={[
                    { value: true, label: 'Locked' },
                    { value: false, label: 'Not locked' },
                ]}
                controlShouldRenderValue
                error={errors?.locked?.message}
                helpText="Sets whether the field is editable in the content editor. If true, the field will not appear in the content editor."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />

            <Input
                {...register('type')}
                label="Type"
                disabled
                onChange={(e) => handleTypeChange(e)}
                error={errors?.type?.message}
                helpText="The type of field. Field types are unique per field and can be found within the documentation for each field below."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />

            <TextArea
                name="inline_help_text"
                control={control}
                label="Inline Help Text"
                error={errors?.inline_help_text?.message}
                helpText="Text that displays inline below field's label (limit 400 characters). Best used for information required to use the field."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />

            <TextArea
                name="help_text"
                control={control}
                label="Help Text"
                error={errors?.help_text?.message}
                helpText="Text that displays in the editor within a tooltip on hover to assist the content creator (limit 300 characters). Best used for information that is supplementary but not required to use the field."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />

            <TextareaJson
                control={control}
                {...register('visibility')}
                label="Visibility"
                helpText="Sets the field's display conditions. For example, you can set a field to only display when another checkbox field has been selected."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />

            <Select
                control={control}
                name="display_width"
                label="Display Width"
                options={[
                    { value: 'full_width', label: 'Full Width' },
                    { value: 'half_width', label: 'Half Width' },
                ]}
                controlShouldRenderValue
                error={errors?.display_width?.message}
                helpText="By default, fields are full-width in the editor. When two consecutive fields in the fields.json file are set to half_width, they will instead appear next to each other in the editor."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />

            <div>
                <h4 style={{ color: 'white', marginBottom: 26 }}>
                    Field Type Specific Fields
                </h4>

                <TextareaJson
                    control={control}
                    {...register('default')}
                    label="Default"
                    helpText="Default Field Value"
                />
            </div>

            <div style={{ height: 80 }} />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    padding: '10px 20px',
                    background: '#1E1E1E',
                    borderTop: '1px solid #464646',
                }}
            >
                <SubmitButton>Save Field</SubmitButton>
            </div>
        </form>
    );
};
