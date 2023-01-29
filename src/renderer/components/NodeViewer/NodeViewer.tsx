import { FC, HTMLProps, useCallback, useEffect, useState } from 'react';
import {
  Canvas,
  CanvasProps,
  Edge,
  Label,
  MarkerArrow,
  Node,
  Port,
} from 'reaflow';
import { uiDimensions, useWindowSize } from 'renderer/utils';
import shortid from 'shortid';

export type Direction = 'DOWN' | 'RIGHT';
export type FieldEdge = any;
export type FieldNode = any;

export type NodeViewerProps = CanvasProps & {
  direction: Direction;
  fields?: any;
  wrapper?: HTMLProps<HTMLDivElement>;
};

export const NodeViewer: FC<NodeViewerProps> = ({
  direction,
  fields = [],
  wrapper,
  ...props
}) => {
  const [windowWidth, windowHeight] = useWindowSize();
  const [nodes, setNodes] = useState<FieldNode[]>([]);
  const [edges, setEdges] = useState<FieldEdge[]>([]);

  const flattenNodes = useCallback((items: FieldNode[], parent: FieldNode) => {
    return items.forEach((node: FieldNode) => {
      const id = shortid();

      const newNode = {
        ...node,
        id,
      };

      const displayNode = {
        id,
        text: `${newNode.label}`,
      };
      setNodes((prev) => [...prev, displayNode]);

      if (parent) {
        const newEdge = {
          id: `${parent.id}-${id}`,
          from: parent.id,
          to: id,
        };
        setEdges((prev) => [...prev, newEdge]);
      }

      if (!!newNode.children && newNode.children.length > 0) {
        flattenNodes(newNode.children, newNode);
      }
    });
  }, []);

  useEffect(() => {
    flattenNodes(fields, null);
  }, [flattenNodes, fields]);

  return (
    <div {...wrapper}>
      <Canvas
        {...props}
        // fit
        pannable
        zoomable
        width={windowWidth - (uiDimensions.explorer + 55)}
        height={windowHeight - 117}
        maxWidth={50000}
        maxHeight={50000}
        direction={direction}
        nodes={nodes}
        edges={edges}
        node={
          <Node
            style={{ stroke: '#ffffff', fill: '#ffffff', strokeWidth: 1 }}
            label={
              <Label
                style={{ fill: '#2e3f50', fontWeight: 600, fontSize: 12 }}
              />
            }
            port={
              <Port
                style={{ fill: '#2e3f50', stroke: 'white' }}
                rx={10}
                ry={10}
              />
            }
          />
        }
        arrow={<MarkerArrow style={{ fill: '#8FA4B8' }} />}
        edge={<Edge className="edge" style={{ stroke: '#8FA4B8' }} />}
      />
    </div>
  );
};
