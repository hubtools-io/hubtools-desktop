import { LogoField } from '../FrameContext.types';

export const defaultLogo = {
    name: 'default_logo',
    label: 'Default Logo',
    required: false,
    locked: false,
    type: 'logo',
    show_loading: true,
    default: {
        override_inherited_src: false,
        src: null,
        alt: null,
        loading: 'lazy',
    },
} as LogoField;
