import { NumberField } from '../FrameContext.types';

export const defaultNumber = {
  name: 'default_number',
  label: 'Default Number',
  required: false,
  locked: false,
  display: 'slider',
  min: 1,
  max: 10,
  step: 1,
  type: 'number',
  prefix: '',
  suffix: '',
  default: null,
  placeholder: '50',
} as NumberField;
