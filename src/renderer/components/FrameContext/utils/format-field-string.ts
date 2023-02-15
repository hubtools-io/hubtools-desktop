import { formatFieldArray } from './format-field-array';

export const formatFieldString = (contents: any) => {
    let formattedContents = formatFieldArray(contents);
    formattedContents = JSON.stringify(formattedContents, null, 4);

    return formattedContents;
};
