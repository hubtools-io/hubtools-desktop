import type { FC, HTMLProps } from 'react';
import { Drag } from './Drag';

export type FieldItemProps = HTMLProps<HTMLDivElement> & {
    item: any;
    index: number;
    level: number;
};

export const FieldItem: FC<FieldItemProps> = ({
    children,
    item,
    index,
    level,
}) => (
    <Drag
        className={`draggable-${level}`}
        key={item.internalId}
        id={item.internalId}
        index={index}
    >
        <div
            className="item"
            style={{
                marginBottom: 20,
                background: 'rgba(255,255,255,0.3)',
            }}
        >
            {item.name}
        </div>

        {item.type === 'group' ? children : null}
    </Drag>
);
