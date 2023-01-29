import { BorderField } from '../FrameContext.types';

export const defaultBorder = {
  id: 'default_border',
  name: 'default_border',
  label: 'Default Border',
  required: false,
  locked: false,
  allow_custom_border_sides: false,
  type: 'border',
  default: {
    top: {
      width: { value: 1, units: 'px' },
      opacity: 100,
      style: 'solid',
      color: '#ffffff',
    },
    bottom: {
      width: { value: 1, units: 'px' },
      opacity: 100,
      style: 'solid',
      color: '#ffffff',
    },
    left: null,
    right: null,
  },
} as BorderField;
