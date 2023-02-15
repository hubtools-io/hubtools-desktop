import { ImageField } from '../FrameContext.types';

export const defaultImage = {
    name: 'default_image',
    label: 'Default Image',
    required: false,
    locked: false,
    responsive: true,
    resizable: true,
    show_loading: false,
    type: 'image',
    default: {
        size_type: 'exact',
        src: '',
        alt: 'image-alt-text',
        loading: 'lazy',
        width: 128,
        height: 128,
        max_width: 128,
        max_height: 128,
    },
} as ImageField;
