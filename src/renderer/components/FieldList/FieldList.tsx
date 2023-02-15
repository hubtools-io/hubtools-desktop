import { get as lsGet, set as lsSet } from 'local-storage';
import { cloneElement, FC, HTMLProps, useEffect, useState } from 'react';
import PlusIcon from 'mdi-react/PlusIcon';
import { cloneDeep } from 'lodash';
import ArrowExpandVerticalIcon from 'mdi-react/ArrowExpandVerticalIcon';
import ArrowCollapseVerticalIcon from 'mdi-react/ArrowCollapseVerticalIcon';
import { DragDropContext } from 'react-beautiful-dnd';
import { FrameFile } from '../FrameContext/FrameContext.types';
import {
    addFieldInternalId,
    formatFieldArray,
    hubId,
    moveTo,
    removeFieldInternalId,
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
import { Drop } from './Drop';
import { Drag } from './Drag';

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
            const alreadyCollapsed =
                collapseAll || prevValue.includes(field.name);

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
        handleUpdateField(editingField, payload);
    };

    const reorder = (list: any, startIndex: any, endIndex: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const handleDragEnd = (result: any) => {
        const { draggableId, source, destination } = result;
        if (!destination) return;

        moveTo(workingFile?.contents, draggableId, source, destination)
            .then((res) => {
                if (!workingFile) {
                    return;
                }

                let sendableNodes = [...res];
                sendableNodes = removeFieldInternalId(sendableNodes);

                const newFile = {
                    ...workingFile,
                    contents: JSON.stringify(sendableNodes, null, 4),
                };

                setWorkingFile({
                    ...workingFile,
                    contents: res,
                });

                setEditingField(undefined);

                return onUpdateFile?.(newFile);
            })
            .catch((e) => console.log(e, 'e'));
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
        <DragDropContext onDragEnd={handleDragEnd}>
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
                    <h2 style={{ fontWeight: 300, fontSize: 28 }}>
                        {frameFile?.name}
                    </h2>

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
                                    style={{
                                        transform: 'translateY(-0.25px)',
                                        marginRight: 10,
                                    }}
                                />
                                <span style={{ userSelect: 'none' }}>
                                    Add Field
                                </span>
                            </div>
                        </div>

                        <div
                            style={{
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                maxWidth: '750px',
                                padding: '0 20px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                fontSize: 14,
                                marginTop: 20,
                                color: 'rgba(255, 255, 255, 0.75)',
                                display: 'none',
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
                                <span style={{ userSelect: 'none' }}>
                                    Collapse All
                                </span>
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
                                <ArrowExpandVerticalIcon
                                    style={{ marginRight: 6 }}
                                    size={14}
                                />
                                <span style={{ userSelect: 'none' }}>
                                    Expand All
                                </span>
                            </div>
                        </div>

                        <div>
                            <ul>
                                <Drop id="droppable" type="droppable-level1">
                                    {workingFile?.contents.map(
                                        (level1: any, level1Index: any) => {
                                            return (
                                                <Drag
                                                    className="draggable-level1"
                                                    key={`drag-${level1.internalId}`}
                                                    id={level1.internalId}
                                                    index={level1Index}
                                                >
                                                    <div className="level1-container">
                                                        <li
                                                            key={`li-${level1.internalId}`}
                                                            id={`node-${level1.name}`}
                                                            className={`node-${level1.name} node-${level1.internalId}`}
                                                        >
                                                            <Item
                                                                key={`item-${level1.internalId}`}
                                                                node={level1}
                                                                onMoveDown={
                                                                    handleMoveItemDown
                                                                }
                                                                onMoveUp={
                                                                    handleMoveItemUp
                                                                }
                                                                onAddField={
                                                                    handleOpenModal
                                                                }
                                                                onUpdateField={
                                                                    handleUpdateField
                                                                }
                                                                onRemoveField={
                                                                    handleRemoveField
                                                                }
                                                                onCopyField={
                                                                    handleCopyField
                                                                }
                                                                onEditField={
                                                                    handleSelectToEdit
                                                                }
                                                                onCollapse={
                                                                    handleCollapseItem
                                                                }
                                                                canCollapse
                                                                collapsed={
                                                                    collapseAll ||
                                                                    collapsed.includes(
                                                                        level1.name
                                                                    )
                                                                }
                                                                selectedEditField={
                                                                    editingField
                                                                }
                                                            />
                                                        </li>

                                                        <ul
                                                            className={`${
                                                                level1.type ===
                                                                    'group' &&
                                                                level1.children &&
                                                                level1.children
                                                                    .length > 0
                                                                    ? 'ul-has-children'
                                                                    : 'ul-no-children'
                                                            } ${
                                                                collapseAll ||
                                                                collapsed.includes(
                                                                    level1.name
                                                                )
                                                                    ? 'collapsed'
                                                                    : 'not-collapsed'
                                                            }`}
                                                        >
                                                            <Drop
                                                                key={`drop-${level1.internalId}}`}
                                                                id={
                                                                    level1.internalId
                                                                }
                                                                type="droppable-level2"
                                                            >
                                                                {level1.type ===
                                                                    'group' &&
                                                                level1.children
                                                                    .length ===
                                                                    0 ? (
                                                                    <NoChildren
                                                                        condensed={
                                                                            collapseAll ||
                                                                            collapsed.includes(
                                                                                level1.name
                                                                            )
                                                                        }
                                                                    />
                                                                ) : null}

                                                                {level1.type ===
                                                                    'group' &&
                                                                level1.children &&
                                                                level1.children
                                                                    .length >
                                                                    0 ? (
                                                                    <>
                                                                        {level1.children.map(
                                                                            (
                                                                                level2: any,
                                                                                level2index: any
                                                                            ) => {
                                                                                return (
                                                                                    <Drag
                                                                                        className="draggable"
                                                                                        key={`drag-${level2.internalId}`}
                                                                                        id={
                                                                                            level2.internalId
                                                                                        }
                                                                                        index={
                                                                                            level2index
                                                                                        }
                                                                                    >
                                                                                        <div className="level2-container">
                                                                                            <li
                                                                                                key={`li-${level2.internalId}`}
                                                                                                id={`node-${level2.name}`}
                                                                                                className={`node-${level2.name} node-${level2.internalId}`}
                                                                                            >
                                                                                                <Item
                                                                                                    key={`item-${level2.internalId}`}
                                                                                                    node={
                                                                                                        level2
                                                                                                    }
                                                                                                    onMoveDown={
                                                                                                        handleMoveItemDown
                                                                                                    }
                                                                                                    onMoveUp={
                                                                                                        handleMoveItemUp
                                                                                                    }
                                                                                                    onAddField={
                                                                                                        handleOpenModal
                                                                                                    }
                                                                                                    onUpdateField={
                                                                                                        handleUpdateField
                                                                                                    }
                                                                                                    onRemoveField={
                                                                                                        handleRemoveField
                                                                                                    }
                                                                                                    onCopyField={
                                                                                                        handleCopyField
                                                                                                    }
                                                                                                    onEditField={
                                                                                                        handleSelectToEdit
                                                                                                    }
                                                                                                    onCollapse={
                                                                                                        handleCollapseItem
                                                                                                    }
                                                                                                    canCollapse
                                                                                                    collapsed={
                                                                                                        collapseAll ||
                                                                                                        collapsed.includes(
                                                                                                            level2.name
                                                                                                        )
                                                                                                    }
                                                                                                    selectedEditField={
                                                                                                        editingField
                                                                                                    }
                                                                                                    condensed={
                                                                                                        collapseAll ||
                                                                                                        collapsed.includes(
                                                                                                            level1.name
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </li>

                                                                                            <ul
                                                                                                className={`${
                                                                                                    level2.type ===
                                                                                                        'group' &&
                                                                                                    level2.children &&
                                                                                                    level2
                                                                                                        .children
                                                                                                        .length >
                                                                                                        0
                                                                                                        ? 'ul-has-children'
                                                                                                        : 'ul-no-children'
                                                                                                } ${
                                                                                                    collapseAll ||
                                                                                                    collapsed.includes(
                                                                                                        level2.name
                                                                                                    )
                                                                                                        ? 'collapsed'
                                                                                                        : 'not-collapsed'
                                                                                                }`}
                                                                                            >
                                                                                                <Drop
                                                                                                    key={`drop-${level2.internalId}`}
                                                                                                    id={
                                                                                                        level2.internalId
                                                                                                    }
                                                                                                    type="droppable-level3"
                                                                                                >
                                                                                                    {!collapsed.includes(
                                                                                                        level1.name
                                                                                                    ) &&
                                                                                                    level2.type ===
                                                                                                        'group' &&
                                                                                                    level2
                                                                                                        .children
                                                                                                        .length ===
                                                                                                        0 ? (
                                                                                                        <NoChildren
                                                                                                            condensed={
                                                                                                                collapseAll ||
                                                                                                                collapsed.includes(
                                                                                                                    level2.name
                                                                                                                )
                                                                                                            }
                                                                                                        />
                                                                                                    ) : null}

                                                                                                    {!collapsed.includes(
                                                                                                        level1.name
                                                                                                    ) &&
                                                                                                    level2.type ===
                                                                                                        'group' &&
                                                                                                    level2.children &&
                                                                                                    level2
                                                                                                        .children
                                                                                                        .length >
                                                                                                        0 ? (
                                                                                                        <>
                                                                                                            {level2.children.map(
                                                                                                                (
                                                                                                                    level3: any,
                                                                                                                    level3index: any
                                                                                                                ) => {
                                                                                                                    return (
                                                                                                                        <Drag
                                                                                                                            className="draggable"
                                                                                                                            key={`drag-${level3.internalId}`}
                                                                                                                            id={
                                                                                                                                level3.internalId
                                                                                                                            }
                                                                                                                            index={
                                                                                                                                level3index
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <div className="level3-container">
                                                                                                                                <li
                                                                                                                                    key={`li-${level3.internalId}`}
                                                                                                                                    id={`node-${level3.name}`}
                                                                                                                                    className={`node-${level3.name} node-${level3.internalId}`}
                                                                                                                                >
                                                                                                                                    <Item
                                                                                                                                        key={`item-${level3.internalId}`}
                                                                                                                                        node={
                                                                                                                                            level3
                                                                                                                                        }
                                                                                                                                        onMoveDown={
                                                                                                                                            handleMoveItemDown
                                                                                                                                        }
                                                                                                                                        onMoveUp={
                                                                                                                                            handleMoveItemUp
                                                                                                                                        }
                                                                                                                                        onAddField={
                                                                                                                                            handleOpenModal
                                                                                                                                        }
                                                                                                                                        onUpdateField={
                                                                                                                                            handleUpdateField
                                                                                                                                        }
                                                                                                                                        onRemoveField={
                                                                                                                                            handleRemoveField
                                                                                                                                        }
                                                                                                                                        onCopyField={
                                                                                                                                            handleCopyField
                                                                                                                                        }
                                                                                                                                        onEditField={
                                                                                                                                            handleSelectToEdit
                                                                                                                                        }
                                                                                                                                        onCollapse={
                                                                                                                                            handleCollapseItem
                                                                                                                                        }
                                                                                                                                        canCollapse
                                                                                                                                        collapsed={
                                                                                                                                            collapseAll ||
                                                                                                                                            collapsed.includes(
                                                                                                                                                level3.name
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                        selectedEditField={
                                                                                                                                            editingField
                                                                                                                                        }
                                                                                                                                        condensed={
                                                                                                                                            collapseAll ||
                                                                                                                                            collapsed.includes(
                                                                                                                                                level1.name
                                                                                                                                            ) ||
                                                                                                                                            collapsed.includes(
                                                                                                                                                level2.name
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    />
                                                                                                                                </li>

                                                                                                                                <ul
                                                                                                                                    className={`${
                                                                                                                                        level3.type ===
                                                                                                                                            'group' &&
                                                                                                                                        level3.children &&
                                                                                                                                        level3
                                                                                                                                            .children
                                                                                                                                            .length >
                                                                                                                                            0
                                                                                                                                            ? 'ul-has-children'
                                                                                                                                            : 'ul-no-children'
                                                                                                                                    } ${
                                                                                                                                        collapseAll ||
                                                                                                                                        collapsed.includes(
                                                                                                                                            level3.name
                                                                                                                                        )
                                                                                                                                            ? 'collapsed'
                                                                                                                                            : 'not-collapsed'
                                                                                                                                    }`}
                                                                                                                                >
                                                                                                                                    <Drop
                                                                                                                                        key={`drop-${level3.internalId}`}
                                                                                                                                        id={
                                                                                                                                            level3.internalId
                                                                                                                                        }
                                                                                                                                        type="droppable-level4"
                                                                                                                                    >
                                                                                                                                        {!collapsed.includes(
                                                                                                                                            level2.name
                                                                                                                                        ) &&
                                                                                                                                        level3.type ===
                                                                                                                                            'group' &&
                                                                                                                                        level3
                                                                                                                                            .children
                                                                                                                                            .length ===
                                                                                                                                            0 ? (
                                                                                                                                            <NoChildren
                                                                                                                                                condensed={
                                                                                                                                                    collapseAll ||
                                                                                                                                                    collapsed.includes(
                                                                                                                                                        level3.name
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                            />
                                                                                                                                        ) : null}

                                                                                                                                        {!collapsed.includes(
                                                                                                                                            level2.name
                                                                                                                                        ) &&
                                                                                                                                        level3.type ===
                                                                                                                                            'group' &&
                                                                                                                                        level3.children &&
                                                                                                                                        level3
                                                                                                                                            .children
                                                                                                                                            .length >
                                                                                                                                            0 ? (
                                                                                                                                            <>
                                                                                                                                                {level3.children.map(
                                                                                                                                                    (
                                                                                                                                                        level4: any,
                                                                                                                                                        level4index: any
                                                                                                                                                    ) => {
                                                                                                                                                        return (
                                                                                                                                                            <Drag
                                                                                                                                                                className="draggable"
                                                                                                                                                                key={`drag-${level4.internalId}`}
                                                                                                                                                                id={
                                                                                                                                                                    level4.internalId
                                                                                                                                                                }
                                                                                                                                                                index={
                                                                                                                                                                    level4index
                                                                                                                                                                }
                                                                                                                                                            >
                                                                                                                                                                <div className="level4-container">
                                                                                                                                                                    <li
                                                                                                                                                                        key={`li-${level4.internalId}`}
                                                                                                                                                                        id={`node-${level4.name}`}
                                                                                                                                                                        className={`node-${level4.name} node-${level4.internalId}`}
                                                                                                                                                                    >
                                                                                                                                                                        <Item
                                                                                                                                                                            key={`item-${level4.internalId}`}
                                                                                                                                                                            node={
                                                                                                                                                                                level4
                                                                                                                                                                            }
                                                                                                                                                                            onMoveDown={
                                                                                                                                                                                handleMoveItemDown
                                                                                                                                                                            }
                                                                                                                                                                            onMoveUp={
                                                                                                                                                                                handleMoveItemUp
                                                                                                                                                                            }
                                                                                                                                                                            onAddField={
                                                                                                                                                                                handleOpenModal
                                                                                                                                                                            }
                                                                                                                                                                            onUpdateField={
                                                                                                                                                                                handleUpdateField
                                                                                                                                                                            }
                                                                                                                                                                            onRemoveField={
                                                                                                                                                                                handleRemoveField
                                                                                                                                                                            }
                                                                                                                                                                            onCopyField={
                                                                                                                                                                                handleCopyField
                                                                                                                                                                            }
                                                                                                                                                                            onEditField={
                                                                                                                                                                                handleSelectToEdit
                                                                                                                                                                            }
                                                                                                                                                                            onCollapse={
                                                                                                                                                                                handleCollapseItem
                                                                                                                                                                            }
                                                                                                                                                                            canCollapse
                                                                                                                                                                            collapsed={
                                                                                                                                                                                collapseAll ||
                                                                                                                                                                                collapsed.includes(
                                                                                                                                                                                    level4.name
                                                                                                                                                                                )
                                                                                                                                                                            }
                                                                                                                                                                            selectedEditField={
                                                                                                                                                                                editingField
                                                                                                                                                                            }
                                                                                                                                                                            condensed={
                                                                                                                                                                                collapseAll ||
                                                                                                                                                                                collapsed.includes(
                                                                                                                                                                                    level1.name
                                                                                                                                                                                ) ||
                                                                                                                                                                                collapsed.includes(
                                                                                                                                                                                    level2.name
                                                                                                                                                                                ) ||
                                                                                                                                                                                collapsed.includes(
                                                                                                                                                                                    level3.name
                                                                                                                                                                                )
                                                                                                                                                                            }
                                                                                                                                                                        />
                                                                                                                                                                    </li>

                                                                                                                                                                    <ul
                                                                                                                                                                        className={`${
                                                                                                                                                                            level4.type ===
                                                                                                                                                                                'group' &&
                                                                                                                                                                            level4.children &&
                                                                                                                                                                            level4
                                                                                                                                                                                .children
                                                                                                                                                                                .length >
                                                                                                                                                                                0
                                                                                                                                                                                ? 'ul-has-children'
                                                                                                                                                                                : 'ul-no-children'
                                                                                                                                                                        } ${
                                                                                                                                                                            collapseAll ||
                                                                                                                                                                            collapsed.includes(
                                                                                                                                                                                level4.name
                                                                                                                                                                            )
                                                                                                                                                                                ? 'collapsed'
                                                                                                                                                                                : 'not-collapsed'
                                                                                                                                                                        }`}
                                                                                                                                                                    >
                                                                                                                                                                        <Drop
                                                                                                                                                                            key={`drop-${level4.internalId}`}
                                                                                                                                                                            id={
                                                                                                                                                                                level4.internalId
                                                                                                                                                                            }
                                                                                                                                                                            type="droppable-level5"
                                                                                                                                                                        >
                                                                                                                                                                            {!collapsed.includes(
                                                                                                                                                                                level3.name
                                                                                                                                                                            ) &&
                                                                                                                                                                            level4.type ===
                                                                                                                                                                                'group' &&
                                                                                                                                                                            level4
                                                                                                                                                                                .children
                                                                                                                                                                                .length ===
                                                                                                                                                                                0 ? (
                                                                                                                                                                                <NoChildren
                                                                                                                                                                                    condensed={
                                                                                                                                                                                        collapseAll ||
                                                                                                                                                                                        collapsed.includes(
                                                                                                                                                                                            level4.name
                                                                                                                                                                                        )
                                                                                                                                                                                    }
                                                                                                                                                                                />
                                                                                                                                                                            ) : null}

                                                                                                                                                                            {!collapsed.includes(
                                                                                                                                                                                level3.name
                                                                                                                                                                            ) &&
                                                                                                                                                                            level4.type ===
                                                                                                                                                                                'group' &&
                                                                                                                                                                            level4.children &&
                                                                                                                                                                            level4
                                                                                                                                                                                .children
                                                                                                                                                                                .length >
                                                                                                                                                                                0 ? (
                                                                                                                                                                                <>
                                                                                                                                                                                    {level4.children.map(
                                                                                                                                                                                        (
                                                                                                                                                                                            level5: any,
                                                                                                                                                                                            level5index: any
                                                                                                                                                                                        ) => {
                                                                                                                                                                                            return (
                                                                                                                                                                                                <Drag
                                                                                                                                                                                                    className="draggable"
                                                                                                                                                                                                    key={`drag-${level5.internalId}`}
                                                                                                                                                                                                    id={
                                                                                                                                                                                                        level5.internalId
                                                                                                                                                                                                    }
                                                                                                                                                                                                    index={
                                                                                                                                                                                                        level5index
                                                                                                                                                                                                    }
                                                                                                                                                                                                >
                                                                                                                                                                                                    <div className="level5-container">
                                                                                                                                                                                                        <li
                                                                                                                                                                                                            key={`li-${level5.internalId}`}
                                                                                                                                                                                                            id={`node-${level5.name}`}
                                                                                                                                                                                                            className={`node-${level5.name} node-${level5.internalId}`}
                                                                                                                                                                                                        >
                                                                                                                                                                                                            <Item
                                                                                                                                                                                                                key={`item-${level5.internalId}`}
                                                                                                                                                                                                                node={
                                                                                                                                                                                                                    level5
                                                                                                                                                                                                                }
                                                                                                                                                                                                                onMoveDown={
                                                                                                                                                                                                                    handleMoveItemDown
                                                                                                                                                                                                                }
                                                                                                                                                                                                                onMoveUp={
                                                                                                                                                                                                                    handleMoveItemUp
                                                                                                                                                                                                                }
                                                                                                                                                                                                                onAddField={
                                                                                                                                                                                                                    handleOpenModal
                                                                                                                                                                                                                }
                                                                                                                                                                                                                onUpdateField={
                                                                                                                                                                                                                    handleUpdateField
                                                                                                                                                                                                                }
                                                                                                                                                                                                                onRemoveField={
                                                                                                                                                                                                                    handleRemoveField
                                                                                                                                                                                                                }
                                                                                                                                                                                                                onCopyField={
                                                                                                                                                                                                                    handleCopyField
                                                                                                                                                                                                                }
                                                                                                                                                                                                                onEditField={
                                                                                                                                                                                                                    handleSelectToEdit
                                                                                                                                                                                                                }
                                                                                                                                                                                                                onCollapse={
                                                                                                                                                                                                                    handleCollapseItem
                                                                                                                                                                                                                }
                                                                                                                                                                                                                canCollapse
                                                                                                                                                                                                                collapsed={
                                                                                                                                                                                                                    collapseAll ||
                                                                                                                                                                                                                    collapsed.includes(
                                                                                                                                                                                                                        level5.name
                                                                                                                                                                                                                    )
                                                                                                                                                                                                                }
                                                                                                                                                                                                                selectedEditField={
                                                                                                                                                                                                                    editingField
                                                                                                                                                                                                                }
                                                                                                                                                                                                                condensed={
                                                                                                                                                                                                                    collapseAll ||
                                                                                                                                                                                                                    collapsed.includes(
                                                                                                                                                                                                                        level1.name
                                                                                                                                                                                                                    ) ||
                                                                                                                                                                                                                    collapsed.includes(
                                                                                                                                                                                                                        level2.name
                                                                                                                                                                                                                    ) ||
                                                                                                                                                                                                                    collapsed.includes(
                                                                                                                                                                                                                        level3.name
                                                                                                                                                                                                                    ) ||
                                                                                                                                                                                                                    collapsed.includes(
                                                                                                                                                                                                                        level4.name
                                                                                                                                                                                                                    )
                                                                                                                                                                                                                }
                                                                                                                                                                                                            />
                                                                                                                                                                                                        </li>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </Drag>
                                                                                                                                                                                            );
                                                                                                                                                                                        }
                                                                                                                                                                                    )}
                                                                                                                                                                                </>
                                                                                                                                                                            ) : null}
                                                                                                                                                                        </Drop>
                                                                                                                                                                    </ul>
                                                                                                                                                                </div>
                                                                                                                                                            </Drag>
                                                                                                                                                        );
                                                                                                                                                    }
                                                                                                                                                )}
                                                                                                                                            </>
                                                                                                                                        ) : null}
                                                                                                                                    </Drop>
                                                                                                                                </ul>
                                                                                                                            </div>
                                                                                                                        </Drag>
                                                                                                                    );
                                                                                                                }
                                                                                                            )}
                                                                                                        </>
                                                                                                    ) : null}
                                                                                                </Drop>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </Drag>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </>
                                                                ) : null}
                                                            </Drop>
                                                        </ul>
                                                    </div>
                                                </Drag>
                                            );
                                        }
                                    )}
                                </Drop>
                            </ul>
                        </div>

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
                                    <span style={{ userSelect: 'none' }}>
                                        Add Field
                                    </span>
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
        </DragDropContext>
    );
};
