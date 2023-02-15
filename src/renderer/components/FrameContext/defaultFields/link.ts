import { LinkField } from '../FrameContext.types';

export const defaultLink = {
    name: 'default_link',
    label: 'Default Link',
    required: false,
    locked: false,
    supported_types: ['EXTERNAL', 'CONTENT', 'FILE', 'EMAIL_ADDRESS', 'BLOG'],
    type: 'link',
    show_advanced_rel_options: false,
    default: {
        url: {
            content_id: null,
            type: 'EXTERNAL',
            href: '',
        },
        open_in_new_tab: false,
        no_follow: false,
        sponsored: false,
        user_generated_content: false,
    },
} as LinkField;
