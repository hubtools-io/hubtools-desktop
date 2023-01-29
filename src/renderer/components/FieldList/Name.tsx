import type { FC } from 'react';

export type NameProps = {
  name: string;
};

export const Name: FC<NameProps> = ({ name }) => (
  <span
    style={{
      fontSize: 13,
      fontWeight: 400,
      opacity: 0.75,
      letterSpacing: 0.5,
      display: 'inline-block',
      transform: 'translateY(-1px)',
      marginBottom: 6,
    }}
  >
    [{name}]
  </span>
);
