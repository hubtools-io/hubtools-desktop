import { FC } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

export type DropProps = any & {
    index: number;
    type: DroppableProps['type'];
    id: DroppableProps['droppableId'];
    className: string;
};

export const Drop: FC<DropProps> = ({ children, id, type, ...props }) => {
    return (
        <Droppable droppableId={id} type={type}>
            {(provided) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        {...props}
                    >
                        {children}
                        {provided.placeholder}
                    </div>
                );
            }}
        </Droppable>
    );
};
