import { FC } from 'react';

export type NoChildrenProps = {
  condensed?: boolean;
};

export const NoChildren: FC<NoChildrenProps> = ({ condensed, ...props }) => {
  return (
    <li
      className={condensed ? 'between-add-condensed' : 'between-add'}
      {...props}
    >
      <span
        style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 13,
          letterSpacing: 0.5,
          userSelect: 'none',
          display: 'block',
          marginBottom: condensed ? 0 : 10,
        }}
      >
        Group has no children.
      </span>
    </li>
  );
};
