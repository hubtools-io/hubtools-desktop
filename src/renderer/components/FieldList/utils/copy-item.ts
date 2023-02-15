import { copyField, removeFieldInternalId } from '../../FrameContext/utils';
import { Field, FrameFile } from '../../FrameContext/FrameContext.types';

export const copyItem = (
    field: Field,
    workingFile: FrameFile,
    callback?: (file: FrameFile) => any
) => {
    if (!workingFile) {
        return;
    }

    let sendableNodes = [...workingFile.contents];
    sendableNodes = copyField(sendableNodes, field);
    sendableNodes = removeFieldInternalId(sendableNodes);

    const newFile = {
        ...workingFile,
        contents: sendableNodes,
    };

    callback?.(newFile);
};
