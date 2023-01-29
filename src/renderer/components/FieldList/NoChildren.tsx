import { FC } from 'react';

export const NoChildren: FC = (props) => {
  return (
    <li className="between-add" {...props}>
      <span
        style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 13,
          letterSpacing: 0.5,
          userSelect: 'none',
          display: 'block',
          marginBottom: 10,
        }}
      >
        Group has no children.
      </span>
    </li>
  );
};
