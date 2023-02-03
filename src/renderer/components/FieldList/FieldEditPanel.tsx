import { omit } from 'lodash/fp';
import { FC, HTMLProps, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Field } from '../FrameContext/FrameContext.types';
import { Input } from '../Input';
import { TextArea } from '../Textarea';
import { TitleBar } from '../TitleBar';
import { AlignmentForm } from './AlignmentForm';

export type FieldEditPanelProps = HTMLProps<HTMLDivElement> & {
  onClearEdit?: () => void;
  onSubmit?: (payload: any) => void;
  editingField?: Field;
  values?: any;
};

export const FieldEditPanel: FC<FieldEditPanelProps> = ({
  editingField,
  onClearEdit,
  onSubmit,
  values,
  ...props
}) => {
  // useEffect(() => {
  //   const section = document.querySelector(`#edit-form-scroll`);

  //   if (!(section instanceof HTMLElement)) {
  //     return;
  //   }

  //   section.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [editingField]);

  return (
    <div
      {...props}
      style={{
        width: 340,
        maxWidth: 340,
        minWidth: 340,
        flexBasis: 340,
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
              Close
            </span>
          </div>
        ) : null}
      </TitleBar>
      <div>
        {editingField ? (
          <div
            id="edit-form-scroll"
            className="scrollable-dark"
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
              padding: '20px 20px',
            }}
          >
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

            <AlignmentForm
              {...props}
              editingField={editingField}
              onSubmit={onSubmit}
            />
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
