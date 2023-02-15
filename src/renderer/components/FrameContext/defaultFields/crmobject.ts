import { CRMObjectField } from '../FrameContext.types';

export const defaultCRMObject = {
    name: 'default_crmobject',
    label: 'Default CRM Object',
    required: false,
    locked: false,
    object_type: 'CONTACT',
    properties_to_fetch: [],
    type: 'crmobject',
    default: {
        id: 1,
    },
} as CRMObjectField;
