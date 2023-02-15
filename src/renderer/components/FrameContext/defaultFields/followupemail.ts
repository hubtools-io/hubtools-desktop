import { FollowupEmailField } from '../FrameContext.types';

export const defaultFollowupEmail = {
    name: 'default_followupemail',
    label: 'Default Followup Email',
    required: false,
    locked: false,
    type: 'followupemail',
    default: null,
} as FollowupEmailField;
