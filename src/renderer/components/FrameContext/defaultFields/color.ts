import { ColorField } from '../FrameContext.types';

export const defaultColor = {
  name: 'default_color',
  label: 'Default color',
  required: false,
  locked: false,
  type: 'color',
  default: {
    color: '#ff0000',
    opacity: 100,
  },
} as ColorField;
