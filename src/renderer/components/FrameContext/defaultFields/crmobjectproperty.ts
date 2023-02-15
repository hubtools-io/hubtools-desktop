import { CRMObjectPropertyField } from '../FrameContext.types';

export const defaultCRMObjectProperty = {
    name: 'default_crmobjectproperty',
    label: 'Default CRM Object Property',
    required: true,
    locked: false,
    object_type: 'contact',
    type: 'crmobjectproperty',
    default: {
        property: 'field_of_study',
    },
} as CRMObjectPropertyField;
