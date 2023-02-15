import type { FC, HTMLProps } from 'react';
import { Drag } from './Drag';
import { Drop } from './Drop';

export type FieldItemChildrenProps = HTMLProps<HTMLDivElement> & {
    item: any;
    level: number;
};

export const FieldItemChildren: FC<FieldItemChildrenProps> = ({
    item,
    level,
}) => (
    <Drop key={item.internalId} id={item.internalId} type="droppable-item">
        {item.children.map((i: any, ix: any) => {
            return <div />;
        })}
    </Drop>
);
