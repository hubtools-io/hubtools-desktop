import { EmailAddressField } from '../FrameContext.types';

export const defaultEmail = {
    name: 'emails',
    label: 'Email address',
    required: false,
    locked: false,
    type: 'email',
    default: null,
} as EmailAddressField;
