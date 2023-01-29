import { formatFieldArray } from './format-field-array';

export const removeByKey = (inputArr: any, removingKey: any) => {
  const arr = formatFieldArray(inputArr);

  return arr
    .filter((a: any) => a.internalId !== removingKey)
    .map((e: any) => {
      let result = {};

      if (e.type === 'group') {
        result = { ...e, children: removeByKey(e.children || [], removingKey) };
      } else {
        result = { ...e };
      }

      return result;
    });
};
