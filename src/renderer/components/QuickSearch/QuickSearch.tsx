import MagnifyIcon from 'mdi-react/MagnifyIcon';
import type { FC, HTMLProps } from 'react';
import { Input } from '../Input';

export type QuickSearchProps = HTMLProps<HTMLInputElement> & {
  inputSize?: 'large' | 'small';
  wrapper?: HTMLProps<HTMLDivElement>;
};

export const QuickSearch: FC<QuickSearchProps> = ({
  inputSize = 'small',
  wrapper,
  ...props
}) => (
  <div
    {...wrapper}
    style={{
      position: 'relative',
      width: '100%',
      maxWidth: 400,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  >
    <Input
      autoFocus
      {...props}
      inputSize={inputSize}
      placeholder="Quick search"
    />
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: inputSize === 'small' ? 30 : 50,
        height: inputSize === 'small' ? 24 : 44,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MagnifyIcon size={inputSize === 'small' ? 14 : 20} />
    </div>
  </div>
);
