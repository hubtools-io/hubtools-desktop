import { UrlField } from '../FrameContext.types';

export const defaultUrl = {
  name: 'default_url',
  label: 'Default URL',
  required: false,
  locked: false,
  supported_types: ['EXTERNAL', 'CONTENT', 'FILE', 'EMAIL_ADDRESS', 'BLOG'],
  type: 'url',
  default: {
    content_id: null,
    href: 'http://example.com',
    type: 'EXTERNAL',
  },
} as UrlField;
