import { TextField } from '../FrameContext.types';

export const defaultText = {
  name: 'default_text',
  label: 'Default Text',
  required: false,
  locked: false,
  validation_regex: '',
  allow_new_line: false,
  show_emoji_picker: false,
  type: 'text',
  default: '',
} as TextField;
