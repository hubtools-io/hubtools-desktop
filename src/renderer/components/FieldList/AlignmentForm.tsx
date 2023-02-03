import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC, HTMLProps, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { AlignmentField } from '../FrameContext/FrameContext.types';
import { Input } from '../Input';
import { SmallButton } from '../SmallButton';

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
    visibility: yup.string(),
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
      required: null,
      locked: null,
      type: 'alignment',
      inline_help_text: '',
      help_text: '',
      visibility: '',
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
      ? { ...defaultValues, ...editingField }
      : { ...defaultValues };
  }, [defaultValues, editingField]) as AlignmentField;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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

  const handleRequiredChange = (event: any) => {
    setValue('required', event.target.value);
  };

  const handleLockedChange = (event: any) => {
    setValue('locked', event.target.value);
  };

  const handleTypeChange = (event: any) => {
    setValue('type', event.target.value);
  };

  const handleInlineHelpTextChange = (event: any) => {
    setValue('inline_help_text', event.target.value);
  };

  const handleHelpTextChange = (event: any) => {
    setValue('help_text', event.target.value);
  };

  const handleVisibilityChange = (event: any) => {
    setValue('visibility', event.target.value);
  };

  const handleDisplayWidthChange = (event: any) => {
    setValue('display_width', event.target.value);
  };

  const handleAlignmentDirectionChange = (event: any) => {
    setValue('alignment_direction', event.target.value);
  };

  const handleHorizontalAlignChange = (event: any) => {
    setValue('default.horizontal_align', event.target.value);
  };

  const handleVerticalAlignChange = (event: any) => {
    setValue('default.vertical_align', event.target.value);
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

      <Input
        {...register('required')}
        label="Required"
        onChange={(e) => handleRequiredChange(e)}
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

      <Input
        {...register('locked')}
        label="Locked"
        onChange={(e) => handleLockedChange(e)}
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

      <Input
        {...register('inline_help_text')}
        label="Inline Help Text"
        onChange={(e) => handleInlineHelpTextChange(e)}
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

      <Input
        {...register('help_text')}
        label="Help Text"
        onChange={(e) => handleHelpTextChange(e)}
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

      <Input
        {...register('visibility')}
        label="Visibility"
        onChange={(e) => handleVisibilityChange(e)}
        error={errors?.visibility?.message}
        helpText="Sets the field's display conditions. For example, you can set a field to only display when another checkbox field has been selected. Learn more about visibility."
      />

      <hr
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          marginBottom: 20,
          marginTop: 0,
        }}
      />

      <Input
        {...register('display_width')}
        label="Display Width"
        onChange={(e) => handleDisplayWidthChange(e)}
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

          <Input
            {...register('default.horizontal_align')}
            label="Default: Horizontal Align"
            onChange={(e) => handleHorizontalAlignChange(e)}
            helpText="Part of the default object containing horizontal_align and vertical_align"
          />

          <Input
            {...register('default.vertical_align')}
            label="Default: Vertical Align"
            onChange={(e) => handleVerticalAlignChange(e)}
            helpText="Part of the default object  containing horizontal_align and vertical_align"
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
