import { isValidJson } from './is-valid-json';

export const formatFieldArray = (inputArr: any) => {
    let value = '';

    let arrType = '';
    arrType = Array.isArray(inputArr) ? 'array' : '';
    arrType = arrType !== 'array' ? typeof inputArr : arrType;

    if (arrType === 'string') {
        value = inputArr;

        const stringIsValid = isValidJson(value);

        value = stringIsValid ? JSON.parse(value) : {};
        value = JSON.stringify(value, null, 4);
    }

    if (arrType === 'object') {
        value = JSON.stringify(inputArr, null, 4);
    }

    if (arrType === 'array') {
        value = JSON.stringify(inputArr, null, 4);
    }

    const isValid = isValidJson(value);

    return isValid ? JSON.parse(value) : value;
};
