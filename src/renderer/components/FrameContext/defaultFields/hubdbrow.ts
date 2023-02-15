import { HubDBRowField } from '../FrameContext.types';

export const defaultHubDBRow = {
    name: 'default_hubdbrow',
    label: 'Default HubDB Row',
    required: false,
    locked: false,
    table_name_or_id: '3096859',
    columns_to_fetch: ['name', 'price', 'desc'],
    display_columns: ['name', 'price', 'desc'],
    display_format: '%0 - %1 :::: %2',
    type: 'hubdbrow',
    default: {
        id: 4450468943,
    },
} as HubDBRowField;
