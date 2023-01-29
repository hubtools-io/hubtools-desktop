import {
  Field,
  FrameFile,
} from 'renderer/components/FrameContext/FrameContext.types';
import {
  copyField,
  removeFieldInternalId,
} from 'renderer/components/FrameContext/utils';

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
