import { SpacingField } from '../FrameContext.types';

export const defaultSpacing = {
  name: 'default_spacing',
  label: 'Default Spacing',
  required: false,
  type: 'spacing',
  limits: {
    padding: {
      top: { max: 50, min: 25, units: ['px', 'pt', 'em'] },
      left: { max: 50, units: ['px', 'pt', 'em'] },
      bottom: { max: 50, units: ['px', 'pt', 'em'] },
    },
    margin: {
      top: { max: 50, min: 25, units: ['px', 'pt', 'em'] },
      bottom: { max: 25, units: ['Q', 'rem', 'em'] },
    },
  },
  default: {
    padding: {
      top: { value: 25, units: ['px', 'pt', 'em'] },
      bottom: { value: 25, units: ['px', 'pt', 'em'] },
      left: { value: 25, units: ['px', 'pt', 'em'] },
      right: { value: 25, units: ['px', 'pt', 'em'] },
    },
    margin: {
      top: { value: 20, units: ['px', 'pt', 'em'] },
      bottom: { value: 20, units: ['px', 'pt', 'em'] },
    },
  },
} as SpacingField;
