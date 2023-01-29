import CloseIcon from 'mdi-react/CloseIcon';
import type { FC, HTMLProps } from 'react';
import { typeIconLookup } from '../FieldList/TypeIcon';

export type ModalItemProps = HTMLProps<HTMLDivElement> & {
  canSelect?: boolean;
  type: string;
  options?: any;
  onAddField?: (option: any, value: boolean) => void;
};

export const ModalItem: FC<ModalItemProps> = ({
  canSelect = true,
  type,
  options,
  onAddField,
  ...props
}) => (
  <div
    {...props}
    style={{
      width: '33%',
      maxWidth: '33%',
      flexBasis: '33%',
      flexShrink: 0,
      padding: '10px 10px',
    }}
  >
    <button
      type="button"
      className={canSelect ? 'clickable' : 'disabled'}
      style={{
        width: '100%',
        backgroundColor: canSelect ? '#ffffff' : '#efefef',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.15)',
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: canSelect ? 'pointer' : 'not-allowed',
      }}
      disabled={!canSelect}
      onClick={
        canSelect ? () => onAddField?.(options.default, false) : undefined
      }
      title={
        canSelect
          ? ''
          : `Field: ${options.label} cannot be added to content tab.`
      }
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
            backgroundColor: '#efefef',
            color: 'rgba(46, 63, 80, 0.4)',
            borderRadius: 5,
          }}
        >
          {Object.entries(typeIconLookup).map(([fieldType, element]: any) => {
            return type === fieldType ? element : null;
          })}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            textAlign: 'left',
          }}
        >
          <span>{options.label}</span>
          {!canSelect ? (
            <span
              style={{ fontSize: 12, display: 'inline-block', marginTop: 2 }}
            >
              Field cannot be added to content tab.
            </span>
          ) : null}
        </div>
      </div>
    </button>
  </div>
);
