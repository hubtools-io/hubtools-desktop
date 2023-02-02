import { cloneElement, FC } from 'react';
import ArrowDownBoldIcon from 'mdi-react/ArrowDownBoldIcon';
import ArrowUpBoldOutlineIcon from 'mdi-react/ArrowUpBoldOutlineIcon';
import ArrowUpBoldIcon from 'mdi-react/ArrowUpBoldIcon';
import ContentCopyIcon from 'mdi-react/ContentCopyIcon';
import DeleteOutlineIcon from 'mdi-react/DeleteOutlineIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import ArrowCollapseVerticalIcon from 'mdi-react/ArrowCollapseVerticalIcon';
import ArrowExpandVerticalIcon from 'mdi-react/ArrowExpandVerticalIcon';
import { Kind } from './Kind';
import { Label } from './Label';
import { Name } from './Name';
import { Field } from '../FrameContext/FrameContext.types';
import { typeIconLookup } from './TypeIcon';

export type ItemProps = {
  node: any;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  condensed?: boolean;
  onMoveDown?: (field: Field) => void;
  onMoveUp?: (field: Field, moveToTopLevel: boolean) => void;
  onAddField?: (field: Field) => void;
  onCopyField?: (field: Field) => void;
  onRemoveField?: (field: Field) => void;
  onUpdateField?: (field: Field, nextField: Field) => void;
  onEditField?: (field: Field) => void;
  onCollapse?: (field: Field) => void;
  canCollapse?: boolean;
  collapsed?: boolean;
  selectedEditField?: Field;
  moveLevels?: boolean;
};

export const Item: FC<ItemProps> = ({
  node,
  canMoveUp = true,
  canMoveDown = true,
  condensed = false,
  onMoveDown,
  onMoveUp,
  onAddField,
  onCopyField,
  onRemoveField,
  onUpdateField,
  onEditField,
  onCollapse,
  canCollapse = false,
  collapsed = false,
  selectedEditField,
  moveLevels = false,
}) => {
  const isParent = !!node.children && node.children.length > 0;

  const handleAddField = (field: Field) => {
    return onAddField?.(field);
  };

  const handleCopyField = (field: Field) => {
    return onCopyField?.(field);
  };

  const handleRemoveField = (field: Field) => {
    return onRemoveField?.(field);
  };

  const handleUpdateField = (field: Field, nextField: Field) => {
    return onUpdateField?.(field, nextField);
  };

  const handleEditField = (field: Field) => {
    return onEditField?.(field);
  };

  return (
    <div
      className={`list-item ${condensed ? 'list-item-condensed' : ''} ${
        isParent ? 'has-children' : 'no-children'
      } ${node.type === 'group' ? 'list-item-group' : ''}`}
      style={{
        backgroundColor:
          selectedEditField?.internalId === node.internalId
            ? '#D0E7EC'
            : '#ffffff',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              paddingRight: 4,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5,
              color: 'rgba(46, 63, 80, 0.4)',
              flexDirection: condensed ? 'row' : 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: condensed ? 20 : 30,
                height: condensed ? 16 : 20,
                marginBottom: condensed ? 0 : 10,
                cursor: canMoveUp ? 'pointer' : 'not-allowed',
                opacity: canMoveUp ? 1 : 0.2,
              }}
              role="button"
              onClick={() => onMoveUp?.(node, moveLevels)}
              onKeyDown={() => {}}
            >
              <ArrowUpBoldIcon size={20} />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 20,
                cursor: canMoveDown ? 'pointer' : 'not-allowed',
                opacity: canMoveDown ? 1 : 0.2,
              }}
              role="button"
              onClick={() => onMoveDown?.(node)}
              onKeyDown={() => {}}
            >
              <ArrowDownBoldIcon size={20} />
            </div>
          </div>

          <div
            style={{
              width: condensed ? 20 : 50,
              height: condensed ? 20 : 50,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
              backgroundColor:
                selectedEditField?.internalId === node.internalId
                  ? '#BEDDE3'
                  : '#efefef',
              color: 'rgba(46, 63, 80, 0.4)',
              borderRadius: 5,
            }}
            title={node.type}
          >
            {Object.entries(typeIconLookup).map(
              ([type, element]: any, index: number) => {
                return node.type === type
                  ? cloneElement(element, {
                      key: index,
                      ...element.props,
                    })
                  : null;
              }
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: condensed ? 'row' : 'column',
              justifyContent: 'flex-start',
              alignItems: condensed ? 'center' : 'flex-start',
            }}
          >
            <Label label={node.label} />
            {condensed ? null : <Name name={node.name} />}

            {condensed ? null : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Kind kind={node.type} />

                {node.tab ? (
                  <>
                    <div style={{ width: 10 }} />
                    <Kind kind={`${node.tab} Tab`} muted />
                  </>
                ) : null}

                {node.repeater ? (
                  <>
                    <div style={{ width: 10 }} />
                    <Kind kind="Repeater" muted />
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {node.type === 'group' ? (
            <button
              type="button"
              className="color-hover"
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#efefef',
                color: '#2e3f50',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 6,
                borderRadius: 4,
                padding: 0,
              }}
              onClick={() => handleAddField(node)}
            >
              <PlusIcon size={16} />
            </button>
          ) : null}

          <button
            type="button"
            className={
              selectedEditField?.internalId === node.internalId
                ? 'color-hover-selected'
                : 'color-hover'
            }
            style={{
              width: 30,
              height: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 6,
              borderRadius: 4,
              padding: 0,
            }}
            onClick={() => handleEditField(node)}
            disabled={selectedEditField?.internalId === node.internalId}
          >
            <PencilIcon size={16} />
          </button>

          <button
            type="button"
            className="color-hover"
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#efefef',
              color: '#2e3f50',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 6,
              borderRadius: 4,
              padding: 0,
            }}
            onClick={() => handleCopyField(node)}
          >
            <ContentCopyIcon size={16} />
          </button>

          <button
            type="button"
            className="color-hover"
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#efefef',
              color: '#2e3f50',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 6,
              borderRadius: 4,
              padding: 0,
            }}
            onClick={() => handleRemoveField(node)}
          >
            <DeleteOutlineIcon size={16} />
          </button>

          {!condensed && canCollapse && node.type === 'group' ? (
            <div
              role="button"
              className="clickable"
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'transparent',
                color: '#2e3f50',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 6,
                borderRadius: 4,
                padding: 0,
                opacity: 0.7,
              }}
              onClick={() => onCollapse?.(node)}
              onKeyDown={() => {}}
              title={collapsed ? 'Expand' : 'Collapse'}
            >
              {collapsed ? (
                <ArrowCollapseVerticalIcon size={20} />
              ) : (
                <ArrowExpandVerticalIcon size={20} />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
