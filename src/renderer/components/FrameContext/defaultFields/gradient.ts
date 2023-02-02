import { GradientField } from '../FrameContext.types';

export const defaultGradient = {
  name: 'default_gradient',
  label: 'Default Gradient',
  help_text: 'Sets a gradient behind the content',
  required: false,
  type: 'gradient',
  default: {
    colors: [
      {
        color: {
          r: 0,
          g: 0,
          b: 0,
          a: 1,
        },
      },
      {
        color: {
          r: 255,
          g: 255,
          b: 255,
          a: 1,
        },
      },
    ],
    side_or_corner: {
      verticalSide: 'BOTTOM',
      horizontalSide: null,
    },
  },
} as GradientField;
