import { FC, forwardRef, HTMLProps } from 'react';
import CloseIcon from 'mdi-react/CloseIcon';

export type InputProps = HTMLProps<HTMLInputElement> & {
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

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      color = 'dark',
      disabled = false,
      error,
      helpText,
      label,
      required = false,
      type = 'text',
      wrapperStyle,
      ...props
    },
    ref
  ) => (
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

        <input
          {...props}
          ref={ref}
          type={type}
          required={required}
          style={{
            width: '100%',
            padding: 10,
            color: '#ffffff',
            fontSize: 16,
            borderRadius: 4,
            marginBottom: 0,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
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
  )
);
