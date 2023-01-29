import shortid from 'shortid';
import { formatFieldArray } from './format-field-array';

export const addFieldInternalId = (inputArr: any) => {
  let arr = formatFieldArray(inputArr);
  arr = Object.values(arr);

  arr.forEach((item: any) => {
    item.internalId = shortid();

    if (item.children && item.type === 'group') {
      item.children.forEach((item2: any) => {
        item2.internalId = shortid();

        if (item2.children && item2.type === 'group') {
          item2.children.forEach((item3: any) => {
            item3.internalId = shortid();

            if (item3.children && item3.type === 'group') {
              item3.children.forEach((item4: any) => {
                item4.internalId = shortid();

                if (item4.children && item4.type === 'group') {
                  item4.children.forEach((item5: any) => {
                    item5.internalId = shortid();
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
