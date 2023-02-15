import { BlogField } from '../FrameContext.types';

export const defaultBlog = {
    name: 'default_blog',
    label: 'Default Blog',
    required: false,
    locked: false,
    type: 'blog',
    default: 1234567890,
} as BlogField;
