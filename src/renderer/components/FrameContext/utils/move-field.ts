import { moveFieldDown } from './move-field-down';
import { moveFieldUp } from './move-field-up';

export const moveField = (
  inputArr: any,
  field: any,
  direction: 'up' | 'down'
) => {
  let newCopyArr = [];

  if (direction === 'down') {
    newCopyArr = moveFieldDown(inputArr, field);
  } else {
    newCopyArr = moveFieldUp(inputArr, field);
  }

  return newCopyArr;
};
