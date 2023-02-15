import { BackgroundImageField } from '../FrameContext.types';

export const defaultBackgroundImage = {
    name: 'default_bg_image',
    label: 'Default Background image',
    required: false,
    type: 'backgroundimage',
    default: {
        src: 'https://example.com/img.png',
        background_position: 'MIDDLE_CENTER',
        background_size: 'cover',
    },
} as BackgroundImageField;
