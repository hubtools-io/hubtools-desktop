import { FontField } from '../FrameContext.types';

export const defaultFont = {
  name: 'default_font',
  label: 'Defautl Font',
  required: false,
  locked: false,
  load_external_fonts: true,
  type: 'font',
  default: {
    size: 12,
    font: 'Merriweather',
    font_set: 'GOOGLE',
    size_unit: 'px',
    color: '#000',
    styles: {},
  },
  visibility: {
    hidden_subfields: {
      font: true,
      size: true,
    },
  },
} as FontField;
