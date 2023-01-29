import { FC, HTMLProps } from 'react';
import CloseIcon from 'mdi-react/CloseIcon';

export type TextAreaProps = HTMLProps<HTMLTextAreaElement> & {
  error?: string;
  helpText?: string;
  ignoreMargin?: boolean;
  inputSize?: 'xsmall' | 'small' | 'medium';
  isClearable?: boolean;
  onClear?: () => void;
  label?: string;
  required?: boolean;
  wrapperStyle?: any;
};

export const TextArea: FC<TextAreaProps> = ({
  children,
  color = 'dark',
  disabled = false,
  error,
  helpText,
  ignoreMargin = false,
  inputSize = 'medium',
  isClearable = false,
  label,
  onClear,
  required = false,
  type = 'text',
  wrapperStyle,
  ...props
}) => (
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
        className="scrollable-dark"
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: '#262727',
          border: 0,
          color: '#ffffff',
          fontSize: 16,
          borderRadius: 4,
        }}
      />

      {isClearable && (
        <div role="button" onClick={onClear} onKeyDown={() => {}}>
          <CloseIcon />
        </div>
      )}
    </div>

    {!!error && <p style={{ color: 'red' }}>{error}</p>}

    {!!helpText && <p>{helpText}</p>}
  </div>
);
