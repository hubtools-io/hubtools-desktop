import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC, HTMLProps, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { AlignmentField } from '../FrameContext/FrameContext.types';
import { Input } from '../Input';
import { SmallButton } from '../SmallButton';
import { Select } from '../Select';
import { TextArea } from '../Textarea';

export type AlignmentFormProps = HTMLProps<HTMLDivElement> & {
    onClearEdit?: () => void;
    onSubmit?: (payload: any) => void;
    editingField?: AlignmentField;
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
        custom_visibility: yup.boolean(),
        visibility: yup
            .object({
                controlling_field: yup.string(),
                controlling_value_regex: yup.string(),
                property: yup.string(),
                operator: yup.string(),
            })
            .nullable(true),
        display_width: yup.string(),
        alignment_direction: yup.string(),
        default: yup.object({
            horizontal_align: yup.string(),
            vertical_align: yup.string(),
        }),
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
            custom_visibility: false,
            visibility: null,
            display_width: '',
            alignment_direction: 'BOTH',
            default: {
                horizontal_align: 'CENTER',
                vertical_align: 'TOP',
            },
        } as AlignmentField;
    }, []);

    const initialValues = useMemo(() => {
        return editingField
            ? {
                  ...defaultValues,
                  ...editingField,
              }
            : { ...defaultValues };
    }, [defaultValues, editingField]) as AlignmentField;
    console.log(initialValues.visibility?.controlling_field, 'initialValues');

    const {
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<FieldSchema>({
        defaultValues: initialValues as AlignmentField,
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

    const submitForm = useCallback(
        (payload: any) => {
            const nextPayload = removeNullFields(payload);
            const filterednextPayload = removeEmptyFields(nextPayload, [
                'id',
                'locked',
                'inline_help_text',
                'help_text',
                'visibility',
                'display_width',
            ]);

            onSubmit?.(filterednextPayload);
        },
        [onSubmit]
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

    const handleAlignmentDirectionChange = (event: any) => {
        setValue('alignment_direction', event.target.value);
    };

    const handleVisibilityControllingFieldChange = (event: any) => {
        setValue('visibility.controlling_field', event.target.value);
    };

    const handleVisibilityControllingValueRegexChange = (event: any) => {
        setValue('visibility.controlling_value_regex', event.target.value);
    };

    const handleVisibilityPropertyChange = (event: any) => {
        setValue('visibility.property', event.target.value);
    };

    const handleVisibilityOperatorChange = (event: any) => {
        setValue('visibility.operator', event.target.value);
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

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />
            <Input
                name="visibility.controlling_field"
                label="Visibility Controlling Field"
                onChange={(e) => handleVisibilityControllingFieldChange(e)}
                error={errors?.visibility?.controlling_field?.message}
                helpText="The name of the field that controls the display condition."
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />
            <Input
                name="visibility.controlling_value_regex"
                label="Visibility Controlling Value Regex"
                onChange={(e) => handleVisibilityControllingValueRegexChange(e)}
                error={errors?.visibility?.controlling_value_regex?.message}
                helpText="The regular expression in the controlling field that needs to be present for the field to display. The regex must match the entire string (not a subset) and is run case-sensitively."
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
                name="visibility.property"
                label="Visibility Property"
                error={errors?.visibility?.property?.message}
                options={[
                    { value: 'NOT_EQUAL', label: 'NOT_EQUAL' },
                    { value: 'EQUAL', label: 'EQUAL' },
                    { value: 'EMPTY', label: 'EMPTY' },
                    { value: 'NOT_EMPTY', label: 'NOT_EMPTY' },
                    { value: 'MATCHES_REGEX', label: 'MATCHES_REGEX' },
                ]}
                controlShouldRenderValue
                helpText="The operator that defines how the controlling_value_regex value needs to be met. Operators can be one of: NOT_EQUAL, EQUAL, EMPTY, NOT_EMPTY, MATCHES_REGEX"
            />

            <hr
                style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    marginBottom: 20,
                    marginTop: 0,
                }}
            />
            <Input
                name="visibility.operator"
                label="Visibility Operator"
                onChange={(e) => handleVisibilityOperatorChange(e)}
                error={errors?.visibility?.operator?.message}
                helpText="Sets visibility based on a specific property of the target field. For example, you can enable visibility when an image field's src property is equal to a specific value. By default, if no value is provided for this field, visibility is based on the stringified value of controlling_value_regex."
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

            {editingField.type === 'alignment' ? (
                <div>
                    <h4 style={{ color: 'white', marginBottom: 26 }}>
                        Field Type Specific Fields
                    </h4>

                    <Input
                        {...register('alignment_direction')}
                        label="Alignment Direction"
                        onChange={(e) => handleAlignmentDirectionChange(e)}
                        error={errors?.alignment_direction?.message}
                        helpText="Determines if only horizontal, only vertical, or both alignment controls should be shown."
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
                        name="default.horizontal_align"
                        label="Default Horizontal Align"
                        options={[{ value: 'CENTER', label: 'CENTER' }]}
                        controlShouldRenderValue
                        error={errors?.default?.horizontal_align?.message}
                        helpText="By default, fields are full-width in the editor. When two consecutive fields in the fields.json file are set to half_width, they will instead appear next to each other in the editor."
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
                        name="default.vertical_align"
                        label="Default Vertical Align"
                        options={[{ value: 'CENTER', label: 'CENTER' }]}
                        controlShouldRenderValue
                        error={errors?.default?.vertical_align?.message}
                        helpText="By default, fields are full-width in the editor. When two consecutive fields in the fields.json file are set to half_width, they will instead appear next to each other in the editor."
                    />
                </div>
            ) : null}

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
                <button
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                    style={{
                        fontSize: 11,
                        background: '#ffffff',
                        color: '#2e3f50',
                        height: 30,
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                        padding: '0 8px',
                        borderRadius: 4,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                    }}
                >
                    Save Field
                </button>
            </div>
        </form>
    );
};
