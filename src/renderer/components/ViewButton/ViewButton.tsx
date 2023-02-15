import type { FC, HTMLProps } from 'react';

const size = 34;
const spacing = 4;
const roundness = size / 2;

export const ViewButtonIconSize = 16;

export type ViewButtonProps = HTMLProps<HTMLButtonElement> & {
    active?: boolean;
    disabled?: boolean;
    roundedBottom?: boolean;
    roundedTop?: boolean;
    onClick?: () => void;
};

export const ViewButton: FC<ViewButtonProps> = ({
    active = false,
    disabled = false,
    roundedBottom = false,
    roundedTop = false,
    onClick,
    ...props
}) => {
    const padding = () => {
        let padValue = `${spacing}px 0`;

        if (roundedBottom) {
            padValue = `${spacing}px 0 ${spacing * 2}px`;
        }

        if (roundedTop) {
            padValue = `${spacing * 2}px 0 ${spacing}px`;
        }

        if (roundedBottom && roundedTop) {
            padValue = '0px';
        }

        return padValue;
    };

    const handleClick = (event: any) => {
        if (disabled) {
            return;
        }

        onClick?.(event);
    };

    return (
        <button
            {...props}
            type="button"
            tabIndex={disabled ? -1 : 1}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: active ? '#0091ae' : 'rgba(79, 100, 121, 0.3)',
                color: '#ffffff',
                padding: padding(),
                width: size,
                minHeight: size,
                borderTopLeftRadius: roundedTop ? roundness : 0,
                borderTopRightRadius: roundedTop ? roundness : 0,
                borderBottomLeftRadius: roundedBottom ? roundness : 0,
                borderBottomRightRadius: roundedBottom ? roundness : 0,
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                opacity: disabled ? 0.3 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            onClick={handleClick}
        />
    );
};
