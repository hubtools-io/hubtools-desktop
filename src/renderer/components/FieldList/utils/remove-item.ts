import {
  Field,
  FrameFile,
} from 'renderer/components/FrameContext/FrameContext.types';
import {
  removeByKey,
  removeFieldInternalId,
} from 'renderer/components/FrameContext/utils';

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
