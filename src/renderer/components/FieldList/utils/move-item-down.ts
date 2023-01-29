import {
  Field,
  FrameFile,
} from 'renderer/components/FrameContext/FrameContext.types';
import {
  moveField,
  removeFieldInternalId,
} from 'renderer/components/FrameContext/utils';

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
