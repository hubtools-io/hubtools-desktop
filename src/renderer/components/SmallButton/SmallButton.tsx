import type { FC, HTMLProps } from 'react';

export type SmallButtonProps = HTMLProps<HTMLDivElement> & {
  disabled?: boolean;
  onClick?: (event: any) => void;
};

export const SmallButton: FC<SmallButtonProps> = ({
  disabled,
  onClick,
  ...props
}) => {
  const handleFakeEvent = () => {};

  const handleClick = (event: any) => {
    if (disabled) {
      return;
    }

    onClick?.(event);
  };

  return (
    <div
      {...props}
      className="clickable"
      role="button"
      style={{
        fontSize: 11,
        background: '#ffffff',
        color: '#2e3f50',
        height: 22,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '0 8px',
        borderRadius: 4,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
      onClick={handleClick}
      onKeyDown={handleFakeEvent}
    />
  );
};
