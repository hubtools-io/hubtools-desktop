import { BooleanField } from '../FrameContext.types';

export const defaultBoolean = {
    name: 'default_boolean',
    label: 'Default Boolean',
    required: false,
    locked: false,
    type: 'boolean',
    display: 'checkbox',
    inline_help_text: 'Shows Teaser image when toggled on',
    help_text:
        'Teaser images are used to help provide visual context to the post.',
    default: false,
} as BooleanField;
