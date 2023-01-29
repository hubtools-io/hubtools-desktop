import { DateTimeField } from '../FrameContext.types';

export const defaultDateTime = {
  name: 'default_datetime',
  label: 'Default Date Time',
  required: false,
  locked: false,
  type: 'datetime',
  default: 1577854800000,
} as DateTimeField;
