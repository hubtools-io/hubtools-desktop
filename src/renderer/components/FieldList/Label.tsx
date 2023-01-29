import type { FC } from 'react';

export type LabelProps = {
  label: string;
};

export const Label: FC<LabelProps> = ({ label }) => (
  <span
    style={{
      fontSize: 16,
      fontWeight: 600,
      marginRight: 6,
      marginBottom: 4,
    }}
  >
    {label}
  </span>
);
