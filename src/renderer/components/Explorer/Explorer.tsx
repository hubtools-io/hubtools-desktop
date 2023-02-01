import type { FC, HTMLProps } from 'react';
import { uiDimensions } from 'renderer/utils';
import EyeOutlineIcon from 'mdi-react/EyeOutlineIcon';
import EyeOffOutlineIcon from 'mdi-react/EyeOffOutlineIcon';
import { TitleBar } from '../TitleBar';

export type ExplorerProps = HTMLProps<HTMLDivElement> & {
  onHide?: () => void;
  hide?: boolean;
  canHide?: boolean;
};

export const Explorer: FC<ExplorerProps> = ({
  children,
  onHide,
  canHide = false,
  hide = false,
  ...props
}) => (
  <div
    {...props}
    className="scrollable"
    style={{
      width: '100%',
      flexShrink: 1,
      flexGrow: 1,
      maxHeight: `calc(100vh - ${uiDimensions.explorerHeight}px)`,
      overflowY: 'auto',
    }}
  >
    <TitleBar>
      <span style={{ userSelect: 'none' }}>File Explorer</span>
      {canHide ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: 28,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 10,
            opacity: 0.75,
          }}
          className="clickable"
          role="button"
          onClick={onHide}
          onKeyDown={() => {}}
        >
          {hide ? (
            <>
              <EyeOutlineIcon size={14} style={{ marginRight: 6 }} />
              <span
                style={{
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                Show
              </span>
            </>
          ) : (
            <>
              <EyeOffOutlineIcon size={14} style={{ marginRight: 6 }} />
              <span
                style={{
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                Hide
              </span>
            </>
          )}
        </div>
      ) : null}
    </TitleBar>

    {children}
  </div>
);
