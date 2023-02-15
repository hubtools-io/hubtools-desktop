import { IconField } from '../FrameContext.types';

export const defaultIcon = {
    name: 'default_icon',
    label: 'Default Icon',
    required: false,
    locked: false,
    icon_set: 'fontawesome-5.14.0',
    type: 'icon',
    default: {
        name: 'accessible-icon',
        unicode: 'f368',
        type: 'REGULAR',
    },
} as IconField;
