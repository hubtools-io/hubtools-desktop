import { removeByKey, removeFieldInternalId } from '../../FrameContext/utils';
import { Field, FrameFile } from '../../FrameContext/FrameContext.types';

export const removeItem = (
    field: Field,
    workingFile: FrameFile,
    callback?: (file: FrameFile) => any
) => {
    if (!workingFile) {
        return;
    }

    let sendableNodes = [...workingFile.contents];
    sendableNodes = removeByKey(sendableNodes, field.internalId);
    sendableNodes = removeFieldInternalId(sendableNodes);

    const newFile = {
        ...workingFile,
        contents: sendableNodes,
    };

    callback?.(newFile);
};
