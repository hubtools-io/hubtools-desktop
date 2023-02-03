import { get as lsGet, set as lsSet } from 'local-storage';
import { cloneElement, FC, HTMLProps, useEffect, useState } from 'react';
import PlusIcon from 'mdi-react/PlusIcon';
import { cloneDeep } from 'lodash';
import ArrowExpandVerticalIcon from 'mdi-react/ArrowExpandVerticalIcon';
import ArrowCollapseVerticalIcon from 'mdi-react/ArrowCollapseVerticalIcon';
import { FrameFile } from '../FrameContext/FrameContext.types';
import {
  addFieldInternalId,
  formatFieldArray,
  hubId,
} from '../FrameContext/utils';
import { Item } from './Item';
import { copyItem, moveItemDown, removeItem, updateItem } from './utils';
import { moveItemUp } from './utils/move-item-up';
import { fieldsChoices, typeIconLookup } from './TypeIcon';
import { NoChildren } from './NoChildren';
import { Modal } from '../Modal';
import { ModalItem } from '../ModalItem';
import { FieldEditorFrame } from './FieldEditorFrame';
import { FieldEditPanel } from './FieldEditPanel';

type Field = any;

const collapsedListKey = 'hubtools_collapsed_list';
const collapsedAllKey = 'hubtools_collapsed_allt';

export type FieldListProps = HTMLProps<HTMLDivElement> & {
  frameFile?: FrameFile;
  onUpdateFile?: (file: FrameFile) => void;
};

export const FieldList: FC<FieldListProps> = ({
  frameFile,
  onUpdateFile,
  ...props
}) => {
  const [workingFile, setWorkingFile] = useState<FrameFile>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toBottom, setToBottom] = useState<boolean>(false);
  const [addToField, setAddToField] = useState<Field>();
  const [editingField, setEditingField] = useState<Field>();
  const [collapsed, setCollapsed] = useState<string[]>(
    lsGet(collapsedListKey) || []
  );
  const [collapseAll, setCollapseAll] = useState<boolean>(
    lsGet(collapsedAllKey) || false
  );

  useEffect(() => {
    lsSet(collapsedListKey, collapsed);
  }, [collapsed]);

  useEffect(() => {
    lsSet(collapsedAllKey, collapseAll);
  }, [collapseAll]);

  useEffect(() => {
    if (!frameFile || !frameFile.contents) {
      return;
    }

    let formattedFields = formatFieldArray(frameFile.contents);
    formattedFields = addFieldInternalId(formattedFields);

    const newFile = formatFieldArray({
      ...frameFile,
      contents: formattedFields,
    });

    setWorkingFile(newFile);
  }, [frameFile]);

  const scrollToNode = (node: any) => {
    if (node && node.name) {
      const section = document.querySelector(`#node-${node.name}`);

      if (!(section instanceof HTMLElement)) {
        return;
      }

      section.classList.add('scrolling-to-node');
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        section.classList.remove('scrolling-to-node');
      }, 300);
    }
  };

  const handleOpenModal = (field: Field) => {
    setEditingField(undefined);
    setAddToField(field);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectToEdit = (field: Field) => {
    setEditingField(field);
  };

  const handleClearEdit = () => {
    setEditingField(undefined);
  };

  const handleCopyField = (field: Field) => {
    if (!workingFile) {
      return;
    }

    return copyItem(field, workingFile, (updatedFile) => {
      onUpdateFile?.(updatedFile);
    });
  };

  const handleMoveItemUp = (field: Field, moveLevels: boolean) => {
    if (!workingFile) {
      return;
    }

    return moveItemUp(field, workingFile, moveLevels, (updatedFile) => {
      setEditingField(undefined);
      onUpdateFile?.(updatedFile);
    });
  };

  const handleMoveItemDown = (field: Field) => {
    if (!workingFile) {
      return;
    }

    return moveItemDown(field, workingFile, (updatedFile) => {
      setEditingField(undefined);
      onUpdateFile?.(updatedFile);
    });
  };

  const handleRemoveField = (field: Field) => {
    if (!workingFile) {
      return;
    }

    return removeItem(field, workingFile, (updatedFile) => {
      if (editingField === field) {
        setEditingField(undefined);
      }

      onUpdateFile?.(updatedFile);
    });
  };

  const handleUpdateField = (prevField: Field, nextField: Field) => {
    if (!workingFile) {
      return;
    }

    return updateItem(
      prevField,
      nextField,
      workingFile,
      toBottom,
      (updatedFile) => {
        onUpdateFile?.(updatedFile);
      }
    );
  };

  const handleAddField = (defaultField: Field, topGroup?: boolean) => {
    const newInternalId = hubId();

    const newDefaultField = {
      ...defaultField,
      name: `${defaultField.name}_${newInternalId}`,
      internalId: newInternalId,
    };

    if (addToField && !topGroup) {
      const newField = cloneDeep(addToField);
      newField.children?.push(newDefaultField);
      handleUpdateField(addToField, newField);
    } else {
      handleUpdateField(null, newDefaultField);
    }

    setTimeout(() => {
      scrollToNode(newDefaultField);
    }, 10);

    setEditingField(undefined);
    setShowModal(false);
  };

  const handleAddTopGroup = () => {
    setToBottom(false);
    setAddToField(undefined);

    setTimeout(() => {
      handleOpenModal(undefined);
    }, 100);
  };

  const handleAddBottomGroup = () => {
    setToBottom(true);
    setAddToField(undefined);

    setTimeout(() => {
      handleOpenModal(undefined);
    }, 100);
  };

  const handleCollapseItem = (field: Field) => {
    setCollapseAll(false);
    setCollapsed((prevValue: any) => {
      const alreadyCollapsed = collapseAll || prevValue.includes(field.name);

      const newValue = alreadyCollapsed
        ? prevValue.filter((v: any) => v !== field.name)
        : [...prevValue, field.name];

      return newValue;
    });
  };

  const handleCollapseAll = () => {
    setCollapsed([]);
    setCollapseAll(true);
  };

  const handleExpandAll = () => {
    setCollapsed([]);
    setCollapseAll(false);
  };

  const handleFieldSubmit = (payload: any) => {
    console.log(payload, 'edited');
    handleUpdateField(editingField, payload);
  };

  const renderNode = (node: Field, index: number, subList: Field[]) => {
    const firstInSubList = index === 0;
    const lastInSubList = subList.length - 1 === index;
    const topLevel = subList === workingFile?.contents;

    return (
      <li
        key={`${node.internalId}`}
        id={`node-${node.name}`}
        className={`node-${node.name} node-${node.internalId}`}
      >
        <Item
          key={`${node.internalId}`}
          node={node}
          canMoveUp={!firstInSubList || !topLevel}
          canMoveDown={!lastInSubList}
          moveLevels={firstInSubList && !topLevel}
          onMoveDown={handleMoveItemDown}
          onMoveUp={handleMoveItemUp}
          onAddField={handleOpenModal}
          onUpdateField={handleUpdateField}
          onRemoveField={handleRemoveField}
          onCopyField={handleCopyField}
          onEditField={handleSelectToEdit}
          onCollapse={handleCollapseItem}
          canCollapse
          collapsed={collapseAll || collapsed.includes(node.name)}
          selectedEditField={editingField}
        />

        {node.type === 'group' &&
        !collapseAll &&
        !collapsed.includes(node.name) ? (
          <ul>
            {node.children.length > 0 ? (
              node.children.map((childNode: Field, indx: number) => {
                return renderNode(childNode, indx, node.children);
              })
            ) : (
              <NoChildren />
            )}
          </ul>
        ) : null}

        {node.type === 'group' &&
        (collapseAll || collapsed.includes(node.name)) ? (
          <ul>
            {node.children.length > 0 ? (
              node.children.map((childNode: Field, indx: number) => {
                const childFirstInSubList = indx === 0;
                const childLastInSubList = node.children.length - 1 === indx;
                const childTopLevel = false;

                return (
                  <li
                    key={`${childNode.internalId}`}
                    id={`node-${childNode.name}`}
                    className={`collapsed-child node-${childNode.name} node-${childNode.internalId}`}
                  >
                    <Item
                      condensed
                      key={`${childNode.internalId}`}
                      node={childNode}
                      canMoveUp={!childFirstInSubList}
                      canMoveDown={!childLastInSubList}
                      moveLevels={childFirstInSubList && !childTopLevel}
                      onMoveDown={handleMoveItemDown}
                      onMoveUp={handleMoveItemUp}
                      onAddField={handleOpenModal}
                      onUpdateField={handleUpdateField}
                      onRemoveField={handleRemoveField}
                      onCopyField={handleCopyField}
                      onEditField={handleSelectToEdit}
                      onCollapse={handleCollapseItem}
                      canCollapse
                      collapsed={
                        collapseAll || collapsed.includes(childNode.name)
                      }
                      selectedEditField={editingField}
                    />
                  </li>
                );
              })
            ) : (
              <NoChildren condensed />
            )}
          </ul>
        ) : null}
      </li>
    );
  };

  if (!workingFile) {
    return null;
  }

  const notAllowedFields =
    addToField && addToField?.tab && addToField?.tab === 'STYLE'
      ? []
      : [
          'gradient',
          'spacing',
          'backgroundimage',
          'border',
          'alignment',
          'textalignment',
        ];

  return (
    <>
      {showModal ? (
        <Modal onClose={handleCloseModal} modalTitle="Add a field">
          {Object.entries(fieldsChoices).map(
            ([type, options], index: number) => {
              return (
                <ModalItem
                  key={index}
                  onAddField={handleAddField}
                  type={type}
                  options={options}
                  canSelect={!notAllowedFields.includes(type)}
                />
              );
            }
          )}
        </Modal>
      ) : null}

      <FieldEditorFrame>
        <div
          {...props}
          className="scrollable-dark"
          style={{
            flexGrow: 1,
            width: '100%',
            height: 'calc(100vh - 120px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '20px 30px',
            overflowY: showModal ? 'hidden' : 'auto',
            position: 'relative',
          }}
        >
          <h2 style={{ fontWeight: 300, fontSize: 28 }}>{frameFile?.name}</h2>

          <div className="field-list">
            <div
              className="between-add"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.75)',
              }}
            >
              <div
                className="clickable"
                style={{
                  backgroundColor: 'rgba(16, 16, 16, 1)',
                  borderRadius: 4,
                  padding: '0 10px',
                  height: 30,
                  minWidth: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 15,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                title="Add group"
                role="button"
                onClick={() => handleAddTopGroup()}
                onKeyDown={() => {}}
              >
                <PlusIcon
                  size={15}
                  style={{ transform: 'translateY(-0.25px)', marginRight: 10 }}
                />
                <span style={{ userSelect: 'none' }}>Add Field</span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                maxWidth: '750px',
                padding: '0 20px',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: 14,
                marginTop: 20,
                color: 'rgba(255, 255, 255, 0.75)',
              }}
            >
              <div
                className="clickable"
                style={{
                  marginRight: 30,
                  display: 'flex',
                  alignItems: 'center',
                }}
                role="button"
                onClick={handleCollapseAll}
                onKeyDown={() => {}}
              >
                <ArrowCollapseVerticalIcon
                  style={{ marginRight: 6 }}
                  size={14}
                />
                <span style={{ userSelect: 'none' }}>Collapse All</span>
              </div>
              <div
                className="clickable"
                style={{
                  marginRight: 30,
                  display: 'flex',
                  alignItems: 'center',
                }}
                role="button"
                onClick={handleExpandAll}
                onKeyDown={() => {}}
              >
                <ArrowExpandVerticalIcon style={{ marginRight: 6 }} size={14} />
                <span style={{ userSelect: 'none' }}>Expand All</span>
              </div>
            </div>

            <ul>
              {workingFile.contents?.map((node: Field, index: number) =>
                renderNode(node, index, workingFile.contents)
              )}
            </ul>

            {workingFile.contents?.length > 0 ? (
              <div
                className="between-add"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.75)',
                  marginBottom: 30,
                }}
              >
                <div
                  className="clickable"
                  style={{
                    backgroundColor: 'rgba(16, 16, 16, 1)',
                    borderRadius: 4,
                    padding: '0 10px',
                    height: 30,
                    minWidth: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 15,
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  title="Add group"
                  role="button"
                  onClick={() => handleAddBottomGroup()}
                  onKeyDown={() => {}}
                >
                  <PlusIcon
                    size={15}
                    style={{
                      transform: 'translateY(-0.25px)',
                      marginRight: 10,
                    }}
                  />
                  <span style={{ userSelect: 'none' }}>Add Field</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <FieldEditPanel
          editingField={editingField}
          onClearEdit={handleClearEdit}
          onSubmit={handleFieldSubmit}
        />
      </FieldEditorFrame>
    </>
  );
};
