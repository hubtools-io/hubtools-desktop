import type { FC } from 'react';

export type KindProps = {
  kind: string;
  muted?: boolean;
};

export const Kind: FC<KindProps> = ({ muted = false, kind }) => (
  <div
    style={{
      opacity: 0.75,
      textTransform: 'uppercase',
      fontSize: 11,
      color: 'white',
      backgroundColor: muted ? 'rgba(46, 46, 46, 0.7)' : 'rgba(0, 145, 174, 1)',
      padding: '3px 6px',
      borderRadius: 4,
      letterSpacing: 1,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}
  >
    {kind}
  </div>
);
