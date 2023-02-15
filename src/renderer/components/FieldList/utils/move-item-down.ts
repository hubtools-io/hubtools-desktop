import { moveField, removeFieldInternalId } from '../../FrameContext/utils';
import { Field, FrameFile } from '../../FrameContext/FrameContext.types';

export const moveItemDown = (
    field: Field,
    workingFile: FrameFile,
    callback?: (file: FrameFile) => any
) => {
    if (!workingFile) {
        return;
    }

    let sendableNodes = [...workingFile.contents];
    sendableNodes = moveField(sendableNodes, field, 'down');
    sendableNodes = removeFieldInternalId(sendableNodes);

    const newFile = {
        ...workingFile,
        contents: sendableNodes,
    };

    callback?.(newFile);
};
