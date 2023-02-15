import { removeFieldInternalId, replaceField } from '../../FrameContext/utils';
import { Field, FrameFile } from '../../FrameContext/FrameContext.types';

export const updateItem = (
    prevField: Field,
    nextField: Field,
    workingFile: FrameFile,
    toBottom?: boolean,
    callback?: (file: FrameFile) => any
) => {
    if (!workingFile) {
        return;
    }

    let sendableNodes = [...workingFile.contents];

    if (prevField) {
        sendableNodes = replaceField(sendableNodes, prevField, nextField);
    } else {
        if (toBottom) {
            sendableNodes = [...sendableNodes, { ...nextField }];
        } else {
            sendableNodes = [{ ...nextField }, ...sendableNodes];
        }

        sendableNodes = removeFieldInternalId(sendableNodes);
    }

    const newFile = {
        ...workingFile,
        contents: sendableNodes,
    };

    callback?.(newFile);
};
