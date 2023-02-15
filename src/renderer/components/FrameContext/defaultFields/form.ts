import { FormField } from '../FrameContext.types';

export const defaultForm = {
    name: 'default_form',
    label: 'Default Form',
    required: false,
    locked: false,
    type: 'form',
    default: {
        form_id: 'f7110408-1935-4ed3-8a8e-293bb1c9d1ec',
        response_type: 'inline',
        message: 'Thanks for submitting the form.',
        gotowebinar_webinar_key: null,
        form_type: 'HUBSPOT',
    },
} as FormField;
