import { TagField } from '../FrameContext.types';

export const defaultTag = {
  name: 'default_tag',
  label: 'Default Tag',
  required: false,
  locked: false,
  tag_value: 'SLUG',
  type: 'tag',
  default: null,
} as TagField;
