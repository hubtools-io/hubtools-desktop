import { omit } from 'lodash/fp';
import { FC, HTMLProps, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Field } from '../FrameContext/FrameContext.types';
import { Input } from '../Input';
import { TextArea } from '../Textarea';
import { TitleBar } from '../TitleBar';

export type FieldEditPanelProps = HTMLProps<HTMLDivElement> & {
  onClearEdit?: () => void;
  editingField?: Field;
  values?: any;
};

export const FieldEditPanel: FC<FieldEditPanelProps> = ({
  editingField,
  onClearEdit,
  values,
  ...props
}) => {
  const defaultValues = {
    name: '',
  } as Field;

  const initialValues = editingField
    ? { ...defaultValues, ...editingField }
    : { ...defaultValues };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState,
    formState: { isValidating, errors },
  } = useForm<any>({
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  const submitForm = useCallback((payload: any) => {
    const nextPayload = { ...payload };
  }, []);

  const data = watch();

  useEffect(() => {
    if (formState.isValid && !isValidating) {
      submitForm(data);
    }
  }, [formState, data, isValidating, submitForm]);

  const handleFieldChange = (event: any, label: string) => {};

  return (
    <div
      {...props}
      style={{
        width: 400,
        maxWidth: 400,
        minWidth: 400,
        flexBasis: 400,
        flexShrink: 0,
        flexGrow: 1,
        backgroundColor: '#1E1E1E',
        borderLeft: '2px solid #464646',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',

        position: 'sticky',
        top: 0,
        right: 0,
      }}
    >
      <TitleBar dark>
        <span>Edit Field</span>
        {editingField ? (
          <div
            role="button"
            className="clickable"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: 28,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '0 10px',
            }}
            onClick={onClearEdit}
            onKeyDown={() => {}}
          >
            <span
              style={{
                fontSize: 10,
                marginLeft: 2,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              Clear
            </span>
          </div>
        ) : null}
      </TitleBar>
      <div>
        {editingField ? (
          <div
            className="scrollable"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              height: `calc(100vh - 160px)`,
              overflowY: 'auto',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 13,
              letterSpacing: 0.5,
              userSelect: 'none',
              padding: 40,
            }}
          >
            <div
              style={{
                marginTop: 10,
                marginBottom: 20,
                padding: '10px 15px',
                borderRadius: 4,
                background: '#fef4ea',
                width: '100%',
                color: 'rgb(51, 71, 91)',
              }}
            >
              Editing fields with form coming soon.
            </div>
            <div style={{ display: 'block', width: '100%', marginBottom: 25 }}>
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  fontSize: 18,
                  fontWeight: 300,
                  marginBottom: 5,
                  textTransform: 'capitalize',
                  color: '#ffffff',
                }}
              >
                {editingField.label}
              </span>
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                [{editingField.name}]
              </span>
            </div>

            <form onSubmit={handleSubmit(submitForm)} style={{ width: '100%' }}>
              {Object.entries(
                omit(['children', 'internalId'], editingField)
              ).map(([type, value], index: number) => {
                const isObject = value instanceof Object;

                return isObject ? (
                  <TextArea
                    key={index}
                    label={type}
                    placeholder={`${type}...`}
                    {...register(type)}
                    defaultValue={`${JSON.stringify(value, null, 4)}`}
                    onChange={(e) => handleFieldChange(e, type)}
                  />
                ) : (
                  <Input
                    key={index}
                    label={type}
                    placeholder={`${type}...`}
                    {...register(type)}
                    defaultValue={`${value}`}
                    onChange={(e) => handleFieldChange(e, type)}
                  />
                );
              })}
            </form>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: `calc(100vh - 240px)`,
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 13,
              letterSpacing: 0.5,
              userSelect: 'none',
              padding: 40,
            }}
          >
            Select a field to edit.
          </div>
        )}
      </div>
    </div>
  );
};
