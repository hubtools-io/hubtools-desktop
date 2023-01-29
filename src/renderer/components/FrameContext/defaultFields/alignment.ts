import { AlignmentField } from '../FrameContext.types';

export const defaultAlignment = {
  name: 'default_alignment',
  label: 'Default Alignment',
  help_text: "Position the image within it's container.",
  required: false,
  type: 'alignment',
  default: {
    horizontal_align: 'CENTER',
    vertical_align: 'TOP',
  },
  alignment_direction: 'BOTH',
} as AlignmentField;
