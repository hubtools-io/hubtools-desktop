import { ChoiceField } from '../FrameContext.types';

export const defaultChoice = {
    name: 'default_choice',
    label: 'Default Choice',
    required: false,
    locked: false,
    multiple: 'true',
    display: 'select',
    choices: [
        ['img--left', 'Image Left - Text Right'],
        ['img--right', 'Text Left - Image Right'],
    ],
    type: 'choice',
    default: 'img--left',
} as ChoiceField;
