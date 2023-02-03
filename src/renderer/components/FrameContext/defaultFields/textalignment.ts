import { TextAlignmentField } from '../FrameContext.types';

export const defaultTextAlignment = {
  name: 'default_text_alignment',
  label: 'Default Text Alignment',
  required: false,
  type: 'textalignment',
  default: {
    text_align: 'LEFT',
  },
} as TextAlignmentField;
