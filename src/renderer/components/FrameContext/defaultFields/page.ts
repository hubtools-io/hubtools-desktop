import { PageField } from '../FrameContext.types';

export const defaultPage = {
    name: 'default_page',
    label: 'Default Page',
    help_text: 'Pulls data from the selected page.',
    required: false,
    locked: false,
    placeholder: 'Page to pull from',
    type: 'page',
    default: null,
} as PageField;
