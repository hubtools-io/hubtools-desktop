import { EmbedField } from '../FrameContext.types';

export const defaultEmbed = {
  name: 'default_embed',
  label: 'Default Embed',
  required: false,
  locked: false,
  supported_source_types: ['oembed', 'html'],
  supported_oembed_types: ['photo', 'video', 'link', 'rich'],
  type: 'embed',
  default: {
    source_type: 'oembed',
  },
} as EmbedField;
