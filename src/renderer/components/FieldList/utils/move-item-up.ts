import {
    moveField,
    moveFieldUpLevel,
    removeFieldInternalId,
} from '../../FrameContext/utils';
import { Field, FrameFile } from '../../FrameContext/FrameContext.types';

export const moveItemUp = (
    field: Field,
    workingFile: FrameFile,
    moveLevels: boolean,
    callback?: (file: FrameFile) => any
) => {
    if (!workingFile) {
        return;
    }

    let sendableNodes = [...workingFile.contents];

    if (moveLevels) {
        sendableNodes = moveFieldUpLevel(sendableNodes, field);
    } else {
        sendableNodes = moveField(sendableNodes, field, 'up');
    }

    // sendableNodes = moveField(sendableNodes, field, 'up');
    sendableNodes = removeFieldInternalId(sendableNodes);

    const newFile = {
        ...workingFile,
        contents: sendableNodes,
    };

    callback?.(newFile);
};
