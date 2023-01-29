import { FileField } from '../FrameContext.types';

export const defaultFile = {
  name: 'default_file',
  label: 'Default File',
  required: false,
  locked: false,
  type: 'file',
  picker: 'file',
  default: null,
} as FileField;
