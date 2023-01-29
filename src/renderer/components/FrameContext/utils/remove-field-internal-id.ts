import shortid from 'shortid';
import { formatFieldArray } from './format-field-array';

export const removeFieldInternalId = (inputArr: any) => {
  let arr = formatFieldArray(inputArr);
  arr = Object.values(arr);

  arr.forEach((item: any) => {
    delete item.internalId;

    if (item.children && item.type === 'group') {
      item.children.forEach((item2: any) => {
        delete item2.internalId;

        if (item2.children && item2.type === 'group') {
          item2.children.forEach((item3: any) => {
            delete item3.internalId;

            if (item3.children && item3.type === 'group') {
              item3.children.forEach((item4: any) => {
                delete item4.internalId;

                if (item4.children && item4.type === 'group') {
                  item4.children.forEach((item5: any) => {
                    delete item5.internalId;
                  });
                }
              });
            }
          });
        }
      });
    }
  });

  return arr;
};
