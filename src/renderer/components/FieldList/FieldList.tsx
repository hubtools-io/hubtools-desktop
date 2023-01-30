import { FC, HTMLProps, useEffect, useState } from 'react';
import shortid from 'shortid';
import PlusIcon from 'mdi-react/PlusIcon';
import { cloneDeep } from 'lodash';
import { FrameFile } from '../FrameContext/FrameContext.types';
import { addFieldInternalId, formatFieldArray } from '../FrameContext/utils';
import { Item } from './Item';
import { copyItem, moveItemDown, removeItem, updateItem } from './utils';
import { moveItemUp } from './utils/move-item-up';
import { fieldsChoices } from './TypeIcon';
import { NoChildren } from './NoChildren';
import { Modal } from '../Modal';
import { ModalItem } from '../ModalItem';
import { FieldEditorFrame } from './FieldEditorFrame';
import { FieldEditPanel } from './FieldEditPanel';

type Field = any;

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
    const newInternalId = shortid();

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

  const renderNode = (node: Field, index: number, subList: Field[]) => {
    const firstInSubList = index === 0;
    const lastInSubList = subList.length - 1 === index;
    const topLevel = subList === workingFile?.contents;

    return (
      <li key={`${node.internalId}`}>
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
          selectedEditField={editingField}
        />

        {node.type === 'group' ? (
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
          <div
            style={{
              margin: 10,
              width: '100%',
              display: 'block',
            }}
          >
            <div
              style={{
                marginTop: 10,
                marginBottom: 20,
                padding: '10px 15px',
                borderRadius: 4,
                background: '#fef4ea',
                width: '100%',
                color: 'rgb(51, 71, 91)',
              }}
            >
              Additional HubSpot fields coming soon!
            </div>
          </div>

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
        />
      </FieldEditorFrame>
    </>
  );
};
