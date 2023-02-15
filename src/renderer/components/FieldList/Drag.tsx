import { FC, ReactNode } from 'react';
import {
    Draggable,
    DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';

export type DragProps = any & {
    id: string;
    index: number;
    className: string;
    children?: ReactNode | ReactNode[];
};

export const Drag: FC<DragProps> = ({ children, id, index, ...props }) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...props}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <div
                                className="drag-handle"
                                {...provided.dragHandleProps}
                                style={{
                                    background: 'transparent',
                                    width: 110,
                                    height: 80,
                                    position: 'absolute',
                                    top: 3,
                                    left: 1,
                                }}
                            />
                            {children}
                        </div>
                    </div>
                );
            }}
        </Draggable>
    );
};
